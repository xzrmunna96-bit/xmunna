'use strict';
// MSI SMS — one Node.js app: API + real-time (SSE) + the web panels in /public. No npm packages needed.
const http = require('http'), fs = require('fs'), path = require('path'), crypto = require('crypto');
const { DatabaseSync } = require('node:sqlite');
// optional .env file (KEY=VALUE per line)
try { for (const l of fs.readFileSync(path.join(__dirname, '.env'), 'utf8').split('\n')) { const m = /^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/.exec(l); if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, ''); } } catch { }

const PORT = Number(process.env.PORT) || 3000;
const DB_FILE = process.env.DB_FILE || path.join(__dirname, 'data', 'msi.db');
const SECURE = process.env.COOKIE_SECURE === '1';          // set to 1 when served over HTTPS
const TRUST_PROXY = process.env.TRUST_PROXY === '1';       // set to 1 behind nginx/caddy
const PUB = path.join(__dirname, 'public');

fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
const db = new DatabaseSync(DB_FILE);
db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;
CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, username TEXT UNIQUE NOT NULL, pass TEXT NOT NULL, role TEXT NOT NULL, status TEXT NOT NULL, full_name TEXT, email TEXT, whatsapp TEXT, country TEXT, parent_id INTEGER, api_token TEXT UNIQUE, created_at INTEGER, last_login INTEGER);
CREATE TABLE IF NOT EXISTS sessions(tok TEXT PRIMARY KEY, user_id INTEGER NOT NULL, exp INTEGER NOT NULL, ip TEXT, user_agent TEXT, created_at INTEGER);
CREATE TABLE IF NOT EXISTS ranges(id INTEGER PRIMARY KEY, name TEXT UNIQUE NOT NULL, country TEXT, prefix TEXT, agent_payout INTEGER NOT NULL DEFAULT 0, daily_limit INTEGER NOT NULL DEFAULT 0, enabled INTEGER NOT NULL DEFAULT 1, created_at INTEGER);
CREATE TABLE IF NOT EXISTS numbers(id INTEGER PRIMARY KEY, range_id INTEGER NOT NULL, msisdn TEXT UNIQUE NOT NULL, status TEXT NOT NULL DEFAULT 'free', agent_id INTEGER, client_id INTEGER, agent_payout INTEGER NOT NULL DEFAULT 0, client_payout INTEGER NOT NULL DEFAULT 0, allocated_at INTEGER, last_sms INTEGER);
CREATE INDEX IF NOT EXISTS n_r ON numbers(range_id,status); CREATE INDEX IF NOT EXISTS n_a ON numbers(agent_id); CREATE INDEX IF NOT EXISTS n_c ON numbers(client_id);
CREATE TABLE IF NOT EXISTS alloc_log(id INTEGER PRIMARY KEY, range_id INTEGER, agent_id INTEGER, qty INTEGER, ts INTEGER);
CREATE TABLE IF NOT EXISTS messages(id INTEGER PRIMARY KEY, range_id INTEGER, number_id INTEGER, msisdn TEXT, cli TEXT, body TEXT, ts INTEGER, agent_id INTEGER, client_id INTEGER, agent_amt INTEGER DEFAULT 0, client_amt INTEGER DEFAULT 0);
CREATE INDEX IF NOT EXISTS m_a ON messages(agent_id,ts); CREATE INDEX IF NOT EXISTS m_c ON messages(client_id,ts); CREATE INDEX IF NOT EXISTS m_t ON messages(ts);
CREATE TABLE IF NOT EXISTS ledger(id INTEGER PRIMARY KEY, user_id INTEGER, amount INTEGER, kind TEXT, ref TEXT, ts INTEGER);
CREATE INDEX IF NOT EXISTS l_u ON ledger(user_id);
CREATE TABLE IF NOT EXISTS announcements(id INTEGER PRIMARY KEY, title TEXT, body TEXT, ts INTEGER, expires INTEGER);
CREATE TABLE IF NOT EXISTS api_keys(id INTEGER PRIMARY KEY, name TEXT, hash TEXT UNIQUE, created_at INTEGER, revoked INTEGER DEFAULT 0);
CREATE TABLE IF NOT EXISTS audit(id INTEGER PRIMARY KEY, user_id INTEGER, action TEXT, detail TEXT, ip TEXT, ts INTEGER);
CREATE TABLE IF NOT EXISTS tenants(id INTEGER PRIMARY KEY, tenant_id TEXT UNIQUE NOT NULL, name TEXT NOT NULL, base_url TEXT, agent_id INTEGER NOT NULL, status TEXT NOT NULL DEFAULT 'active', theme_color TEXT DEFAULT '#00d2ff', api_key TEXT UNIQUE, webhook_url TEXT, settings_json TEXT, created_at INTEGER, updated_at INTEGER);
CREATE TABLE IF NOT EXISTS number_requests(id INTEGER PRIMARY KEY, agent_id INTEGER NOT NULL, range_id INTEGER NOT NULL, qty INTEGER NOT NULL, status TEXT NOT NULL DEFAULT 'pending', allocated_count INTEGER DEFAULT 0, notes TEXT, created_at INTEGER, processed_at INTEGER, processed_by TEXT);
CREATE TABLE IF NOT EXISTS sys_settings(key TEXT PRIMARY KEY, val TEXT);
CREATE TABLE IF NOT EXISTS support_chats(id INTEGER PRIMARY KEY, user_id INTEGER NOT NULL, sender TEXT NOT NULL, message TEXT NOT NULL, ts INTEGER, metadata_json TEXT);`);

// Safely ensure new session columns exist on existing databases
try { db.exec('ALTER TABLE sessions ADD COLUMN ip TEXT'); } catch {}
try { db.exec('ALTER TABLE sessions ADD COLUMN user_agent TEXT'); } catch {}
try { db.exec('ALTER TABLE sessions ADD COLUMN created_at INTEGER'); } catch {}

// Initialize system settings
const initSettings = () => {
  const set = (k, v) => db.prepare("INSERT OR IGNORE INTO sys_settings(key,val) VALUES(?,?)").run(k, v);
  set('admin_availability', 'online');
  set('auto_approve_requests', '1');
  set('max_auto_qty', '50');
  set('ai_handler_enabled', '1');
};
initSettings();

// AI GenAI initialization
let aiClient = null;
try {
  if (process.env.GEMINI_API_KEY) {
    const { GoogleGenAI } = require('@google/genai');
    aiClient = new GoogleGenAI();
  }
} catch (e) {
  console.warn('AI Client init:', e.message);
}

// ---------- helpers ----------
const all = (s, ...p) => db.prepare(s).all(...p), one = (s, ...p) => db.prepare(s).get(...p), run = (s, ...p) => db.prepare(s).run(...p);
const tx = fn => { db.exec('BEGIN IMMEDIATE'); try { const r = fn(); db.exec('COMMIT'); return r; } catch (e) { db.exec('ROLLBACK'); throw e; } };
class HttpError extends Error { constructor(c, m) { super(m); this.code = c; } }
const bad = (m, c = 400) => { throw new HttpError(c, m); };
const sha = s => crypto.createHash('sha256').update(s).digest('hex');
const rnd = n => crypto.randomBytes(n).toString('hex');
const hashPw = pw => { const salt = rnd(16); return salt + ':' + crypto.scryptSync(pw, salt, 64).toString('hex'); };
const DUMMY = hashPw('x');
const checkPw = (pw, st) => { const [salt, h] = st.split(':'); const a = Buffer.from(crypto.scryptSync(pw, salt, 64).toString('hex')), b = Buffer.from(h); return a.length === b.length && crypto.timingSafeEqual(a, b); };
const S = (v, max = 200) => String(v ?? '').trim().slice(0, max);
const int = v => { const n = parseInt(v, 10); if (!Number.isFinite(n)) bad('Invalid number'); return n; };
const micro = v => { const n = Math.round(parseFloat(v) * 1e6); if (!Number.isFinite(n) || n < 0 || n > 1e12) bad('Invalid amount'); return n; };
const uname = v => { v = S(v, 24).toLowerCase(); if (!/^[a-z0-9_]{3,24}$/.test(v)) bad('Username must be 3-24 letters, numbers or underscores'); return v; };
const pass = v => { v = String(v ?? ''); if (v.length < 8 || v.length > 128) bad('Password must be 8-128 characters'); return v; };
const ids = v => { if (!Array.isArray(v) || !v.length || v.length > 5000) bad('Select at least one number'); return v.map(int); };
const dayStart = (t = Date.now()) => { const d = new Date(t); return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()); };
const hits = new Map();
const rate = (k, max, win) => { const n = Date.now(); let h = hits.get(k); if (!h || h.t < n) { h = { n: 0, t: n + win }; hits.set(k, h); } if (++h.n > max) bad('Too many attempts. Try again later.', 429); };
setInterval(() => { const n = Date.now(); for (const [k, h] of hits) if (h.t < n) hits.delete(k); run('DELETE FROM sessions WHERE exp<?', n); }, 60e3).unref();

const audit = (u, action, detail, ip) => run('INSERT INTO audit(user_id,action,detail,ip,ts) VALUES(?,?,?,?,?)', u ? u.id : null, action, S(detail, 300), ip || '', Date.now());
const pub = u => ({ id: u.id, username: u.username, role: u.role, status: u.status, full_name: u.full_name, email: u.email, whatsapp: u.whatsapp, country: u.country, api_token: u.api_token || null });
function createUser(o) {
  const r = run('INSERT INTO users(username,pass,role,status,full_name,email,whatsapp,country,parent_id,api_token,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
    o.username, hashPw(o.password), o.role, o.status, o.full_name || '', o.email || '', o.whatsapp || '', o.country || '', o.parent_id || null,
    o.role === 'admin' || o.status === 'pending' ? null : rnd(20), Date.now());
  const uid = Number(r.lastInsertRowid);
  if (o.role === 'agent' && o.status === 'active') {
    try {
      const tid = 'panel_' + o.username;
      run("INSERT OR IGNORE INTO tenants(tenant_id,name,base_url,agent_id,status,theme_color,api_key,webhook_url,settings_json,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
        tid, `${o.full_name || o.username} Agent Panel`, `/portal/${o.username}`, uid, 'active', '#00d2ff', 'tpk_' + rnd(16), `https://api.msisms.io/webhook/${o.username}`, JSON.stringify({ rate_limit: 120, live_sync: true }), Date.now(), Date.now());
    } catch {}
  }
  return uid;
}

function ensureAgentTenants() {
  try {
    const agents = all("SELECT id, username, full_name FROM users WHERE role='agent'");
    for (const a of agents) {
      const existing = one('SELECT id FROM tenants WHERE agent_id=?', a.id);
      if (!existing) {
        const tid = 'panel_' + a.username;
        run("INSERT INTO tenants(tenant_id,name,base_url,agent_id,status,theme_color,api_key,webhook_url,settings_json,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
          tid, `${a.full_name || a.username} Agent Panel`, `/portal/${a.username}`, a.id, 'active', '#00d2ff', 'tpk_' + rnd(16), `https://api.msisms.io/webhook/${a.username}`, JSON.stringify({ rate_limit: 120, live_sync: true }), Date.now(), Date.now());
      }
    }
  } catch {}
}
ensureAgentTenants();

async function handleWithAI(u, message) {
  const ranges = all("SELECT name, prefix, country, agent_payout, (SELECT COUNT(*) FROM numbers n WHERE n.range_id=ranges.id AND n.status='free') free FROM ranges WHERE enabled=1");
  const myNums = one("SELECT COUNT(*) c FROM numbers WHERE agent_id=?", u.id)?.c || 0;
  const balance = one("SELECT COALESCE(SUM(amount),0) b FROM ledger WHERE user_id=?", u.id)?.b || 0;
  const avail = one("SELECT val FROM sys_settings WHERE key='admin_availability'")?.val || 'online';
  
  const systemPrompt = `You are the official automated AI Operations & Support Specialist for MSI SMS (Multi-Tenant Real-Time SMS Routing & Agent Platform).
The Administrator is currently: ${avail === 'away' ? 'AWAY / OFFLINE (You are handling all requests in Auto-Pilot Mode)' : 'ONLINE'}.
Interacting Agent: ${u.username} (${u.full_name || 'Agent'}).
Agent Profile:
- Allocated SMS Numbers: ${myNums}
- Current Balance: USD ${(balance / 1e6).toFixed(4)}
- Available Ranges: ${JSON.stringify(ranges)}

Instructions:
1. Provide instant, professional, polite support.
2. If asked about stock, ranges, or rates, quote the live data accurately.
3. If asking for numbers, explain that requests are submitted through the "Request Numbers" module and auto-evaluated or queued for processing.
4. Keep answers brief, clear, and direct.`;

  if (aiClient && process.env.GEMINI_API_KEY) {
    try {
      const response = await Promise.race([
        aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: message,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
            maxOutputTokens: 500
          }
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('AI timeout')), 5000))
      ]);
      if (response && response.text) return response.text.trim();
    } catch (err) {
      console.warn('Gemini generateContent note:', err.message);
    }
  }

  // High-reliability contextual fallback:
  const msgLower = (message || '').toLowerCase();
  if (msgLower.includes('range') || msgLower.includes('stock') || msgLower.includes('number')) {
    const list = ranges.map(r => `${r.name} (${r.free} free)`).join(', ');
    return `[AI Operations · Admin Away] Available ranges with stock: ${list || 'None free at this moment'}. You can request numbers directly in the "Request Numbers" menu.`;
  }
  if (msgLower.includes('balance') || msgLower.includes('payout') || msgLower.includes('rate') || msgLower.includes('bill')) {
    return `[AI Operations · Admin Away] Your current balance is USD ${(balance / 1e6).toFixed(4)}. Real-time payouts credit automatically per live SMS delivered.`;
  }
  return `[AI Operations · Admin Away] Hello ${u.username}! The Administrator is currently away, and Auto-Pilot AI is active. Your request has been logged and is being handled automatically. How may I assist you with ranges, numbers, or technical integration?`;
}

// ---------- real-time (Server-Sent Events) ----------
const subs = new Map();
const emit = (list, ev, data) => { const msg = `event: ${ev}\ndata: ${JSON.stringify(data || {})}\n\n`; for (const id of new Set(list)) { const s = subs.get(id); if (s) for (const r of s) r.write(msg); } };
const admins = () => all("SELECT id FROM users WHERE role='admin' AND status='active'").map(r => r.id);
setInterval(() => { for (const s of subs.values()) for (const r of s) r.write(': ping\n\n'); }, 25e3).unref();

// ---------- auth ----------
function getUser(req) {
  let tok = req.headers['x-session-id'] || null;
  if (!tok) {
    const c = (req.headers.cookie || '').split(/;\s*/).find(x => x.startsWith('sid='));
    if (c) tok = c.slice(4);
  }
  if (!tok) {
    try {
      const parsed = new URL(req.url, 'http://x');
      tok = parsed.searchParams.get('sid') || null;
    } catch {}
  }
  if (!tok) return null;
  const s = one('SELECT user_id,exp FROM sessions WHERE tok=?', sha(tok));
  if (!s || s.exp < Date.now()) return null;
  const u = one('SELECT * FROM users WHERE id=?', s.user_id);
  return u && u.status === 'active' ? u : null;
}

// ---------- router ----------
const routes = [];
const add = (m, p, roles, fn) => routes.push({ m, re: new RegExp('^' + p.replace(/:(\w+)/g, '(?<$1>[^/]+)') + '$'), roles, fn });
const ALL = ['admin', 'agent', 'client'];

add('POST', '/api/register', null, ({ body, ip, u }) => {
  rate('reg:' + ip, 5, 3600e3);
  const username = uname(body.username), pw = pass(body.password), name = S(body.full_name, 80), email = S(body.email, 120);
  if (!name) bad('Full name is required');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) bad('Enter a valid email address');
  if (one('SELECT id FROM users WHERE username=?', username)) bad('That username is already taken', 409);
  createUser({ username, password: pw, role: 'agent', status: 'pending', full_name: name, email, whatsapp: S(body.whatsapp, 30), country: S(body.country, 60) });
  audit(null, 'register', username, ip);
  emit(admins(), 'account', { text: 'New registration waiting for approval: ' + username });
  return { ok: true, message: 'Your account has been submitted. An admin will review it and you can sign in once it is approved.' };
});
add('POST', '/api/login', null, ({ req, body, ip, res }) => {
  rate('login:' + ip, 20, 600e3);
  const u = one('SELECT * FROM users WHERE username=?', S(body.username, 24).toLowerCase());
  const okPw = checkPw(String(body.password || ''), u ? u.pass : DUMMY);
  if (!u || !okPw) bad('Wrong username or password', 401);
  if (u.status === 'pending') bad('Your account is waiting for admin approval.', 403);
  if (u.status !== 'active') bad('This account is not active. Please contact support.', 403);
  const tok = rnd(32);
  const ua = S(req.headers['user-agent'] || 'Web Browser', 120);
  run('INSERT INTO sessions(tok,user_id,exp,ip,user_agent,created_at) VALUES(?,?,?,?,?,?)', sha(tok), u.id, Date.now() + 7 * 864e5, ip, ua, Date.now());
  run('UPDATE users SET last_login=? WHERE id=?', Date.now(), u.id);
  res.setHeader('Set-Cookie', `sid=${tok}; HttpOnly; SameSite=None; Secure; Path=/; Max-Age=604800`);
  audit(u, 'login', '', ip);
  const out = pub(u);
  out.sid = tok;
  return out;
});
add('POST', '/api/logout', null, ({ req, res }) => {
  const c = (req.headers.cookie || '').split(/;\s*/).find(x => x.startsWith('sid='));
  if (c) run('DELETE FROM sessions WHERE tok=?', sha(c.slice(4)));
  res.setHeader('Set-Cookie', 'sid=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0');
  return { ok: true };
});
add('GET', '/api/me', ALL, ({ u }) => {
  if (!u.api_token && u.role !== 'admin') { u.api_token = rnd(20); run('UPDATE users SET api_token=? WHERE id=?', u.api_token, u.id); }
  return pub(u);
});
add('PUT', '/api/me', ALL, ({ u, body }) => {
  const email = S(body.email, 120); if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) bad('Enter a valid email address');
  run('UPDATE users SET full_name=?,email=?,whatsapp=?,country=? WHERE id=?', S(body.full_name, 80), email, S(body.whatsapp, 30), S(body.country, 60), u.id);
  return { ok: true };
});
add('POST', '/api/me/password', ALL, ({ u, body, ip }) => {
  rate('pw:' + u.id, 10, 600e3);
  if (!checkPw(String(body.current || ''), u.pass)) bad('Current password is wrong', 401);
  run('UPDATE users SET pass=? WHERE id=?', hashPw(pass(body.password)), u.id);
  audit(u, 'password.change', '', ip);
  return { ok: true };
});
add('POST', '/api/me/token', ['agent', 'client'], ({ u }) => { const t = rnd(20); run('UPDATE users SET api_token=? WHERE id=?', t, u.id); return { api_token: t }; });
add('GET', '/api/events', ALL, ({ req, res, u }) => {
  res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive', 'X-Accel-Buffering': 'no' });
  res.write('retry: 3000\n\n');
  let s = subs.get(u.id); if (!s) subs.set(u.id, s = new Set());
  s.add(res);
  req.on('close', () => { s.delete(res); if (!s.size) subs.delete(u.id); });
});

// ---------- admin: users ----------
add('GET', '/api/admin/users', ['admin'], ({ q }) => {
  const w = ['1=1'], p = [];
  if (q.role) { w.push('u.role=?'); p.push(S(q.role, 10)); }
  if (q.status) { w.push('u.status=?'); p.push(S(q.status, 12)); }
  if (q.q) { w.push('(u.username LIKE ? OR u.full_name LIKE ? OR u.email LIKE ?)'); const l = '%' + S(q.q, 40).replace(/[%_]/g, '') + '%'; p.push(l, l, l); }
  return all(`SELECT u.id,u.username,u.full_name,u.email,u.whatsapp,u.country,u.role,u.status,u.created_at,u.last_login,(SELECT username FROM users x WHERE x.id=u.parent_id) parent,(SELECT COUNT(*) FROM numbers n WHERE n.agent_id=u.id OR n.client_id=u.id) nums FROM users u WHERE ${w.join(' AND ')} ORDER BY (u.status='pending') DESC, u.id DESC LIMIT 500`, ...p);
});
add('POST', '/api/admin/users', ['admin'], ({ u, body, ip }) => {
  const role = S(body.role, 10); if (!ALL.includes(role)) bad('Invalid role');
  const username = uname(body.username), pw = pass(body.password);
  if (one('SELECT id FROM users WHERE username=?', username)) bad('That username is already taken', 409);
  let parent = null;
  if (role === 'client') { const a = one("SELECT id FROM users WHERE username=? AND role='agent'", S(body.agent, 24).toLowerCase()); if (!a) bad('Enter the username of an existing agent for this client'); parent = a.id; }
  const id = createUser({ username, password: pw, role, status: 'active', parent_id: parent, full_name: S(body.full_name, 80), email: S(body.email, 120), whatsapp: S(body.whatsapp, 30), country: S(body.country, 60) });
  audit(u, 'user.create', `${username} (${role})`, ip);
  return { id };
});
add('POST', '/api/admin/users/:id/status', ['admin'], ({ u, p, body, ip }) => {
  const t = one('SELECT * FROM users WHERE id=?', int(p.id)); if (!t) bad('User not found', 404);
  if (t.id === u.id) bad('You cannot change your own status');
  const st = S(body.status, 12); if (!['active', 'suspended', 'rejected'].includes(st)) bad('Invalid status');
  run('UPDATE users SET status=? WHERE id=?', st, t.id);
  if (st === 'active' && !t.api_token && t.role !== 'admin') run('UPDATE users SET api_token=? WHERE id=?', rnd(20), t.id);
  if (st !== 'active') run('DELETE FROM sessions WHERE user_id=?', t.id);
  audit(u, 'user.status', `${t.username} -> ${st}`, ip);
  emit([t.id], 'refresh', { toast: st === 'active' ? 'Your account is active.' : '' });
  emit(admins(), 'refresh', {});
  return { ok: true };
});
add('POST', '/api/admin/users/:id/password', ['admin'], ({ u, p, body, ip }) => {
  const t = one('SELECT * FROM users WHERE id=?', int(p.id)); if (!t) bad('User not found', 404);
  run('UPDATE users SET pass=? WHERE id=?', hashPw(pass(body.password)), t.id); run('DELETE FROM sessions WHERE user_id=?', t.id);
  audit(u, 'user.password', t.username, ip);
  return { ok: true };
});
add('PUT', '/api/admin/users/:id', ['admin'], ({ u, p, body, ip }) => {
  const target = one('SELECT * FROM users WHERE id=?', int(p.id)); if (!target) bad('User not found', 404);
  const name = body.full_name !== undefined ? S(body.full_name, 80) : target.full_name;
  const email = body.email !== undefined ? S(body.email, 120) : target.email;
  const whatsapp = body.whatsapp !== undefined ? S(body.whatsapp, 30) : target.whatsapp;
  const country = body.country !== undefined ? S(body.country, 60) : target.country;
  const status = body.status !== undefined ? S(body.status, 20) : target.status;
  run("UPDATE users SET full_name=?,email=?,whatsapp=?,country=?,status=? WHERE id=?", name, email, whatsapp, country, status, target.id);
  audit(u, 'user.update_details', target.username, ip);
  emit([target.id], 'refresh', { toast: 'Your agent profile details were updated by admin.' });
  return { ok: true };
});

// ---------- admin: user sessions control ----------
add('GET', '/api/admin/sessions', ['admin'], () => {
  const now = Date.now();
  return all(`SELECT s.tok, s.user_id, s.exp, s.ip, s.user_agent, s.created_at, u.username, u.full_name, u.role, u.status
              FROM sessions s
              JOIN users u ON u.id = s.user_id
              WHERE s.exp > ?
              ORDER BY s.created_at DESC LIMIT 200`, now);
});
add('DELETE', '/api/admin/sessions/:tok', ['admin'], ({ p, u, ip }) => {
  const s = one('SELECT * FROM sessions WHERE tok=?', p.tok);
  if (s) {
    run('DELETE FROM sessions WHERE tok=?', p.tok);
    audit(u, 'session.revoke', `user_id=${s.user_id}`, ip);
    emit([s.user_id], 'refresh', { toast: 'A session has been terminated by administrator.' });
  }
  return { ok: true };
});
add('DELETE', '/api/admin/users/:id/sessions', ['admin'], ({ p, u, ip }) => {
  const uid = int(p.id);
  run('DELETE FROM sessions WHERE user_id=?', uid);
  audit(u, 'sessions.revoke_all', `user_id=${uid}`, ip);
  emit([uid], 'refresh', { toast: 'All active sessions have been terminated by administrator.' });
  return { ok: true };
});

// ---------- multi-tenant agent panels ----------
add('GET', '/api/admin/tenants', ['admin'], () => {
  ensureAgentTenants();
  return all(`SELECT t.*, u.username agent_username, u.full_name agent_name, u.status agent_status,
              (SELECT COUNT(*) FROM numbers n WHERE n.agent_id = t.agent_id) allocated_numbers,
              (SELECT COUNT(*) FROM users c WHERE c.parent_id = t.agent_id AND c.role='client') client_count,
              (SELECT COUNT(*) FROM messages m WHERE m.agent_id = t.agent_id) total_sms
              FROM tenants t
              JOIN users u ON u.id = t.agent_id
              ORDER BY t.id DESC`);
});
add('POST', '/api/admin/tenants', ['admin'], ({ u, body, ip }) => {
  const name = S(body.name, 100); if (!name) bad('Panel name is required');
  const agentUsername = S(body.agent, 24).toLowerCase();
  const agent = one("SELECT id FROM users WHERE username=? AND role='agent'", agentUsername);
  if (!agent) bad('Valid agent username is required', 404);
  const tid = S(body.tenant_id, 40) || ('panel_' + agentUsername);
  if (one('SELECT id FROM tenants WHERE tenant_id=?', tid)) bad('Tenant ID already exists', 409);
  const key = 'tpk_' + rnd(20);
  const r = run("INSERT INTO tenants(tenant_id,name,base_url,agent_id,status,theme_color,api_key,webhook_url,settings_json,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
    tid, name, S(body.base_url, 150) || `/portal/${agentUsername}`, agent.id, S(body.status, 20) || 'active', S(body.theme_color, 20) || '#00d2ff', key, S(body.webhook_url, 200) || '', JSON.stringify({ rate_limit: 120, live_sync: true }), Date.now(), Date.now());
  audit(u, 'tenant.create', `${name} (${tid})`, ip);
  emit([agent.id], 'refresh', { toast: `Your Agent Panel (${name}) is configured!` });
  return { id: Number(r.lastInsertRowid), tenant_id: tid, api_key: key };
});
add('PUT', '/api/admin/tenants/:id', ['admin'], ({ u, p, body, ip }) => {
  const t = one('SELECT * FROM tenants WHERE id=?', int(p.id)); if (!t) bad('Tenant panel not found', 404);
  const name = S(body.name, 100) || t.name;
  const baseUrl = body.base_url !== undefined ? S(body.base_url, 150) : t.base_url;
  const status = S(body.status, 20) || t.status;
  const theme = S(body.theme_color, 20) || t.theme_color;
  const webhook = body.webhook_url !== undefined ? S(body.webhook_url, 200) : t.webhook_url;
  run("UPDATE tenants SET name=?,base_url=?,status=?,theme_color=?,webhook_url=?,updated_at=? WHERE id=?",
    name, baseUrl, status, theme, webhook, Date.now(), t.id);
  audit(u, 'tenant.update', `${name} -> ${status}`, ip);
  emit([t.agent_id], 'refresh', { toast: 'Your Agent Panel settings were updated by admin.' });
  return { ok: true };
});
add('POST', '/api/admin/tenants/:id/regen-key', ['admin'], ({ u, p, ip }) => {
  const t = one('SELECT * FROM tenants WHERE id=?', int(p.id)); if (!t) bad('Tenant panel not found', 404);
  const newKey = 'tpk_' + rnd(20);
  run("UPDATE tenants SET api_key=?,updated_at=? WHERE id=?", newKey, Date.now(), t.id);
  audit(u, 'tenant.regen_key', t.tenant_id, ip);
  emit([t.agent_id], 'refresh', { toast: 'Your Agent Panel API Key has been refreshed.' });
  return { api_key: newKey };
});
add('DELETE', '/api/admin/tenants/:id', ['admin'], ({ u, p, ip }) => {
  const t = one('SELECT * FROM tenants WHERE id=?', int(p.id)); if (!t) bad('Tenant panel not found', 404);
  run("UPDATE tenants SET status='suspended',updated_at=? WHERE id=?", Date.now(), t.id);
  audit(u, 'tenant.suspend', t.tenant_id, ip);
  return { ok: true };
});
add('GET', '/api/agent/tenant', ['agent'], ({ u }) => {
  ensureAgentTenants();
  const t = one("SELECT t.*, (SELECT COUNT(*) FROM numbers n WHERE n.agent_id=t.agent_id) allocated_numbers FROM tenants t WHERE t.agent_id=?", u.id);
  return t || { configured: false };
});
add('PUT', '/api/agent/tenant', ['agent'], ({ u, body }) => {
  const t = one("SELECT * FROM tenants WHERE agent_id=?", u.id); if (!t) bad('Tenant panel not found', 404);
  const webhook = body.webhook_url !== undefined ? S(body.webhook_url, 200) : t.webhook_url;
  const name = body.name !== undefined ? S(body.name, 100) : t.name;
  run("UPDATE tenants SET name=?,webhook_url=?,updated_at=? WHERE id=?", name, webhook, Date.now(), t.id);
  return { ok: true };
});

// ---------- admin: ranges & numbers ----------
add('GET', '/api/admin/ranges', ['admin'], () => all("SELECT r.*,(SELECT COUNT(*) FROM numbers n WHERE n.range_id=r.id AND n.status='free') free,(SELECT COUNT(*) FROM numbers n WHERE n.range_id=r.id AND n.status='allocated') allocated FROM ranges r ORDER BY r.name"));
add('GET', '/api/range-names', ALL, () => all('SELECT id,name FROM ranges ORDER BY name'));
add('POST', '/api/admin/ranges', ['admin'], ({ u, body, ip }) => {
  const name = S(body.name, 80); if (!name) bad('Range name is required');
  if (one('SELECT id FROM ranges WHERE name=?', name)) bad('A range with this name already exists', 409);
  const r = run('INSERT INTO ranges(name,country,prefix,agent_payout,daily_limit,enabled,created_at) VALUES(?,?,?,?,?,?,?)', name, S(body.country, 60), S(body.prefix, 20), micro(body.agent_payout || 0), Math.max(0, int(body.daily_limit || 0)), 1, Date.now());
  audit(u, 'range.create', name, ip);
  return { id: Number(r.lastInsertRowid) };
});
add('PUT', '/api/admin/ranges/:id', ['admin'], ({ u, p, body, ip }) => {
  const r = one('SELECT * FROM ranges WHERE id=?', int(p.id)); if (!r) bad('Range not found', 404);
  run('UPDATE ranges SET agent_payout=?,daily_limit=?,enabled=? WHERE id=?',
    body.agent_payout !== undefined && body.agent_payout !== '' ? micro(body.agent_payout) : r.agent_payout,
    body.daily_limit !== undefined && body.daily_limit !== '' ? Math.max(0, int(body.daily_limit)) : r.daily_limit,
    body.enabled !== undefined ? (body.enabled ? 1 : 0) : r.enabled, r.id);
  audit(u, 'range.update', r.name, ip); emit(ALL_IDS(), 'refresh', {});
  return { ok: true };
});
add('POST', '/api/admin/ranges/:id/numbers', ['admin'], ({ u, p, body, ip }) => {
  const r = one('SELECT * FROM ranges WHERE id=?', int(p.id)); if (!r) bad('Range not found', 404);
  const nums = [...new Set(String(body.text || '').split(/[\s,;]+/).map(x => x.replace(/\D/g, '')).filter(x => x.length >= 6 && x.length <= 15))];
  if (!nums.length) bad('No valid numbers found in the file or text');
  let added = 0;
  tx(() => { const st = db.prepare('INSERT OR IGNORE INTO numbers(range_id,msisdn) VALUES(?,?)'); for (const n of nums) added += Number(st.run(r.id, n).changes); });
  audit(u, 'numbers.upload', `${r.name}: +${added}`, ip); emit(ALL_IDS().filter(i => i !== u.id), 'refresh', { toast: added ? `${added} new numbers added to ${r.name}` : '' });
  return { added, duplicates: nums.length - added, total: nums.length };
});
const ALL_IDS = () => [...subs.keys()];
add('GET', '/api/admin/numbers', ['admin'], ({ q }) => {
  const w = ['1=1'], p = [];
  if (q.range) { w.push('n.range_id=?'); p.push(int(q.range)); }
  if (q.status) { w.push('n.status=?'); p.push(S(q.status, 12)); }
  if (q.q) { w.push('n.msisdn LIKE ?'); p.push('%' + S(q.q, 20).replace(/\D/g, '') + '%'); }
  if (q.agent) { w.push('n.agent_id=(SELECT id FROM users WHERE username=?)'); p.push(S(q.agent, 24).toLowerCase()); }
  const total = one(`SELECT COUNT(*) c FROM numbers n WHERE ${w.join(' AND ')}`, ...p).c;
  const rows = all(`SELECT n.id,n.msisdn,n.status,n.last_sms,(SELECT name FROM ranges r WHERE r.id=n.range_id) range,(SELECT username FROM users a WHERE a.id=n.agent_id) agent,(SELECT username FROM users c WHERE c.id=n.client_id) client FROM numbers n WHERE ${w.join(' AND ')} ORDER BY n.id DESC LIMIT 200 OFFSET ?`, ...p, Math.max(0, int(q.offset || 0)));
  return { rows, total };
});

// ---------- admin: announcements, keys, audit ----------
add('GET', '/api/announcements', ALL, () => all('SELECT id,title,body,ts,expires FROM announcements WHERE expires IS NULL OR expires>? ORDER BY id DESC LIMIT 50', Date.now()));
add('POST', '/api/admin/announcements', ['admin'], ({ u, body, ip }) => {
  const title = S(body.title, 120), text = S(body.body, 2000); if (!title || !text) bad('Title and message are required');
  const exp = body.expires ? Date.parse(body.expires + 'T23:59:59Z') : null; if (body.expires && !Number.isFinite(exp)) bad('Invalid expiry date');
  run('INSERT INTO announcements(title,body,ts,expires) VALUES(?,?,?,?)', title, text, Date.now(), exp);
  audit(u, 'announcement.create', title, ip); emit(ALL_IDS(), 'announcement', { toast: 'New announcement: ' + title });
  return { ok: true };
});
add('DELETE', '/api/admin/announcements/:id', ['admin'], ({ u, p, ip }) => { run('DELETE FROM announcements WHERE id=?', int(p.id)); audit(u, 'announcement.delete', p.id, ip); emit(ALL_IDS(), 'refresh', {}); return { ok: true }; });
add('GET', '/api/admin/keys', ['admin'], () => all('SELECT id,name,created_at,revoked FROM api_keys ORDER BY id DESC'));
add('POST', '/api/admin/keys', ['admin'], ({ u, body, ip }) => {
  const name = S(body.name, 60); if (!name) bad('Give the key a name');
  const key = 'msi_' + rnd(24); run('INSERT INTO api_keys(name,hash,created_at) VALUES(?,?,?)', name, sha(key), Date.now());
  audit(u, 'key.create', name, ip); return { key };
});
add('DELETE', '/api/admin/keys/:id', ['admin'], ({ u, p, ip }) => { run('UPDATE api_keys SET revoked=1 WHERE id=?', int(p.id)); audit(u, 'key.revoke', p.id, ip); return { ok: true }; });
add('GET', '/api/admin/audit', ['admin'], () => all('SELECT a.ts,a.action,a.detail,a.ip,(SELECT username FROM users x WHERE x.id=a.user_id) actor FROM audit a ORDER BY a.id DESC LIMIT 300'));

// ---------- agent: ranges, requests, numbers, clients ----------
// ---------- number requests: automated & manual processing ----------
add('GET', '/api/admin/number-requests', ['admin'], () => {
  return all(`SELECT nr.*, u.username agent, u.full_name agent_name, (SELECT name FROM ranges r WHERE r.id=nr.range_id) range_name,
              (SELECT COUNT(*) FROM numbers n WHERE n.range_id=nr.range_id AND n.status='free') range_free
              FROM number_requests nr
              JOIN users u ON u.id=nr.agent_id
              ORDER BY (nr.status='pending') DESC, nr.id DESC LIMIT 300`);
});
add('POST', '/api/admin/number-requests/:id/process', ['admin'], ({ u, p, body, ip }) => {
  const reqId = int(p.id);
  const reqRow = one('SELECT * FROM number_requests WHERE id=?', reqId);
  if (!reqRow) bad('Number request not found', 404);
  if (reqRow.status !== 'pending') bad('This request has already been processed');
  const act = S(body.action, 20); // 'approve' | 'reject'
  if (!['approve', 'reject'].includes(act)) bad('Invalid action');

  if (act === 'reject') {
    run("UPDATE number_requests SET status='rejected',notes=?,processed_at=?,processed_by=? WHERE id=?",
      S(body.notes || 'Rejected by administrator', 200), Date.now(), u.username, reqId);
    audit(u, 'numbers.reject_request', `Req #${reqId} (${reqRow.qty})`, ip);
    emit([reqRow.agent_id], 'refresh', { toast: `Your number request #${reqId} was rejected.` });
    return { ok: true, status: 'rejected' };
  }

  // Allocate numbers
  const r = one('SELECT * FROM ranges WHERE id=?', reqRow.range_id);
  if (!r) bad('Associated range not found', 404);
  const pick = all("SELECT id FROM numbers WHERE range_id=? AND status='free' ORDER BY id LIMIT ?", reqRow.range_id, reqRow.qty).map(x => x.id);
  if (!pick.length) bad('No free numbers available in this range to fulfill request');
  const st = db.prepare("UPDATE numbers SET status='allocated',agent_id=?,client_id=NULL,agent_payout=?,client_payout=0,allocated_at=? WHERE id=? AND status='free'");
  let n = 0;
  for (const id of pick) n += Number(st.run(reqRow.agent_id, r.agent_payout, Date.now(), id).changes);
  run('INSERT INTO alloc_log(range_id,agent_id,qty,ts) VALUES(?,?,?,?)', reqRow.range_id, reqRow.agent_id, n, Date.now());
  run("UPDATE number_requests SET status='approved',allocated_count=?,notes=?,processed_at=?,processed_by=? WHERE id=?",
    n, S(body.notes || 'Approved by administrator', 200), Date.now(), u.username, reqId);
  audit(u, 'numbers.approve_request', `Req #${reqId}: allocated ${n}`, ip);
  emit([reqRow.agent_id], 'refresh', { toast: `Your request was approved! ${n} numbers allocated from ${r.name}.` });
  return { ok: true, status: 'approved', allocated: n };
});
add('GET', '/api/agent/number-requests', ['agent'], ({ u }) => {
  return all(`SELECT nr.*, (SELECT name FROM ranges r WHERE r.id=nr.range_id) range_name
              FROM number_requests nr WHERE nr.agent_id=? ORDER BY nr.id DESC LIMIT 100`, u.id);
});

// ---------- AI system, availability & automated support ----------
add('GET', '/api/admin/ai-settings', ['admin'], () => {
  const getVal = k => one("SELECT val FROM sys_settings WHERE key=?", k)?.val;
  return {
    admin_availability: getVal('admin_availability') || 'online',
    auto_approve_requests: getVal('auto_approve_requests') || '1',
    max_auto_qty: parseInt(getVal('max_auto_qty') || '50', 10),
    ai_handler_enabled: getVal('ai_handler_enabled') || '1',
    total_ai_replies: one("SELECT COUNT(*) c FROM support_chats WHERE sender='ai'")?.c || 0,
    recent_chats: all("SELECT sc.*, u.username FROM support_chats sc JOIN users u ON u.id=sc.user_id ORDER BY sc.id DESC LIMIT 30")
  };
});
add('PUT', '/api/admin/ai-settings', ['admin'], ({ u, body, ip }) => {
  if (body.admin_availability) run("INSERT OR REPLACE INTO sys_settings(key,val) VALUES('admin_availability',?)", S(body.admin_availability, 20));
  if (body.auto_approve_requests !== undefined) run("INSERT OR REPLACE INTO sys_settings(key,val) VALUES('auto_approve_requests',?)", body.auto_approve_requests ? '1' : '0');
  if (body.max_auto_qty !== undefined) run("INSERT OR REPLACE INTO sys_settings(key,val) VALUES('max_auto_qty',?)", String(Math.max(0, int(body.max_auto_qty))));
  if (body.ai_handler_enabled !== undefined) run("INSERT OR REPLACE INTO sys_settings(key,val) VALUES('ai_handler_enabled',?)", body.ai_handler_enabled ? '1' : '0');
  audit(u, 'ai_settings.update', `availability=${body.admin_availability}`, ip);
  emit(ALL_IDS(), 'refresh', { toast: `Admin availability updated: ${body.admin_availability === 'away' ? 'Away (AI Ops Active)' : 'Online'}` });
  return { ok: true };
});
add('GET', '/api/support/messages', ALL, ({ u }) => {
  const msgs = all("SELECT id, user_id, sender, message, ts FROM support_chats WHERE user_id=? ORDER BY id ASC LIMIT 100", u.id);
  const avail = one("SELECT val FROM sys_settings WHERE key='admin_availability'")?.val || 'online';
  return { availability: avail, messages: msgs };
});
add('POST', '/api/support/messages', ALL, async ({ u, body, ip }) => {
  const text = S(body.message, 1000); if (!text) bad('Message cannot be empty');
  const now = Date.now();
  run("INSERT INTO support_chats(user_id,sender,message,ts) VALUES(?,?,?,?)", u.id, 'user', text, now);
  
  const avail = one("SELECT val FROM sys_settings WHERE key='admin_availability'")?.val || 'online';
  const aiEnabled = (one("SELECT val FROM sys_settings WHERE key='ai_handler_enabled'")?.val || '1') === '1';

  let aiReplyText = null;
  // If admin is away or AI handler is enabled, AI responds automatically
  if (avail === 'away' || aiEnabled) {
    aiReplyText = await handleWithAI(u, text);
    run("INSERT INTO support_chats(user_id,sender,message,ts) VALUES(?,?,?,?)", u.id, 'ai', aiReplyText, Date.now());
    emit([u.id], 'chat', { sender: 'ai', text: aiReplyText });
  } else {
    emit(admins(), 'chat', { sender: 'user', username: u.username, text });
  }
  return { ok: true, ai_reply: aiReplyText };
});
add('GET', '/api/admin/support/chats', ['admin'], () => {
  return all(`SELECT u.id user_id, u.username, u.full_name, u.role,
              (SELECT message FROM support_chats sc WHERE sc.user_id=u.id ORDER BY sc.id DESC LIMIT 1) last_message,
              (SELECT sender FROM support_chats sc WHERE sc.user_id=u.id ORDER BY sc.id DESC LIMIT 1) last_sender,
              (SELECT ts FROM support_chats sc WHERE sc.user_id=u.id ORDER BY sc.id DESC LIMIT 1) last_ts,
              (SELECT COUNT(*) FROM support_chats sc WHERE sc.user_id=u.id) total_messages
              FROM users u
              WHERE EXISTS(SELECT 1 FROM support_chats sc WHERE sc.user_id=u.id)
              ORDER BY last_ts DESC`);
});
add('POST', '/api/admin/support/reply', ['admin'], ({ u, body, ip }) => {
  const targetUid = int(body.user_id);
  const text = S(body.message, 1000); if (!text) bad('Message cannot be empty');
  run("INSERT INTO support_chats(user_id,sender,message,ts) VALUES(?,?,?,?)", targetUid, 'admin', text, Date.now());
  audit(u, 'support.reply', `to user ${targetUid}`, ip);
  emit([targetUid], 'chat', { sender: 'admin', text });
  return { ok: true };
});

// ---------- live real-time test SMS injector ----------
add('POST', '/api/test-sms', ALL, ({ u, body, ip }) => {
  rate('testsms:' + u.id, 60, 60e3);
  let targetNumber = S(body.number, 20).replace(/\D/g, '');
  if (!targetNumber) {
    const myNum = one("SELECT msisdn FROM numbers WHERE agent_id=? ORDER BY id DESC LIMIT 1", u.id);
    if (myNum) targetNumber = myNum.msisdn;
    else {
      const anyNum = one("SELECT msisdn FROM numbers ORDER BY id DESC LIMIT 1");
      targetNumber = anyNum ? anyNum.msisdn : ('8801700' + rnd(4));
    }
  }
  const cli = S(body.cli, 30) || 'TEST_AUTH';
  const text = S(body.text, 500) || `Your MSI SMS verification code is ${Math.floor(100000 + Math.random() * 900000)} (Live Test at ${new Date().toISOString().slice(11, 19)} UTC)`;
  const res = ingest({ number: targetNumber, cli, text, ts: Date.now() });
  audit(u, 'sms.live_test', `${targetNumber} (${cli})`, ip);
  return { ok: true, number: targetNumber, cli, text, ...res };
});
add('GET', '/api/live-test-feed', ALL, ({ u }) => {
  const [where, p] = scope(u);
  return all(`SELECT m.id, m.msisdn, m.cli, m.body, m.ts, (SELECT name FROM ranges r WHERE r.id=m.range_id) range_name
              FROM messages m WHERE ${where} ORDER BY m.id DESC LIMIT 15`, ...p);
});

// ---------- agent: ranges, requests, numbers, clients ----------
add('GET', '/api/ranges', ['agent'], ({ u }) => all("SELECT r.id,r.name,r.country,r.prefix,r.agent_payout,r.daily_limit,(SELECT COUNT(*) FROM numbers n WHERE n.range_id=r.id AND n.status='free') free,COALESCE((SELECT SUM(qty) FROM alloc_log a WHERE a.range_id=r.id AND a.agent_id=? AND a.ts>=?),0) used FROM ranges r WHERE r.enabled=1 ORDER BY r.name", u.id, dayStart()));
add('POST', '/api/numbers/request', ['agent'], ({ u, body, ip }) => {
  const rid = int(body.range_id), want = int(body.qty); if (want < 1 || want > 1000) bad('Quantity must be between 1 and 1000');
  const autoApprove = (one("SELECT val FROM sys_settings WHERE key='auto_approve_requests'")?.val || '1') === '1';
  const maxAuto = parseInt(one("SELECT val FROM sys_settings WHERE key='max_auto_qty'")?.val || '50', 10);
  const r = one('SELECT * FROM ranges WHERE id=? AND enabled=1', rid); if (!r) bad('This range is not available', 404);

  // If manual approval mode or exceeds auto quota
  if (!autoApprove || (maxAuto > 0 && want > maxAuto)) {
    const reqId = Number(run('INSERT INTO number_requests(agent_id,range_id,qty,status,allocated_count,notes,created_at) VALUES(?,?,?,?,?,?)',
      u.id, rid, want, 'pending', 0, S(body.notes || 'Awaiting administrator review', 200), Date.now()).lastInsertRowid);
    audit(u, 'numbers.request_queued', `${r.name} x${want}`, ip);
    emit(admins(), 'request', { id: reqId, text: `${u.username} requested ${want} numbers from ${r.name} (Review needed)` });
    return { pending: true, id: reqId, requested: want, range: r.name, message: 'Request submitted for administrator review.' };
  }

  const out = tx(() => {
    const used = one('SELECT COALESCE(SUM(qty),0) s FROM alloc_log WHERE range_id=? AND agent_id=? AND ts>=?', rid, u.id, dayStart()).s;
    let qty = want;
    if (r.daily_limit > 0) { const left = r.daily_limit - used; if (left <= 0) bad('Your daily limit for this range has been reached'); qty = Math.min(qty, left); }
    const pick = all("SELECT id FROM numbers WHERE range_id=? AND status='free' ORDER BY id LIMIT ?", rid, qty).map(x => x.id);
    if (!pick.length) bad('There are no free numbers in this range right now');
    const st = db.prepare("UPDATE numbers SET status='allocated',agent_id=?,client_id=NULL,agent_payout=?,client_payout=0,allocated_at=? WHERE id=? AND status='free'");
    let n = 0; for (const id of pick) n += Number(st.run(u.id, r.agent_payout, Date.now(), id).changes);
    run('INSERT INTO alloc_log(range_id,agent_id,qty,ts) VALUES(?,?,?,?)', rid, u.id, n, Date.now());
    run("INSERT INTO number_requests(agent_id,range_id,qty,status,allocated_count,notes,created_at,processed_at,processed_by) VALUES(?,?,?,?,?,?,?,?,?)",
      u.id, rid, want, 'auto_approved', n, 'Automatically approved by system rule', Date.now(), Date.now(), 'system_auto');
    audit(u, 'numbers.request', `${r.name} x${n}`, ip);
    return { allocated: n, requested: want, range: r.name };
  });
  emit(admins(), 'refresh', { toast: `${u.username} took ${out.allocated} numbers from ${out.range}` });
  return out;
});
add('GET', '/api/numbers', ['agent', 'client'], ({ u, q }) => {
  const w = [u.role === 'agent' ? 'n.agent_id=?' : 'n.client_id=?'], p = [u.id];
  if (q.range) { w.push('n.range_id=?'); p.push(int(q.range)); }
  if (q.status === 'unassigned') w.push('n.client_id IS NULL'); else if (q.status === 'assigned') w.push('n.client_id IS NOT NULL');
  if (q.q) { w.push('n.msisdn LIKE ?'); p.push('%' + S(q.q, 20).replace(/\D/g, '') + '%'); }
  const total = one(`SELECT COUNT(*) c FROM numbers n WHERE ${w.join(' AND ')}`, ...p).c;
  const rows = all(`SELECT n.id,n.msisdn,n.status,n.last_sms,n.agent_payout,n.client_payout,n.allocated_at,(SELECT name FROM ranges r WHERE r.id=n.range_id) range,(SELECT username FROM users c WHERE c.id=n.client_id) client FROM numbers n WHERE ${w.join(' AND ')} ORDER BY n.id DESC LIMIT 500 OFFSET ?`, ...p, Math.max(0, int(q.offset || 0)));
  return { rows, total };
});
add('POST', '/api/numbers/assign', ['agent'], ({ u, body, ip }) => {
  const list = ids(body.ids), cid = body.client_id ? int(body.client_id) : null; let cp = 0;
  if (cid) { if (!one("SELECT id FROM users WHERE id=? AND parent_id=? AND role='client'", cid, u.id)) bad('Client not found', 404); cp = micro(body.client_payout || 0); }
  const n = tx(() => { let c = 0; for (const id of list) { const row = one("SELECT * FROM numbers WHERE id=? AND agent_id=? AND status='allocated'", id, u.id); if (!row) continue; if (cp > row.agent_payout) bad('Client payout cannot be higher than your payout (' + (row.agent_payout / 1e6) + ')'); c += Number(run('UPDATE numbers SET client_id=?,client_payout=? WHERE id=?', cid, cid ? cp : 0, id).changes); } return c; });
  audit(u, cid ? 'numbers.assign' : 'numbers.unassign', `${n} numbers`, ip);
  if (cid) emit([cid], 'refresh', { toast: `${n} number(s) were assigned to you` });
  return { updated: n };
});
add('POST', '/api/numbers/release', ['agent'], ({ u, body, ip }) => {
  const list = ids(body.ids);
  const n = tx(() => { let c = 0; for (const id of list) c += Number(run("UPDATE numbers SET status='free',agent_id=NULL,client_id=NULL,agent_payout=0,client_payout=0,allocated_at=NULL WHERE id=? AND agent_id=?", id, u.id).changes); return c; });
  audit(u, 'numbers.release', `${n} numbers`, ip); emit(admins(), 'refresh', {});
  return { released: n };
});
add('GET', '/api/clients', ['agent'], ({ u }) => all("SELECT id,username,full_name,email,whatsapp,status,created_at,last_login,(SELECT COUNT(*) FROM numbers n WHERE n.client_id=users.id) numbers FROM users WHERE parent_id=? AND role='client' ORDER BY id DESC", u.id));
add('POST', '/api/clients', ['agent'], ({ u, body, ip }) => {
  const username = uname(body.username), pw = pass(body.password);
  if (one('SELECT id FROM users WHERE username=?', username)) bad('That username is already taken', 409);
  const id = createUser({ username, password: pw, role: 'client', status: 'active', parent_id: u.id, full_name: S(body.full_name, 80), email: S(body.email, 120), whatsapp: S(body.whatsapp, 30), country: S(body.country, 60) });
  audit(u, 'client.create', username, ip); emit(admins(), 'refresh', {});
  return { id };
});
add('POST', '/api/clients/:id/status', ['agent'], ({ u, p, body }) => {
  const st = S(body.status, 12); if (!['active', 'suspended'].includes(st)) bad('Invalid status');
  const c = one("SELECT id FROM users WHERE id=? AND parent_id=? AND role='client'", int(p.id), u.id); if (!c) bad('Client not found', 404);
  run('UPDATE users SET status=? WHERE id=?', st, c.id); if (st !== 'active') run('DELETE FROM sessions WHERE user_id=?', c.id);
  return { ok: true };
});

// ---------- stats, CDR, ledger ----------
const scope = u => u.role === 'agent' ? ['agent_id=?', u.id] : u.role === 'client' ? ['client_id=?', u.id] : ['1=1'];
const AMT = u => u.role === 'agent' ? 'agent_amt' : u.role === 'client' ? 'client_amt' : '(agent_amt+client_amt)';
add('GET', '/api/stats', ALL, ({ u }) => {
  const D = dayStart(), d = new Date(D), wk = D - ((d.getUTCDay() + 6) % 7) * 864e5, mo = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1), yr = Date.UTC(d.getUTCFullYear(), 0, 1);
  const [w, ...wp] = scope(u), cnt = t => one(`SELECT COUNT(*) c FROM messages WHERE ${w} AND ts>=?`, ...wp, t).c;
  const out = { sms: { today: cnt(D), week: cnt(wk), month: cnt(mo), year: cnt(yr), all: cnt(0) }, series: [] };
  for (let i = 6; i >= 0; i--) { const s = D - i * 864e5; out.series.push({ day: new Date(s).toISOString().slice(0, 10), n: one(`SELECT COUNT(*) c FROM messages WHERE ${w} AND ts>=? AND ts<?`, ...wp, s, s + 864e5).c }); }
  if (u.role === 'admin') {
    out.agents = one("SELECT COUNT(*) c FROM users WHERE role='agent' AND status='active'").c;
    out.pending = one("SELECT COUNT(*) c FROM users WHERE status='pending'").c;
    out.clients = one("SELECT COUNT(*) c FROM users WHERE role='client'").c;
    out.free = one("SELECT COUNT(*) c FROM numbers WHERE status='free'").c;
    out.allocated = one("SELECT COUNT(*) c FROM numbers WHERE status='allocated'").c;
    out.tenants_count = one("SELECT COUNT(*) c FROM tenants WHERE status='active'")?.c || 0;
    out.active_sessions = one("SELECT COUNT(*) c FROM sessions WHERE exp>?", Date.now())?.c || 0;
    out.pending_requests = one("SELECT COUNT(*) c FROM number_requests WHERE status='pending'")?.c || 0;
    out.admin_availability = one("SELECT val FROM sys_settings WHERE key='admin_availability'")?.val || 'online';
    out.auto_approve_requests = one("SELECT val FROM sys_settings WHERE key='auto_approve_requests'")?.val || '1';
  } else {
    out.balance = one('SELECT COALESCE(SUM(amount),0) b FROM ledger WHERE user_id=?', u.id).b;
    out.numbers = one(`SELECT COUNT(*) c FROM numbers WHERE ${u.role === 'agent' ? 'agent_id' : 'client_id'}=?`, u.id).c;
    if (u.role === 'agent') out.clients = one("SELECT COUNT(*) c FROM users WHERE parent_id=? AND role='client'", u.id).c;
    out.tenant = one("SELECT name, tenant_id, status FROM tenants WHERE agent_id=?", u.id);
    out.admin_availability = one("SELECT val FROM sys_settings WHERE key='admin_availability'")?.val || 'online';
  }
  return out;
});
function cdrWhere(u, q) {
  const [sw, ...sp] = scope(u), w = [sw], p = [...sp];
  if (q.from) { w.push('ts>=?'); p.push(Number(q.from)); }
  if (q.to) { w.push('ts<=?'); p.push(Number(q.to)); }
  if (q.range) { w.push('range_id=?'); p.push(int(q.range)); }
  const like = (col, v) => { w.push(`${col} LIKE ?`); p.push('%' + S(v, 60).replace(/[%_]/g, '') + '%'); };
  if (q.number) like('msisdn', q.number); if (q.cli) like('cli', q.cli); if (q.text) like('body', q.text);
  if (u.role === 'admin' && q.agent) { w.push('agent_id=(SELECT id FROM users WHERE username=?)'); p.push(S(q.agent, 24).toLowerCase()); }
  return [w.join(' AND '), p];
}
const GROUPS = { date: "strftime('%Y-%m-%d',ts/1000,'unixepoch')", hour: "strftime('%Y-%m-%d %H:00',ts/1000,'unixepoch')", range: '(SELECT name FROM ranges r WHERE r.id=messages.range_id)', number: 'msisdn', cli: 'cli' };
add('GET', '/api/cdr', ALL, ({ u, q }) => {
  const [where, p] = cdrWhere(u, q), amt = AMT(u);
  const tot = one(`SELECT COUNT(*) c,COALESCE(SUM(${amt}),0) a FROM messages WHERE ${where}`, ...p);
  if (q.group && GROUPS[q.group]) return { group: q.group, total: tot.c, amt: tot.a, rows: all(`SELECT ${GROUPS[q.group]} g,COUNT(*) sms,COALESCE(SUM(${amt}),0) amt FROM messages WHERE ${where} GROUP BY g ORDER BY g DESC LIMIT 300`, ...p) };
  return { total: tot.c, amt: tot.a, rows: all(`SELECT ts,msisdn,cli,body,${amt} amt,(SELECT name FROM ranges r WHERE r.id=messages.range_id) range,(SELECT username FROM users a WHERE a.id=messages.agent_id) agent FROM messages WHERE ${where} ORDER BY ts DESC LIMIT 200 OFFSET ?`, ...p, Math.max(0, int(q.offset || 0))) };
});
add('GET', '/api/ledger', ['agent', 'client'], ({ u }) => ({ balance: one('SELECT COALESCE(SUM(amount),0) b FROM ledger WHERE user_id=?', u.id).b, rows: all('SELECT ts,amount,kind,ref FROM ledger WHERE user_id=? ORDER BY id DESC LIMIT 200', u.id) }));

// ---------- public APIs: provider message ingest + token CDR ----------
function ingest(m) {
  const num = String(m.number || '').replace(/\D/g, ''); if (num.length < 6 || num.length > 15) return { error: 'invalid number' };
  const ts = Number(m.ts) || Date.now(), n = one('SELECT * FROM numbers WHERE msisdn=?', num);
  return tx(() => {
    let a = 0, c = 0, ag = null, cl = null;
    if (n && n.status === 'allocated') { ag = n.agent_id; cl = n.client_id; c = cl ? n.client_payout : 0; a = n.agent_payout - c; }
    const mid = Number(run('INSERT INTO messages(range_id,number_id,msisdn,cli,body,ts,agent_id,client_id,agent_amt,client_amt) VALUES(?,?,?,?,?,?,?,?,?,?)', n ? n.range_id : null, n ? n.id : null, num, S(m.cli, 40), S(m.text, 1000), ts, ag, cl, a, c).lastInsertRowid);
    if (ag && a) run('INSERT INTO ledger(user_id,amount,kind,ref,ts) VALUES(?,?,?,?,?)', ag, a, 'sms', String(mid), ts);
    if (cl && c) run('INSERT INTO ledger(user_id,amount,kind,ref,ts) VALUES(?,?,?,?,?)', cl, c, 'sms', String(mid), ts);
    if (n) run('UPDATE numbers SET last_sms=? WHERE id=?', ts, n.id);
    emit([ag, cl, ...admins()].filter(Boolean), 'message', { toast: 'New SMS on ' + num });
    return { id: mid, billed: !!ag };
  });
}
add('POST', '/api/ingest', null, ({ req, body, ip }) => {
  rate('ing:' + ip, 1200, 60e3);
  const key = S(req.headers['x-api-key'], 100);
  if (!key || !one('SELECT id FROM api_keys WHERE hash=? AND revoked=0', sha(key))) bad('Invalid API key', 401);
  const items = Array.isArray(body) ? body : Array.isArray(body.messages) ? body.messages : [body];
  if (items.length > 500) bad('Send at most 500 messages per request');
  return { ok: true, results: items.map(ingest) };
});
add('GET', '/api/v2/cdr', null, ({ q }) => {
  const tk = S(q.token, 60); rate('v2:' + tk, 120, 60e3);
  const u = tk && one("SELECT * FROM users WHERE api_token=? AND status='active' AND role IN ('agent','client')", tk); if (!u) bad('Invalid token', 401);
  const t = s => { const v = Date.parse(String(s).replace(' ', 'T') + (String(s).length <= 10 ? 'T00:00:00' : '') + 'Z'); return Number.isFinite(v) ? v : null; };
  const f = { from: q.dt1 ? t(q.dt1) : '', to: q.dt2 ? t(q.dt2) : '', number: q.filternum, cli: q.filtercli };
  const [where, p] = cdrWhere(u, f), amt = AMT(u), lim = Math.min(Math.max(int(q.records || 100), 1), 1000);
  const total = one(`SELECT COUNT(*) c FROM messages WHERE ${where}`, ...p).c;
  const data = all(`SELECT ts,msisdn,cli,body,${amt} amt FROM messages WHERE ${where} ORDER BY ts DESC LIMIT ?`, ...p, lim).map(r => ({ dt: new Date(r.ts).toISOString().slice(0, 19).replace('T', ' '), num: r.msisdn, cli: r.cli, message: r.body, payout: (r.amt / 1e6).toFixed(6) }));
  return { status: 'success', total, data };
});

// ---------- server ----------
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };
function serveStatic(p, res) {
  const f = path.normalize(path.join(PUB, p === '/' ? 'index.html' : p));
  if (!f.startsWith(PUB + path.sep)) { res.writeHead(403); return res.end(); }
  fs.readFile(f, (e, d) => {
    if (e) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream', 'Cache-Control': /\.(webp|png)$/.test(f) ? 'public, max-age=86400' : 'no-cache' });
    res.end(d);
  });
}
const readBody = req => new Promise((ok, no) => { let n = 0; const c = []; req.on('data', d => { n += d.length; if (n > 5e6) { no(new HttpError(413, 'Payload too large')); req.destroy(); } else c.push(d); }); req.on('end', () => { try { const t = Buffer.concat(c).toString(); ok(t ? JSON.parse(t) : {}); } catch { no(new HttpError(400, 'Invalid JSON')); } }); req.on('error', no); });
const json = (res, code, o) => { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(o)); };

const server = http.createServer(async (req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'same-origin');
  res.setHeader('Content-Security-Policy', "default-src 'self' data: blob: https:; img-src 'self' data: blob: https:; style-src 'self' 'unsafe-inline' https:; script-src 'self' 'unsafe-inline' https:; connect-src 'self' https: wss:; frame-ancestors *;");
  try {
    const url = new URL(req.url, 'http://x');
    if (!url.pathname.startsWith('/api/')) return serveStatic(decodeURIComponent(url.pathname), res);
    const ip = (TRUST_PROXY && String(req.headers['x-forwarded-for'] || '').split(',')[0].trim()) || req.socket.remoteAddress || '';
    if (req.method !== 'GET' && url.pathname !== '/api/ingest' && req.headers['x-requested-with'] !== 'msi') bad('Bad request', 403);
    const body = ['POST', 'PUT', 'DELETE'].includes(req.method) ? await readBody(req) : {};
    const u = getUser(req);
    for (const r of routes) {
      if (r.m !== req.method) continue;
      const m = r.re.exec(url.pathname); if (!m) continue;
      if (r.roles) { if (!u) bad('Please sign in', 401); if (!r.roles.includes(u.role)) bad('Forbidden', 403); }
      const out = await r.fn({ req, res, u, body, q: Object.fromEntries(url.searchParams), p: m.groups || {}, ip });
      if (out !== undefined && !res.headersSent) json(res, 200, out);
      return;
    }
    bad('Not found', 404);
  } catch (e) {
    if (res.headersSent) return res.end();
    if (e instanceof HttpError) return json(res, e.code, { error: e.message });
    console.error(e); json(res, 500, { error: 'Server error' });
  }
});

// first start: create the admin account
if (!one("SELECT id FROM users WHERE role='admin'")) {
  const un = uname(process.env.ADMIN_USERNAME || 'admin'), pw = process.env.ADMIN_PASSWORD || rnd(8);
  createUser({ username: un, password: pass(pw), role: 'admin', status: 'active', full_name: 'Administrator' });
  console.log(`\n  Admin account created.\n  Username: ${un}\n  Password: ${process.env.ADMIN_PASSWORD ? '(the ADMIN_PASSWORD you set)' : pw}\n  Change it after your first login.\n`);
}
server.listen(PORT, () => console.log(`MSI SMS is running on http://localhost:${PORT}`));
