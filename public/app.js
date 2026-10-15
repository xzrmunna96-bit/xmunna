'use strict';
const P={dash:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c2.5 0 4.5 1.8 4.5 4.5"/>',
uplus:'<circle cx="10" cy="8" r="3.5"/><path d="M3 20c0-3.6 3-6 7-6M18 14v6M15 17h6"/>',
sliders:'<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H15a3 3 0 010 6H9a3 3 0 000 6h6.5"/>',
phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
bill:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6"/>',
code:'<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3"/>',
chat:'<path d="M4 5h16v11H9l-5 4zM8 9h8M8 12h5"/>',
ann:'<path d="M6 16v-5a6 6 0 0112 0v5l2 2H4zM10 21h4M2 8c.5-2 1.5-3.5 3-4.5M22 8c-.5-2-1.5-3.5-3-4.5"/>',
bell:'<path d="M6 16v-5a6 6 0 0112 0v5l2 2H4zM10 21h4"/>',
dl:'<path d="M12 4v11M7 11l5 5 5-5M4 20h16"/>',
prof:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M6 19c1.5-3 4-4 6-4s4.5 1 6 4"/>',
pulse:'<path d="M3 12h4l3-8 4 16 3-8h4"/>',
search:'<circle cx="11" cy="11" r="6.5"/><path d="M16 16l5 5"/>',
clip:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 3h6v3H9zM9 11h6M9 15h6"/>',
chev:'<path d="M6 9l6 6 6-6"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',
globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
out:'<path d="M10 4H5v16h5M15 8l4 4-4 4M19 12H9"/>',
cal:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M8 3v4M16 3v4"/>',plus:'<path d="M12 5v14M5 12h14"/>',refresh:'<path d="M20 12a8 8 0 11-2.3-5.7M20 4v5h-5"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.5-6 8-6s8 2 8 6"/>',exp:'<path d="M7 3h7l4 4v14H7zM14 3v4h4M12 11v5M10 14l2 2 2-2"/>',txt:'<path d="M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5"/>',copy:'<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 012-2h9"/>',uminus:'<circle cx="10" cy="8" r="3.5"/><path d="M3 20c0-3.6 3-6 7-6M15 17h6"/>',chk:'<path d="M5 12l5 5 9-10"/>',hook:'<circle cx="12" cy="6" r="2.5"/><circle cx="6" cy="17" r="2.5"/><circle cx="18" cy="17" r="2.5"/><path d="M11 8.5L7 14.5M13 8.5l4 6M8.5 17h7"/>',shield:'<path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"/><path d="M9 12l2 2 4-4"/>',book:'<path d="M3 5h7a2 2 0 012 2v13a2 2 0 00-2-2H3zM21 5h-7a2 2 0 00-2 2v13a2 2 0 012-2h7z"/>',link:'<path d="M9 15l6-6M11 7l1.5-1.5a4 4 0 016 6L17 13M13 17l-1.5 1.5a4 4 0 01-6-6L7 11"/>',eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',eyeoff:'<path d="M3 3l18 18M6 8c-2.500 1.800-4 4-4 4s4 7 10 7c1.600 0 3-.4 4.200-1M9.500 5.300C10.300 5.100 11.100 5 12 5c6 0 10 7 10 7s-.9 1.600-2.500 3.200"/>',wallet:'<path d="M4 7l2-3h12l2 3M4 7h16v13H4zM4 13h5l1 2h4l1-2h5"/>',term:'<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 10l3 2-3 2M13 14h3"/>',okc:'<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',save:'<path d="M5 4h11l3 3v13H5zM8 4v5h7V4M8 20v-6h8v6"/>',send:'<path d="M4 12l16-8-6 16-3-7z"/>',checks:'<path d="M2 13l4 4 8-9M10 15l2 2 8-10"/>',mob:'<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M12 17h.01"/>'};
const S = n => `<svg class="i" viewBox="0 0 24 24">${P[n] || P.dash}</svg>`;
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fm = n => (n / 1e6).toFixed(4), ft = t => t ? new Date(t).toISOString().slice(0, 16).replace('T', ' ') + ' UTC' : '—';
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
let ME = null, PAGE = 'dash', ES = null, LAST = null; const FIL = {};
const ALL_GRPS = ['sms_grp', 'clients_grp', 'billing_grp', 'support_grp', 'tools_grp', 'users_grp', 'inventory_grp', 'finance_grp'];
const OPEN_GRPS = new Set(ALL_GRPS);

async function api(p, o = {}) {
  const sid = localStorage.getItem('msi_sid');
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'msi',
    ...(sid ? { 'Authorization': `Bearer ${sid}`, 'x-session-token': sid } : {}),
    ...(o.headers || {})
  };
  const r = await fetch('/api' + p, {
    method: o.method || (o.body ? 'POST' : 'GET'),
    credentials: 'include',
    headers,
    body: o.body ? JSON.stringify(o.body) : undefined
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) {
    if (r.status === 401 && ME) {
      localStorage.removeItem('msi_sid');
      ME = null;
      showAuth('login');
    }
    throw new Error(j.error || 'Something went wrong. Please try again.');
  }
  return j;
}
const toast = t => { const e = $('#toast'); if (!e) return; e.textContent = t; e.className = 'show'; clearTimeout(toast.t); toast.t = setTimeout(() => e.className = '', 4500); };

// safe prompt & confirm
function safePrompt(msg, def = '') { try { return window.prompt(msg, def); } catch { return def; } }
function safeConfirm(msg) { try { return window.confirm(msg); } catch { return true; } }

// ---------- html builders ----------
const F = (l, n, t = 'text', o = {}) => `<div class="f"><label>${l}</label>${t === 'select' ? `<div class="sel"><select name="${n}">${o.opts.map(x => { const [v, lb] = Array.isArray(x) ? x : [x, x]; return `<option value="${esc(v)}"${String(o.val ?? '') === String(v) ? ' selected' : ''}>${esc(lb)}</option>`; }).join('')}</select></div>` : t === 'area' ? `<textarea name="${n}" style="height:140px" placeholder="${esc(o.ph || '')}">${esc(o.val || '')}</textarea>` : `<input name="${n}" type="${t}" value="${esc(o.val ?? '')}" placeholder="${esc(o.ph || '')}"${o.req ? ' required' : ''}${t === 'password' ? ' autocomplete="new-password"' : ''}${o.step ? ` step="${o.step}"` : ''}${o.min !== undefined ? ` min="${o.min}"` : ''}>`}</div>`;
const card = (eb, t, inner, right = '') => `<section class="card"><div class="hr"><div>${eb ? `<div class="eyebrow">${eb}</div>` : ''}<h2>${t}</h2></div>${right}</div>${inner}</section>`;
const tbl = (cols, rows, empty) => `<div class="dw box"><table style="min-width:${cols.length * 120}px"><thead><tr>${cols.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.length ? rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('') : `<tr><td colspan="${cols.length}" class="muted">${empty}</td></tr>`}</tbody></table></div>`;
const form = (act, fields, btn, extra = '') => `<form class="af" data-do="${act}">${fields}${extra}<button class="btn g wide" type="submit">${btn}</button><div class="msg"></div></form>`;
const badge = s => `<span class="badg" style="${s === 'active' || s === 'approved' || s === 'paid' ? '' : 'background:rgba(255,255,255,.08);color:var(--muted)'}">${esc(s)}</span>`;
const sm = (act, id, label, v = '') => `<button class="sm" data-act="${act}" data-id="${id}" data-v="${esc(v)}">${label}</button>`;
const filt = (page, fields) => `<form class="af" data-do="filter" data-page="${page}">${fields}<button class="btn g wide" type="submit"><u>${S('search')}</u>Search</button></form>`;
const rangeOpts = async (all = true) => { const r = await api('/range-names'); return [...(all ? [['', 'All ranges']] : []), ...r.map(x => [x.id, x.name])]; };

// ---------- pages ----------
const PG = {
  async dash() {
    const s = await api('/stats'), mx = Math.max(1, ...(s.series || []).map(x => x.n));
    const kp = ME.role === 'admin'
      ? [['Active agents', s.agents || 0], ['Pending approvals', s.pending || 0], ['Clients', s.clients || 0], ['Free numbers', s.free || 0], ['Allocated numbers', s.allocated || 0], ['SMS today', s.sms?.today || 0], ['SMS this month', s.sms?.month || 0], ['SMS all time', s.sms?.all || 0]]
      : [['Today SMS', s.sms?.today || 0], ['This Week SMS', s.sms?.week || 0], ['This Month SMS', s.sms?.month || 0], ['This Year SMS', s.sms?.year || 0], ['All Time SMS', s.sms?.all || 0], ['Balance (USD)', fm(s.balance || 0)], ['My numbers', s.numbers || 0], ...(ME.role === 'agent' ? [['Clients', s.clients || 0]] : [])];

    const agentModHtml = `
      <section class="card">
        <div class="eyebrow">AGENT NAVIGATION CENTER</div>
        <h2 style="margin:0 0 4px">Agent Modules & Features (All Portal Options)</h2>
        <p class="muted" style="margin:0 0 16px">Quick access to all sections and sub-options in your agent portal.</p>
        <div class="mod-grid">
          <div class="mod-card">
            <div class="mod-head"><span>${S('sliders')} SMS Module</span><span class="badge active">5 Options</span></div>
            <div class="mod-links">
              <button class="mod-btn" data-go="franges">${S('sliders')} <b>Ranges & Request</b> — Browse stock & request</button>
              <button class="mod-btn" data-go="fnumbers">${S('phone')} <b>My Numbers</b> — Active allocated numbers</button>
              <button class="mod-btn" data-go="livesms">${S('pulse')} <b>Live SMS Stream</b> — Real-time incoming SMS</button>
              <button class="mod-btn" data-go="testsms">${S('txt')} <b>Test SMS Simulator</b> — Send test message</button>
              <button class="mod-btn" data-go="cdr">${S('search')} <b>CDR & Statistics</b> — Complete SMS logs</button>
            </div>
          </div>
          <div class="mod-card">
            <div class="mod-head"><span>${S('users')} Clients Master</span><span class="badge active">3 Options</span></div>
            <div class="mod-links">
              <button class="mod-btn" data-go="clients">${S('users')} <b>Clients List</b> — Manage your clients</button>
              <button class="mod-btn" data-go="addclient">${S('uplus')} <b>Create Client</b> — Add new client account</button>
              <button class="mod-btn" data-go="assign_client">${S('phone')} <b>Assign Numbers</b> — Allocate numbers & rate</button>
            </div>
          </div>
          <div class="mod-card">
            <div class="mod-head"><span>${S('wallet')} Billing & Payout</span><span class="badge active">3 Options</span></div>
            <div class="mod-links">
              <button class="mod-btn" data-go="bill">${S('bill')} <b>Balance & Ledger</b> — Current balance & history</button>
              <button class="mod-btn" data-go="payout">${S('wallet')} <b>Request Payout</b> — Withdraw your earnings</button>
              <button class="mod-btn" data-go="payout_hist">${S('book')} <b>Payout History</b> — View all withdrawal records</button>
            </div>
          </div>
          <div class="mod-card">
            <div class="mod-head"><span>${S('ann')} Support & Notice</span><span class="badge active">2 Options</span></div>
            <div class="mod-links">
              <button class="mod-btn" data-go="ann">${S('ann')} <b>Announcements</b> — System news & updates</button>
              <button class="mod-btn" data-go="chat">${S('chat')} <b>Live Support Chat</b> — Contact admin desk</button>
            </div>
          </div>
          <div class="mod-card">
            <div class="mod-head"><span>${S('mob')} Tools & Download</span><span class="badge active">3 Options</span></div>
            <div class="mod-links">
              <button class="mod-btn" data-go="prof">${S('prof')} <b>Profile & Password</b> — Account settings</button>
              <button class="mod-btn" data-go="dev_api">${S('key')} <b>API Token & Docs</b> — CDR API access</button>
              <button class="mod-btn" data-go="mobapp">${S('dl')} <b>Mobile Android App</b> — App download & setup</button>
            </div>
          </div>
        </div>
      </section>
    `;

    const adminModHtml = `
      <section class="card">
        <div class="eyebrow">ADMIN MANAGEMENT CENTER</div>
        <h2 style="margin:0 0 4px">Admin Modules & Features (All Control Panels)</h2>
        <p class="muted" style="margin:0 0 16px">Master management modules and administrative control panels.</p>
        <div class="mod-grid">
          <div class="mod-card">
            <div class="mod-head"><span>${S('users')} User Management</span><span class="badge active">3 Options</span></div>
            <div class="mod-links">
              <button class="mod-btn" data-go="users">${S('users')} <b>Users Master</b> — All accounts & statuses</button>
              <button class="mod-btn" data-go="pending_users">${S('chk')} <b>Pending Approvals</b> — Review registrations</button>
              <button class="mod-btn" data-go="add_user">${S('uplus')} <b>Create User</b> — Add agent/admin/client</button>
            </div>
          </div>
          <div class="mod-card">
            <div class="mod-head"><span>${S('sliders')} Inventory & Ranges</span><span class="badge active">3 Options</span></div>
            <div class="mod-links">
              <button class="mod-btn" data-go="aranges">${S('sliders')} <b>Ranges Management</b> — Country ranges & rates</button>
              <button class="mod-btn" data-go="anumbers">${S('phone')} <b>Numbers List</b> — Full phone inventory</button>
              <button class="mod-btn" data-go="upload_num">${S('exp')} <b>Upload Numbers</b> — Bulk import numbers</button>
            </div>
          </div>
          <div class="mod-card">
            <div class="mod-head"><span>${S('search')} Messages & Routing</span><span class="badge active">4 Options</span></div>
            <div class="mod-links">
              <button class="mod-btn" data-go="cdr">${S('search')} <b>Messages & CDR</b> — Global SMS records</button>
              <button class="mod-btn" data-go="livesms">${S('pulse')} <b>Live SMS Monitor</b> — Real-time feed</button>
              <button class="mod-btn" data-go="keys">${S('key')} <b>API Ingest Keys</b> — Provider webhook keys</button>
              <button class="mod-btn" data-go="testsms">${S('send')} <b>Test SMS Simulator</b> — Ingest test message</button>
            </div>
          </div>
          <div class="mod-card">
            <div class="mod-head"><span>${S('wallet')} Finance & Payouts</span><span class="badge active">3 Options</span></div>
            <div class="mod-links">
              <button class="mod-btn" data-go="admin_payout">${S('wallet')} <b>Payout Requests</b> — Approve agent payouts</button>
              <button class="mod-btn" data-go="bill">${S('bill')} <b>System Ledger</b> — Credits & debits balance</button>
              <button class="mod-btn" data-go="audit">${S('book')} <b>Security Audit Log</b> — Activity tracking</button>
            </div>
          </div>
          <div class="mod-card">
            <div class="mod-head"><span>${S('ann')} Support & Notice</span><span class="badge active">3 Options</span></div>
            <div class="mod-links">
              <button class="mod-btn" data-go="ann">${S('ann')} <b>Announcements</b> — Post system broadcast</button>
              <button class="mod-btn" data-go="chat">${S('chat')} <b>Support Desk</b> — Reply to agents/clients</button>
              <button class="mod-btn" data-go="prof">${S('prof')} <b>Profile & Settings</b> — Admin settings</button>
            </div>
          </div>
        </div>
      </section>
    `;

    const clientModHtml = `
      <section class="card">
        <div class="eyebrow">CLIENT NAVIGATION CENTER</div>
        <h2 style="margin:0 0 4px">Client Modules & Features (All Portal Options)</h2>
        <p class="muted" style="margin:0 0 16px">Access your assigned numbers, live SMS, and statistics.</p>
        <div class="mod-grid">
          <div class="mod-card">
            <div class="mod-head"><span>${S('phone')} SMS Module</span><span class="badge active">3 Options</span></div>
            <div class="mod-links">
              <button class="mod-btn" data-go="fnumbers">${S('phone')} <b>My Numbers</b> — Your assigned numbers</button>
              <button class="mod-btn" data-go="livesms">${S('pulse')} <b>Live SMS Feed</b> — Incoming messages</button>
              <button class="mod-btn" data-go="cdr">${S('search')} <b>CDR & Statistics</b> — Complete SMS logs</button>
            </div>
          </div>
          <div class="mod-card">
            <div class="mod-head"><span>${S('bill')} Billing & Account</span><span class="badge active">4 Options</span></div>
            <div class="mod-links">
              <button class="mod-btn" data-go="bill">${S('bill')} <b>Balance & Ledger</b> — Current balance</button>
              <button class="mod-btn" data-go="ann">${S('ann')} <b>Announcements</b> — System updates</button>
              <button class="mod-btn" data-go="chat">${S('chat')} <b>Support Chat</b> — Help desk</button>
              <button class="mod-btn" data-go="prof">${S('prof')} <b>Profile & API</b> — Settings & API token</button>
            </div>
          </div>
        </div>
      </section>
    `;

    return `<section class="card hero"><div class="eyebrow">MSI SMS</div><h1>${esc(ME.full_name || ME.username)}</h1><p class="muted" style="margin:0">Live overview — updates the moment something happens.</p>${s.pending ? `<div class="row"><button class="btn g nf" data-go="pending_users">${s.pending} account(s) waiting for approval</button></div>` : ''}</section>`
      + card('Overview', 'Overview', `<div class="stats">${kp.map(([l, v]) => `<div class="stat"><small>${l}</small><strong>${esc(v)}</strong></div>`).join('')}</div>`)
      + (ME.role === 'agent' ? agentModHtml : (ME.role === 'admin' ? adminModHtml : clientModHtml))
      + card('SMS Activity', 'SMS Last 7 Days', `<div class="chart">${(s.series || []).map(x => `<div class="bar"><em>${x.n}</em><div style="height:${Math.max(x.n / mx * 100, 3)}%"></div>${x.day.slice(5)}</div>`).join('')}</div>`);
  },
  // ----- admin users
  async users() {
    const f = FIL.users || {}, rows = await api('/admin/users?' + new URLSearchParams(f));
    const acts = u => [u.status !== 'active' ? sm('setst', u.id, u.status === 'pending' ? 'Approve' : 'Activate', 'active') : '', u.status === 'pending' ? sm('setst', u.id, 'Reject', 'rejected') : '', u.status === 'active' && u.id !== ME.id ? sm('setst', u.id, 'Suspend', 'suspended') : '', sm('resetpw', u.id, 'Reset password')].join(' ');
    return card('User Management', 'Users Master', filt('users', F('Role', 'role', 'select', { opts: [['', 'All roles'], 'admin', 'agent', 'client'], val: f.role }) + F('Status', 'status', 'select', { opts: [['', 'All statuses'], 'pending', 'active', 'suspended', 'rejected'], val: f.status }) + F('Search', 'q', 'text', { val: f.q, ph: 'Username, name or email' }))
      + tbl(['User', 'Name', 'Role', 'Status', 'Contact', 'Agent', 'Numbers', 'Last login', 'Actions'], rows.map(u => [esc(u.username), esc(u.full_name), esc(u.role), badge(u.status), esc([u.email, u.whatsapp].filter(Boolean).join(' · ')), esc(u.parent || '—'), u.nums, ft(u.last_login), acts(u)]), 'No users found.'));
  },
  async pending_users() {
    const rows = await api('/admin/users?status=pending');
    const acts = u => [sm('setst', u.id, 'Approve', 'active'), sm('setst', u.id, 'Reject', 'rejected')].join(' ');
    return card('Approvals', 'Pending Agent Applications', `<p class="muted">Review new agent registration applications. Approving an account grants immediate login access.</p>`
      + tbl(['User', 'Name', 'Contact', 'Country', 'Requested At', 'Actions'], rows.map(u => [esc(u.username), esc(u.full_name), esc([u.email, u.whatsapp].filter(Boolean).join(' · ')), esc(u.country || '—'), ft(u.created_at), acts(u)]), 'No pending accounts right now.'));
  },
  async add_user() {
    return card('Accounts', 'Create User', form('createUser', F('Username', 'username', 'text', { req: 1 }) + F('Password', 'password', 'password', { req: 1 }) + F('Full name', 'full_name') + F('Email', 'email', 'email') + F('WhatsApp', 'whatsapp') + F('Country', 'country') + F('Role', 'role', 'select', { opts: ['agent', 'client', 'admin'] }) + F('Agent username (only for clients)', 'agent'), 'Create user'));
  },
  // ----- admin inventory
  async aranges() {
    const rs = await api('/admin/ranges'), opts = rs.map(r => [r.id, r.name]);
    return card('Inventory', 'Ranges Management', tbl(['Range', 'Country', 'Prefix', 'Agent payout', 'Daily limit', 'Free', 'Allocated', 'Status', ''], rs.map(r => [esc(r.name), esc(r.country), esc(r.prefix), fm(r.agent_payout), r.daily_limit || 'No limit', r.free, r.allocated, badge(r.enabled ? 'active' : 'disabled'), sm('togrange', r.id, r.enabled ? 'Disable' : 'Enable', r.enabled ? '0' : '1')]), 'No ranges yet. Add your first range below.'))
      + card('Inventory', 'Add Range', form('addRange', F('Range name', 'name', 'text', { req: 1 }) + F('Country', 'country') + F('Prefix', 'prefix') + F('Agent payout per SMS (USD)', 'agent_payout', 'number', { step: '0.000001', min: 0, val: 0 }) + F('Daily limit per agent (0 = no limit)', 'daily_limit', 'number', { min: 0, val: 0 }), 'Add range'))
      + (rs.length ? card('Pricing', 'Update Payout & Limit', form('updRange', F('Range', 'id', 'select', { opts }) + F('New agent payout per SMS (USD)', 'agent_payout', 'number', { step: '0.000001', min: 0 }) + F('New daily limit per agent', 'daily_limit', 'number', { min: 0 }), 'Save changes')) : '');
  },
  async upload_num() {
    const rs = await api('/admin/ranges'), opts = rs.map(r => [r.id, r.name]);
    if (!rs.length) return card('Upload', 'Upload Numbers', '<p class="muted">Please create a range first before uploading numbers.</p>');
    return card('Inventory', 'Upload Numbers', `<p class="muted">Upload numbers into an existing inventory range (.txt/.csv or paste). Duplicates are automatically removed.</p>`
      + form('upload', F('Range', 'id', 'select', { opts }) + `<div class="f"><label>Numbers file (.txt or .csv)</label><input type="file" data-fill="text" accept=".txt,.csv,text/plain,text/csv"></div>` + F('Or paste numbers (one per line, or separated by commas)', 'text', 'area'), 'Upload numbers'));
  },
  async anumbers() {
    const f = FIL.anumbers || {}, r = await api('/admin/numbers?' + new URLSearchParams(f)), ro = await rangeOpts();
    LAST = { name: 'numbers', cols: ['Number', 'Range', 'Status', 'Agent', 'Client'], rows: r.rows.map(x => [x.msisdn, x.range, x.status, x.agent || '', x.client || '']) };
    return card('Inventory', 'Numbers List', filt('anumbers', F('Range', 'range', 'select', { opts: ro, val: f.range }) + F('Status', 'status', 'select', { opts: [['', 'All'], 'free', 'allocated'], val: f.status }) + F('Agent username', 'agent', 'text', { val: f.agent }) + F('Number', 'q', 'text', { val: f.q }))
      + `<button class="btn wide" data-act="export" style="margin-top:10px"><u>${S('exp')}</u>Export CSV</button><p class="muted">Showing ${r.rows.length} of ${r.total}</p>` + tbl(['Number', 'Range', 'Status', 'Agent', 'Client', 'Last SMS'], r.rows.map(x => [esc(x.msisdn), esc(x.range), badge(x.status === 'free' ? 'free' : 'active'), esc(x.agent || '—'), esc(x.client || '—'), ft(x.last_sms)]), 'No numbers found.'));
  },
  async keys() {
    const ks = await api('/admin/keys');
    return card('Providers', 'API Keys for Incoming SMS', `<p class="muted" style="margin:0 0 14px">Give a key to the system that delivers SMS to you. It sends each message to this address:</p><div class="kv"><small>POST</small><b class="mono" style="font-size:1rem;word-break:break-all">${esc(location.origin)}/api/ingest</b></div><div class="kv"><small>Header</small><span class="mono">X-API-Key: your key</span></div><div class="kv"><small>Body (JSON, one message or {"messages":[…]})</small><span class="mono">{"number":"8801700000001","cli":"SENDER","text":"message","ts":1700000000000}</span></div>`)
      + card('Providers', 'Keys', tbl(['Name', 'Created', 'Status', ''], ks.map(k => [esc(k.name), ft(k.created_at), badge(k.revoked ? 'revoked' : 'active'), k.revoked ? '' : sm('revoke', k.id, 'Revoke')]), 'No keys yet.'))
      + card('Providers', 'Create Key', form('addKey', F('Key name', 'name', 'text', { req: 1, ph: 'e.g. provider name' }), 'Create key'));
  },
  async audit() { const r = await api('/admin/audit'); return card('Security', 'Audit Log', tbl(['Time', 'Who', 'Action', 'Details', 'IP'], r.map(x => [ft(x.ts), esc(x.actor || '—'), esc(x.action), esc(x.detail), esc(x.ip)]), 'Nothing recorded yet.')); },
  
  // ----- agent clients
  async clients() {
    const cs = await api('/clients');
    return card('Users Master', 'Clients List', tbl(['Username', 'Name', 'Contact', 'Numbers', 'Status', 'Last login', ''], cs.map(c => [esc(c.username), esc(c.full_name), esc([c.email, c.whatsapp].filter(Boolean).join(' · ')), c.numbers, badge(c.status), ft(c.last_login), sm('cst', c.id, c.status === 'active' ? 'Suspend' : 'Activate', c.status === 'active' ? 'suspended' : 'active')]), 'No clients yet.'));
  },
  async addclient() {
    return card('Users Master', 'Create Client', `<p class="muted" style="margin:0 0 14px">The client can sign in straight away with this username and password.</p>` + form('createClient', F('Username', 'username', 'text', { req: 1 }) + F('Password', 'password', 'password', { req: 1 }) + F('Full name', 'full_name') + F('Email', 'email', 'email') + F('WhatsApp', 'whatsapp') + F('Country', 'country'), 'Create client'));
  },
  // ----- agent ranges & numbers
  async franges() {
    const rs = await api('/ranges');
    return card('SMS Module', 'Ranges & Request', tbl(['Range', 'Country', 'Prefix', 'Your payout', 'Free numbers', 'Daily limit left'], rs.map(r => [esc(r.name), esc(r.country), esc(r.prefix), fm(r.agent_payout), r.free, r.daily_limit ? Math.max(0, r.daily_limit - r.used) : 'No limit']), 'No ranges are available yet.'))
      + (rs.length ? card('SMS Module', 'Request Numbers from Stock', `<p class="muted" style="margin:0 0 14px">Choose a range and how many numbers you need. They appear in My Numbers immediately.</p>` + form('requestNums', F('Range', 'range_id', 'select', { opts: rs.map(r => [r.id, `${r.name} (${r.free} free)`]) }) + F('Quantity', 'qty', 'number', { min: 1, val: 1 }), 'Request numbers')) : '');
  },
  async fnumbers() {
    const f = FIL.fnumbers || {}, isA = ME.role === 'agent', r = await api('/numbers?' + new URLSearchParams(f)), ro = await rangeOpts(), cs = isA ? await api('/clients') : [];
    LAST = { name: 'my-numbers', cols: ['Number', 'Range', 'Client'], rows: r.rows.map(x => [x.msisdn, x.range, x.client || '']) };
    const head = isA ? ['<input type="checkbox" class="ck" id="ca" aria-label="Select all">', 'Number', 'Range', 'Client', 'Your payout', 'Client payout', 'Last SMS'] : ['Number', 'Range', 'Payout', 'Last SMS'];
    const rows = r.rows.map(x => isA ? [`<input type="checkbox" class="ck rk" value="${x.id}">`, esc(x.msisdn), esc(x.range), esc(x.client || '—'), fm(x.agent_payout), x.client ? fm(x.client_payout) : '—', ft(x.last_sms)] : [esc(x.msisdn), esc(x.range), fm(x.client_payout), ft(x.last_sms)]);
    return card('SMS Module', 'My Numbers', filt('fnumbers', F('Range', 'range', 'select', { opts: ro, val: f.range }) + (isA ? F('Assignment', 'status', 'select', { opts: [['', 'All'], ['unassigned', 'Not assigned to a client'], ['assigned', 'Assigned to a client']], val: f.status }) : '') + F('Number', 'q', 'text', { val: f.q }))
      + `<button class="btn wide" data-act="export" style="margin-top:10px"><u>${S('exp')}</u>Export CSV</button><p class="muted">Showing ${r.rows.length} of ${r.total}</p>` + tbl(head, rows, 'No numbers yet.'))
      + (isA && r.rows.length ? card('SMS Module', 'Assign or Release Selected Numbers', `<p class="muted" style="margin:0 0 14px">Tick numbers above, then choose what to do.</p><div class="f"><label>Client</label><div class="sel"><select id="asc">${cs.map(c => `<option value="${c.id}">${esc(c.username)}</option>`).join('') || '<option value="">Create a client first</option>'}</select></div></div><div class="f"><label>Client payout per SMS (USD)</label><input id="asp" type="number" step="0.000001" min="0" value="0"></div><div class="acts"><button class="btn g" data-act="assign">Assign to client</button><button class="btn" data-act="unassign">Remove client</button><button class="btn" data-act="release">Return to stock</button></div><div class="msg" id="amsg"></div>`) : '');
  },
  // ----- test sms simulator
  async testsms() {
    const nums = (await api('/numbers')).rows || [];
    const opts = nums.map(n => [n.msisdn, `${n.msisdn} (${n.range})`]);
    return card('SMS Module', 'Live SMS Test Simulator', `<p class="muted">Simulate an incoming SMS message to verify real-time alerts, balance updates, and CDR records.</p>`
      + form('testSms', (opts.length ? F('Select one of your numbers', 'number', 'select', { opts }) : F('MSISDN Number (e.g. 8801711000001)', 'number', 'text', { req: 1 }))
        + F('Sender CLI (Sender ID)', 'cli', 'text', { val: 'OTP-VERIFY', req: 1 })
        + F('SMS Message Body', 'text', 'area', { val: 'Your secret login code is ' + Math.floor(100000 + Math.random() * 900000) + '. Do not share with anyone.', req: 1 }), 'Send Test SMS'));
  },
  async cdr() {
    const f = FIL.cdr || {}, qs = new URLSearchParams(), ro = await rangeOpts(), adm = ME.role === 'admin';
    if (f.from) qs.set('from', Date.parse(f.from + 'T00:00:00Z')); if (f.to) qs.set('to', Date.parse(f.to + 'T23:59:59.999Z'));
    ['range', 'number', 'cli', 'text', 'group', 'agent'].forEach(k => f[k] && qs.set(k, f[k]));
    const r = await api('/cdr?' + qs), g = r.group;
    const cols = g ? [cap(g), 'SMS', 'Payout'] : ['Date', 'Range', 'Number', 'CLI', 'Message', ...(adm ? ['Agent'] : []), 'Payout'];
    const rows = g ? r.rows.map(x => [esc(x.g || '—'), x.sms, fm(x.amt)]) : r.rows.map(x => [ft(x.ts), esc(x.range || '—'), esc(x.msisdn), esc(x.cli), esc(x.body), ...(adm ? [esc(x.agent || '—')] : []), fm(x.amt)]);
    LAST = { name: 'cdr', cols, rows: g ? r.rows.map(x => [x.g, x.sms, fm(x.amt)]) : r.rows.map(x => [ft(x.ts), x.range || '', x.msisdn, x.cli, x.body, ...(adm ? [x.agent || ''] : []), fm(x.amt)]) };
    return card(adm ? 'Messages' : 'CDR & Statistics', adm ? 'Messages & CDR' : 'CDR & Live Logs', filt('cdr', F('Date from', 'from', 'date', { val: f.from }) + F('Date to', 'to', 'date', { val: f.to }) + F('Range', 'range', 'select', { opts: ro, val: f.range }) + (adm ? F('Agent username', 'agent', 'text', { val: f.agent }) : '') + F('Number', 'number', 'text', { val: f.number }) + F('CLI', 'cli', 'text', { val: f.cli }) + F('Message text', 'text', 'text', { val: f.text }) + F('Group by', 'group', 'select', { opts: [['', 'No grouping'], ['date', 'Date'], ['hour', 'Hour'], ['range', 'Range'], ['number', 'Number'], ['cli', 'CLI']], val: f.group }))
      + `<button class="btn wide" data-act="export" style="margin-top:10px"><u>${S('exp')}</u>Export CSV</button><div class="gt"><b>Grand total</b><div><small>Total SMS</small><strong>${r.total}</strong></div><div><small>Payout</small><strong>${fm(r.amt)}</strong></div></div>` + tbl(cols, rows, 'No records found.'));
  },
  // ----- billing & payouts
  async bill() {
    const l = await api('/ledger');
    return card('Financial Account', 'Billing & Ledger', `<div class="muted">Current balance</div><div class="bn">USD ${fm(l.balance)}</div>`) + card('Account Movement', 'Ledger', tbl(['Date', 'Type', 'Reference', 'Amount (USD)'], l.rows.map(x => [ft(x.ts), esc(x.kind), esc(x.ref), (x.amount < 0 ? '-' : '+') + fm(Math.abs(x.amount))]), 'No ledger entries yet.'));
  },
  async payout() {
    const l = await api('/ledger');
    const reqs = await api('/payouts');
    return card('Financial Account', 'Request Payout', `<div class="muted">Available for withdrawal</div><div class="bn">USD ${fm(l.balance)}</div>`
      + form('requestPayout', F('Withdrawal Amount (USD)', 'amount', 'number', { step: '0.0001', min: 0.0001, req: 1 })
        + F('Payment Method', 'method', 'select', { opts: ['bKash Personal', 'bKash Agent', 'Nagad Personal', 'Rocket', 'Bank Transfer', 'USDT (TRC20) / Crypto'] })
        + F('Account Number / Wallet Address & Notes', 'details', 'text', { req: 1, ph: 'e.g. bKash 017xxxxxxxx or Bank details' }), 'Submit Payout Request'))
      + card('Payouts', 'Payout History', tbl(['Date', 'Amount (USD)', 'Method', 'Account Details', 'Status'], reqs.map(x => [ft(x.ts), fm(x.amount), esc(x.method), esc(x.details), badge(x.status)]), 'No payout requests yet.'));
  },
  async admin_payout() {
    const rows = await api('/payouts');
    const acts = p => p.status === 'pending' ? [sm('setpayout', p.id, 'Approve & Pay', 'paid'), sm('setpayout', p.id, 'Reject & Refund', 'rejected')].join(' ') : badge(p.status);
    return card('Finance', 'Agent Payout Requests', tbl(['Agent', 'Amount (USD)', 'Method', 'Details', 'Requested', 'Actions'], rows.map(p => [esc(p.username), fm(p.amount), esc(p.method), esc(p.details), ft(p.ts), acts(p)]), 'No payout requests pending.'));
  },
  // ----- support chat
  async chat() {
    const res = await api('/support');
    const msgs = res.messages || [];
    return card('Support & Help Desk', 'Support Chat', `<div class="chat"><div style="flex:1;overflow-y:auto;padding-bottom:12px">${msgs.length ? msgs.map(m => `<div class="cm2" style="${m.is_admin ? 'margin-left:auto;background:var(--sel);border-color:var(--gold)' : ''}"><div class="w"><b>${esc(m.sender_name)}</b> <small>${ft(m.ts)}</small></div><div>${esc(m.text)}</div></div>`).join('') : '<p class="muted">No messages yet. Send a message to start conversation.</p>'}</div>`
      + `<form class="cin af" data-do="sendChat"><textarea name="text" placeholder="Type your message here..." required></textarea><button class="btn g" type="submit"><u>${S('send')}</u>Send</button></form></div>`);
  },
  // ----- mobile app
  async mobapp() {
    return `<section class="card dl"><div class="a"><div class="tile">${S('mob')}</div><h2>MSI SMS Android App</h2><p class="muted">Monitor live SMS, receive background push alerts, check client allocations, and view real-time CDR directly on your mobile device.</p><button class="btn g wide" onclick="toast('Downloading MSI SMS Mobile v1.0.apk...')"><u>${S('dl')}</u>Download Android APK</button></div><div class="b"><h3>How to Install:</h3><ol><li>Tap <b>Download Android APK</b> to save the installer.</li><li>Open the file on your Android phone and select <b>Install</b> (allow Unknown Sources if prompted).</li><li>Sign in using your <b>Agent credentials</b> to start monitoring.</li></ol></div></section>`;
  },
  // ----- announcements & profile
  async ann() {
    const a = await api('/announcements'), adm = ME.role === 'admin';
    return card('Announcements', adm ? 'Announcements' : 'Latest Announcements', tbl(['Date', 'Title', 'Message', ...(adm ? [''] : [])], a.map(x => [ft(x.ts), `<b>${esc(x.title)}</b>`, `<span style="white-space:normal;display:block;min-width:240px">${esc(x.body)}</span>`, ...(adm ? [sm('delann', x.id, 'Delete')] : [])]), 'No announcements yet.'))
      + (adm ? card('Announcements', 'New Announcement', form('addAnn', F('Title', 'title', 'text', { req: 1 }) + F('Message', 'body', 'area') + F('Expires on (optional)', 'expires', 'date'), 'Publish to everyone')) : '');
  },
  async prof() {
    const m = await api('/me');
    return card('Account Profile', esc(m.full_name || m.username), `<p class="muted" style="margin:0 0 8px">Signed in as <b>${esc(m.username)}</b> · ${cap(m.role)}</p>` + form('saveProfile', F('Full name', 'full_name', 'text', { val: m.full_name }) + F('Email', 'email', 'email', { val: m.email }) + F('WhatsApp', 'whatsapp', 'text', { val: m.whatsapp }) + F('Country', 'country', 'text', { val: m.country }), 'Save changes'))
      + card('Security', 'Change Password', form('changePw', F('Current password', 'current', 'password', { req: 1 }) + F('New password', 'password', 'password', { req: 1 }) + F('Confirm new password', 'confirm', 'password', { req: 1 }), 'Change password'))
      + (m.api_token ? card('Developer', 'Your API Token', `<p class="muted" style="margin:0 0 12px">Keep it private. Anyone with this token can read your SMS records.</p><div class="tkb"><div class="t mono" id="tok">${esc(m.api_token)}</div></div><div class="kv" style="margin-top:12px"><small>CDR API</small><span class="mono" style="word-break:break-all">${esc(location.origin)}/api/v2/cdr?token=${esc(m.api_token)}&amp;records=100</span></div><p class="muted">Optional: dt1, dt2 (UTC dates), filternum, filtercli.</p><button class="btn" data-act="regen">Generate a new token</button>`) : '');
  }
};

// ---------- nested menus with expandable categories ----------
const MENU = {
  admin: [
    { id: 'dash', label: 'Dashboard', icon: 'dash' },
    {
      group: 'users_grp', label: 'User Management', icon: 'users',
      items: [
        ['users', 'Users Master', 'users'],
        ['pending_users', 'Pending Approvals', 'chk'],
        ['add_user', 'Create User', 'uplus']
      ]
    },
    {
      group: 'inventory_grp', label: 'Inventory & Ranges', icon: 'sliders',
      items: [
        ['aranges', 'Ranges Management', 'sliders'],
        ['anumbers', 'Numbers List', 'phone'],
        ['upload_num', 'Upload Numbers', 'exp']
      ]
    },
    {
      group: 'sms_grp', label: 'Messages & Routing', icon: 'search',
      items: [
        ['cdr', 'Messages & CDR', 'search'],
        ['livesms', 'Live SMS Monitor', 'pulse'],
        ['keys', 'API Ingest Keys', 'key'],
        ['testsms', 'Test SMS Simulator', 'send']
      ]
    },
    {
      group: 'finance_grp', label: 'Finance & Payouts', icon: 'wallet',
      items: [
        ['admin_payout', 'Payout Requests', 'wallet'],
        ['bill', 'System Ledger', 'bill'],
        ['audit', 'Security Audit Log', 'book']
      ]
    },
    {
      group: 'support_grp', label: 'Support & Notice', icon: 'ann',
      items: [
        ['ann', 'Announcements', 'ann'],
        ['chat', 'Support Desk', 'chat'],
        ['prof', 'Profile & Settings', 'prof']
      ]
    }
  ],
  agent: [
    { id: 'dash', label: 'Dashboard', icon: 'dash' },
    {
      group: 'sms_grp', label: 'SMS Module', icon: 'sliders',
      items: [
        ['franges', 'Ranges & Request', 'sliders'],
        ['fnumbers', 'My Numbers', 'phone'],
        ['livesms', 'Live SMS Stream', 'pulse'],
        ['testsms', 'Test SMS Simulator', 'txt'],
        ['cdr', 'CDR & Statistics', 'search']
      ]
    },
    {
      group: 'clients_grp', label: 'Clients Master', icon: 'users',
      items: [
        ['clients', 'Clients List', 'users'],
        ['addclient', 'Create Client', 'uplus'],
        ['assign_client', 'Assign Numbers', 'phone']
      ]
    },
    {
      group: 'billing_grp', label: 'Billing & Payout', icon: 'wallet',
      items: [
        ['bill', 'Balance & Ledger', 'bill'],
        ['payout', 'Request Payout', 'wallet'],
        ['payout_hist', 'Payout History', 'book']
      ]
    },
    {
      group: 'support_grp', label: 'Support & Notice', icon: 'ann',
      items: [
        ['ann', 'Announcements', 'ann'],
        ['chat', 'Live Support Chat', 'chat']
      ]
    },
    {
      group: 'tools_grp', label: 'Tools & Download', icon: 'mob',
      items: [
        ['prof', 'Profile & Password', 'prof'],
        ['dev_api', 'API Token & Docs', 'key'],
        ['mobapp', 'Mobile Android App', 'dl']
      ]
    }
  ],
  client: [
    { id: 'dash', label: 'Dashboard', icon: 'dash' },
    {
      group: 'sms_grp', label: 'SMS Module', icon: 'phone',
      items: [
        ['fnumbers', 'My Numbers', 'phone'],
        ['livesms', 'Live SMS Feed', 'pulse'],
        ['cdr', 'CDR & Statistics', 'search']
      ]
    },
    {
      group: 'billing_grp', label: 'Billing & Account', icon: 'bill',
      items: [
        ['bill', 'Balance & Ledger', 'bill'],
        ['ann', 'Announcements', 'ann'],
        ['chat', 'Support Chat', 'chat'],
        ['prof', 'Profile & API Token', 'prof']
      ]
    }
  ]
};

// find all page ids for current user
function getAllPages(role) {
  const m = MENU[role] || MENU.agent;
  const list = [];
  for (const entry of m) {
    if (entry.id) list.push([entry.id, entry.label]);
    if (entry.items) {
      for (const item of entry.items) list.push([item[0], item[1]]);
    }
  }
  return list;
}

// render navigation HTML
function renderNav() {
  const roleMenu = MENU[ME.role] || MENU.agent;
  return roleMenu.map(entry => {
    if (entry.id) {
      return `<button class="nav ${PAGE === entry.id ? 'act' : ''}" data-go="${entry.id}">${S(entry.icon)}${entry.label}</button>`;
    }
    const isOpen = OPEN_GRPS.has(entry.group);
    const hasActiveChild = entry.items.some(x => x[0] === PAGE);
    return `<button class="nav ${isOpen ? 'opn' : ''} ${hasActiveChild ? 'act' : ''}" data-toggle-grp="${entry.group}">${S(entry.icon)}${entry.label}<span class="ch">${S('chev')}</span></button>`
      + `<div class="sub ${isOpen ? 'show' : ''}">${entry.items.map(([id, label, icon]) => `<a class="sub-link ${PAGE === id ? 'act' : ''}" data-go="${id}">${S(icon)}${label}</a>`).join('')}</div>`;
  }).join('');
}

// ---------- shell & navigation ----------
function showAuth(mode) {
  if (ES) { ES.close(); ES = null; }
  const login = mode === 'login';
  $('#app').innerHTML = `<div class="pg on"><div class="au"><img class="logo" src="/logo.webp" alt="MSI SMS"><h1>${login ? 'MSI SMS Login' : 'Become an Agent'}</h1><p class="sub">${login ? 'Please sign in to continue' : 'An admin reviews every new account before it can sign in.'}</p>`
    + (login ? form('login', F('Username', 'username', 'text', { req: 1 }) + F('Password', 'password', 'password', { req: 1 }), 'Sign In')
      : form('register', F('Full name', 'full_name', 'text', { req: 1 }) + F('Username', 'username', 'text', { req: 1 }) + F('Email', 'email', 'email', { req: 1 }) + F('WhatsApp number', 'whatsapp') + F('Country', 'country') + F('Password (at least 8 characters)', 'password', 'password', { req: 1 }) + F('Confirm password', 'confirm', 'password', { req: 1 }), 'Create account'))
    + `<p class="lnk">${login ? 'New agent? <a data-auth="register">Apply for an account</a>' : 'Already have an account? <a data-auth="login">Sign in</a>'}</p></div></div>`;
}

function shell() {
  const app = $('#app');
  if (!app || !ME) return;
  app.innerHTML = `<header class="top"><button class="ib" id="menu" aria-label="Menu">${S('menu')}</button><div class="ttl"><b id="ptitle">Dashboard</b><span>${esc(ME.full_name || ME.username)} · ${cap(ME.role)} <i id="live" style="color:var(--muted);font-style:normal" title="Live connection">●</i></span></div><button class="ib" id="theme" aria-label="Theme">${S('sun')}</button><button class="ib" data-act="logout" aria-label="Sign out">${S('out')}</button></header><main id="mn"></main><button class="fab" id="fab" aria-label="Menu">${S('menu')}</button><div class="ov" id="ov"></div><aside class="side" id="side"><div class="brand"><div class="logo"><img src="/logo-sm.webp" alt="MSI SMS"></div><div><b>MSI SMS</b><span>${cap(ME.role)}</span></div><button class="ib" id="close" aria-label="Close">${S('x')}</button></div><nav id="nv">${renderNav()}</nav></aside>`;
}

const menu = o => document.body.classList.toggle('open', o);

async function go(p) {
  if (!ME) { showAuth('login'); return; }
  if (!$('#mn')) shell();
  if (p) PAGE = p;
  menu(false);
  
  // ensure group of active page is expanded
  const roleMenu = MENU[ME.role] || MENU.agent;
  for (const entry of roleMenu) {
    if (entry.items && entry.items.some(x => x[0] === PAGE)) {
      OPEN_GRPS.add(entry.group);
    }
  }

  const allPages = getAllPages(ME.role);
  const cur = allPages.find(x => x[0] === PAGE) || allPages[0];
  PAGE = cur[0];

  const pt = $('#ptitle');
  if (pt) pt.textContent = cur[1];
  
  const nv = $('#nv');
  if (nv) nv.innerHTML = renderNav();

  const mn = $('#mn');
  if (!mn) return;
  try {
    const fn = PG[PAGE] || PG.dash;
    const h = await fn();
    if (!ME) return;
    const currentMn = $('#mn');
    if (currentMn) currentMn.innerHTML = `<div class="pg on">${h}</div>`;
  } catch (e) {
    if (!ME) return;
    const currentMn = $('#mn');
    if (currentMn) currentMn.innerHTML = `<div class="pg on">${card('', 'Something went wrong', `<p class="muted">${esc(e.message)}</p><button class="btn" data-go="${PAGE}">Try again</button>`)}</div>`;
  }
}

const soft = () => { clearTimeout(soft.t); soft.t = setTimeout(() => { const a = document.activeElement; const mn = $('#mn'); if (a && /INPUT|TEXTAREA|SELECT/.test(a.tagName) && mn && mn.contains(a)) return; if (ME) go(); }, 500); };

function connect() {
  if (ES) ES.close();
  const sid = localStorage.getItem('msi_sid');
  const url = sid ? `/api/events?sid=${encodeURIComponent(sid)}` : '/api/events';
  ES = new EventSource(url);
  const live = o => { const e = $('#live'); if (e) e.style.color = o ? '#3ddc97' : 'var(--muted)'; };
  ES.onopen = () => live(true);
  ES.onerror = () => live(false);
  ['message', 'account', 'announcement', 'refresh'].forEach(ev =>
    ES.addEventListener(ev, e => {
      let d = {};
      try { d = JSON.parse(e.data); } catch {}
      if (d.toast || d.text) toast(d.toast || d.text);
      soft();
    })
  );
}

async function boot() {
  try {
    ME = await api('/me');
  } catch {
    localStorage.removeItem('msi_sid');
    ME = null;
    return showAuth('login');
  }
  if (!ME || !ME.id) {
    localStorage.removeItem('msi_sid');
    ME = null;
    return showAuth('login');
  }
  shell();
  connect();
  go('dash');
}

// ---------- actions ----------
const picked = () => $$('.rk:checked').map(x => +x.value);
const DO = {
  async login(d) {
    const res = await api('/login', { body: d });
    if (res && res.sid) localStorage.setItem('msi_sid', res.sid);
    ME = res;
    shell();
    connect();
    await go('dash');
  },
  async register(d) { if (d.password !== d.confirm) throw new Error('Passwords do not match'); return (await api('/register', { body: d })).message; },
  filter(d, f) { FIL[f.dataset.page] = d; go(); },
  async createUser(d, f) { await api('/admin/users', { body: d }); f.reset(); go('users'); toast('User created'); },
  async addRange(d, f) { await api('/admin/ranges', { body: d }); go('aranges'); toast('Range added'); },
  async updRange(d) { await api('/admin/ranges/' + d.id, { method: 'PUT', body: d }); go('aranges'); toast('Range updated'); },
  async upload(d, f) { const r = await api(`/admin/ranges/${d.id}/numbers`, { body: { text: d.text } }); await go('anumbers'); toast(`Added ${r.added} numbers (${r.duplicates} already existed).`); },
  async addAnn(d) { await api('/admin/announcements', { body: d }); go('ann'); toast('Announcement published'); },
  async addKey(d) { const r = await api('/admin/keys', { body: d }); await go('keys'); toast('Key created'); const mn = $('#mn'); if (mn) mn.insertAdjacentHTML('afterbegin', `<section class="card"><div class="eyebrow">Copy it now</div><h2>New key</h2><div class="kv"><b class="mono" style="word-break:break-all">${esc(r.key)}</b></div><p class="muted">It is shown only once.</p></section>`); },
  async assignClientForm(d, f) {
    const nums = $('input[name=nums]:checked').map(x => +x.value);
    if (!nums.length) throw new Error('Please select at least one number to assign');
    const r = await api('/numbers/assign', { body: { ids: nums, client_id: d.client_id, client_payout: d.payout } });
    go('clients');
    toast(`${r.updated} number(s) assigned to client`);
  },
  async createClient(d, f) { await api('/clients', { body: d }); go('clients'); toast('Client created — they can sign in now'); },
  async requestNums(d) { const r = await api('/numbers/request', { body: d }); go('fnumbers'); toast(`${r.allocated} number(s) added to My Numbers`); },
  async requestPayout(d, f) { await api('/payouts', { body: d }); f.reset(); go('payout'); toast('Payout request submitted successfully'); },
  async sendChat(d, f) { await api('/support', { body: d }); f.reset(); go('chat'); },
  async testSms(d, f) { await api('/test-sms', { body: d }); toast('Test SMS sent successfully!'); go('cdr'); },
  async saveProfile(d) { await api('/me', { method: 'PUT', body: d }); ME = await api('/me'); return 'Saved'; },
  async changePw(d, f) { if (d.password !== d.confirm) throw new Error('Passwords do not match'); await api('/me/password', { body: { current: d.current, password: d.password } }); f.reset(); return 'Password changed'; }
};

const ACT = {
  async setst(el) { await api(`/admin/users/${el.dataset.id}/status`, { body: { status: el.dataset.v } }); go(); },
  async resetpw(el) { const p = safePrompt('New password for this user (at least 8 characters):'); if (!p) return; await api(`/admin/users/${el.dataset.id}/password`, { body: { password: p } }); toast('Password changed'); },
  async togrange(el) { await api('/admin/ranges/' + el.dataset.id, { method: 'PUT', body: { enabled: el.dataset.v === '1' } }); go(); },
  async delann(el) { if (safeConfirm('Delete this announcement?')) { await api('/admin/announcements/' + el.dataset.id, { method: 'DELETE' }); go(); } },
  async revoke(el) { if (safeConfirm('Revoke this key? The provider using it will stop working.')) { await api('/admin/keys/' + el.dataset.id, { method: 'DELETE' }); go(); } },
  async cst(el) { await api(`/clients/${el.dataset.id}/status`, { body: { status: el.dataset.v } }); go(); },
  async setpayout(el) { await api(`/admin/payouts/${el.dataset.id}/status`, { body: { status: el.dataset.v } }); go(); toast('Payout status updated'); },
  async assign() { const ids = picked(); if (!ids.length) return toast('Tick at least one number'); const asc = $('#asc'), asp = $('#asp'); const r = await api('/numbers/assign', { body: { ids, client_id: asc ? asc.value : '', client_payout: asp ? asp.value : 0 } }); go(); toast(`${r.updated} number(s) assigned`); },
  async unassign() { const ids = picked(); if (!ids.length) return toast('Tick at least one number'); await api('/numbers/assign', { body: { ids } }); go(); },
  async release() { const ids = picked(); if (!ids.length) return toast('Tick at least one number'); if (safeConfirm(`Return ${ids.length} number(s) to stock?`)) { await api('/numbers/release', { body: { ids } }); go(); } },
  async regen() { if (safeConfirm('The old token will stop working. Continue?')) { const r = await api('/me/token', { body: {} }); go(); } },
  export() { if (!LAST) return; const csv = [LAST.cols, ...LAST.rows].map(r => r.map(c => '"' + String(c ?? '').replace(/"/g, '""') + '"').join(',')).join('\n'); const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = `msi-sms-${LAST.name}.csv`; a.click(); },
  async logout() {
    localStorage.removeItem('msi_sid');
    await api('/logout', { body: {} }).catch(() => { });
    ME = null;
    showAuth('login');
  }
};

document.addEventListener('submit', async e => {
  const f = e.target.closest('form[data-do]'); if (!f) return; e.preventDefault();
  const m = f.querySelector('.msg'), b = f.querySelector('button[type=submit]'); if (m) { m.textContent = ''; m.className = 'msg'; } if (b) b.disabled = true;
  try { const r = await DO[f.dataset.do](Object.fromEntries(new FormData(f)), f); if (r && m) { m.textContent = r; m.className = 'msg ok'; } }
  catch (x) { if (m) { m.textContent = x.message; m.className = 'msg er'; } else toast(x.message); }
  finally { if (b) b.disabled = false; }
});

document.addEventListener('click', async e => {
  const a = e.target.closest('[data-auth]'); if (a) return showAuth(a.dataset.auth);
  
  // toggle nested menu group
  const tg = e.target.closest('[data-toggle-grp]');
  if (tg) {
    const grp = tg.dataset.toggleGrp;
    if (OPEN_GRPS.has(grp)) OPEN_GRPS.delete(grp); else OPEN_GRPS.add(grp);
    const nv = $('#nv'); if (nv) nv.innerHTML = renderNav();
    return;
  }

  const g = e.target.closest('[data-go]'); if (g) return go(g.dataset.go);
  if (e.target.closest('#menu,#fab')) return menu(true);
  if (e.target.closest('#close,#ov')) return menu(false);
  if (e.target.closest('#theme')) { const d = document.documentElement; d.dataset.theme = (d.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark' ? 'light' : 'dark'; return; }
  const el = e.target.closest('[data-act]'); if (!el) return;
  try { await ACT[el.dataset.act](el); } catch (x) { const m = $('#amsg'); if (m && /assign|release/.test(el.dataset.act)) { m.textContent = x.message; m.className = 'msg er'; } else toast(x.message); }
});

document.addEventListener('change', e => {
  if (e.target.id === 'ca') $$('.rk').forEach(c => c.checked = e.target.checked);
  if (e.target.matches('input[type=file][data-fill]')) { const fl = e.target.files[0]; if (!fl) return; const rd = new FileReader(); rd.onload = () => { const t = e.target.closest('form').querySelector(`[name=${e.target.dataset.fill}]`); if (t) t.value = String(rd.result).slice(0, 4e6); }; rd.readAsText(fl); }
});

boot();
