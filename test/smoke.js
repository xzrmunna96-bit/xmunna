// Run: node test/smoke.js   — starts a temporary server and walks through the whole flow.
const { spawn } = require('child_process'), path = require('path'), fs = require('fs'), os = require('os');
const PORT = 3999, BASE = `http://localhost:${PORT}`, DB = path.join(os.tmpdir(), 'msi-smoke-' + Date.now() + '.db');
const srv = spawn(process.execPath, [path.join(__dirname, '..', 'server.js')], { env: { ...process.env, PORT, DB_FILE: DB, ADMIN_USERNAME: 'admin', ADMIN_PASSWORD: 'AdminPass123' }, stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
const sess = {};
async function call(who, method, url, body, hdr = {}) {
  const r = await fetch(BASE + url, { method, headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'msi', ...(sess[who] ? { Cookie: sess[who] } : {}), ...hdr }, body: body ? JSON.stringify(body) : undefined });
  const sc = r.headers.get('set-cookie'); if (sc) sess[who] = sc.split(';')[0];
  return { s: r.status, j: await r.json().catch(() => ({})) };
}
(async () => {
  for (let i = 0; i < 30; i++) { try { await fetch(BASE + '/'); break; } catch { await sleep(200); } }
  // real-time: admin listens
  const ev = []; let a = await call('admin', 'POST', '/api/login', { username: 'admin', password: 'AdminPass123' }); ok(a.s === 200, 'admin login');
  const ctl = new AbortController();
  fetch(BASE + '/api/events', { headers: { Cookie: sess.admin }, signal: ctl.signal }).then(async r => { const rd = r.body.getReader(), dec = new TextDecoder(); for (;;) { const { value, done } = await rd.read(); if (done) break; ev.push(dec.decode(value)); } }).catch(() => {});
  await sleep(300);
  let r = await call('x', 'POST', '/api/register', { username: 'agent1', password: 'agentpass1', full_name: 'Agent One', email: 'a@b.co', whatsapp: '8801', country: 'BD' }); ok(r.s === 200, 'register');
  r = await call('agent', 'POST', '/api/login', { username: 'agent1', password: 'agentpass1' }); ok(r.s === 403, 'pending agent cannot log in (' + r.j.error + ')');
  await sleep(300); ok(ev.join('').includes('account'), 'admin received real-time registration event');
  r = await call('admin', 'GET', '/api/admin/users?status=pending'); ok(r.j.length === 1, 'pending user visible to admin'); const aid = r.j[0].id;
  r = await call('admin', 'POST', `/api/admin/users/${aid}/status`, { status: 'active' }); ok(r.s === 200, 'admin approves');
  r = await call('agent', 'POST', '/api/login', { username: 'agent1', password: 'agentpass1' }); ok(r.s === 200 && r.j.role === 'agent', 'agent logs in after approval');
  r = await call('agent', 'GET', '/api/admin/users'); ok(r.s === 403, 'agent blocked from admin API');
  r = await call('admin', 'POST', '/api/admin/ranges', { name: 'Test-Range', country: 'XX', agent_payout: '0.012', daily_limit: 5 }); ok(r.s === 200, 'range created'); const rid = r.j.id;
  r = await call('admin', 'POST', `/api/admin/ranges/${rid}/numbers`, { text: '8801700000001\n8801700000002, 8801700000003\n8801700000001 abc' }); ok(r.j.added === 3 && r.j.duplicates === 0, 'numbers uploaded (3, dup removed in file)');
  r = await call('agent', 'GET', '/api/ranges'); ok(r.j.length === 1 && r.j[0].free === 3, 'agent sees range with 3 free');
  r = await call('agent', 'POST', '/api/numbers/request', { range_id: rid, qty: 2 }); ok(r.j.allocated === 2, 'agent requests 2 numbers');
  r = await call('agent', 'POST', '/api/clients', { username: 'client1', password: 'clientpass1', full_name: 'Client One' }); ok(r.s === 200, 'agent creates client'); const cid = r.j.id;
  r = await call('agent', 'GET', '/api/numbers'); const nums = r.j.rows; ok(nums.length === 2, 'agent has 2 numbers');
  r = await call('agent', 'POST', '/api/numbers/assign', { ids: [nums[0].id], client_id: cid, client_payout: '0.005' }); ok(r.j.updated === 1, 'number assigned to client');
  r = await call('agent', 'POST', '/api/numbers/assign', { ids: [nums[1].id], client_id: cid, client_payout: '0.5' }); ok(r.s === 400, 'client payout above agent payout rejected');
  r = await call('client', 'POST', '/api/login', { username: 'client1', password: 'clientpass1' }); ok(r.s === 200 && r.j.role === 'client', 'client logs in');
  r = await call('client', 'GET', '/api/numbers'); ok(r.j.rows.length === 1, 'client sees only the assigned number');
  r = await call('admin', 'POST', '/api/admin/keys', { name: 'provider' }); const key = r.j.key; ok(/^msi_/.test(key), 'ingest key created');
  r = await call('x', 'POST', '/api/ingest', { number: nums[0].msisdn, cli: 'BANK', text: 'code 123' }, { 'X-API-Key': 'wrong' }); ok(r.s === 401, 'ingest rejects bad key');
  r = await call('x', 'POST', '/api/ingest', { messages: [{ number: nums[0].msisdn, cli: 'BANK', text: 'code 123' }, { number: nums[1].msisdn, cli: 'SHOP', text: 'code 456' }, { number: '999999999', text: 'orphan' }] }, { 'X-API-Key': key });
  ok(r.j.results[0].billed && r.j.results[1].billed && !r.j.results[2].billed, 'ingest: allocated billed, unknown number stored unbilled');
  r = await call('agent', 'GET', '/api/ledger'); ok(r.j.balance === 12000 - 5000 + 12000 && r.j.rows.length === 2, 'agent balance correct (0.019)');
  r = await call('client', 'GET', '/api/ledger'); ok(r.j.balance === 5000, 'client balance correct (0.005)');
  r = await call('agent', 'GET', '/api/stats'); ok(r.j.sms.today === 2 && r.j.numbers === 2 && r.j.clients === 1, 'agent stats live');
  r = await call('admin', 'GET', '/api/stats'); ok(r.j.sms.today === 3 && r.j.agents === 1 && r.j.allocated === 2 && r.j.free === 1, 'admin stats live');
  r = await call('agent', 'GET', '/api/cdr?group=date'); ok(r.j.rows.length === 1 && r.j.rows[0].sms === 2, 'CDR grouped by date');
  r = await call('client', 'GET', '/api/cdr'); ok(r.j.total === 1 && r.j.rows[0].amt === 5000, 'client CDR scoped to own message');
  const me = await call('agent', 'GET', '/api/me');
  r = await call('x', 'GET', `/api/v2/cdr?token=${me.j.api_token}&records=10`); ok(r.j.status === 'success' && r.j.total === 2, 'token CDR API works');
  r = await call('agent', 'POST', '/api/numbers/request', { range_id: rid, qty: 5 }); ok(r.j.allocated === 1, 'last free number allocated (partial fulfilment)');
  r = await call('agent', 'POST', '/api/numbers/request', { range_id: rid, qty: 1 }); ok(r.s === 400, 'no stock left -> clear error (' + r.j.error + ')');
  r = await call('admin', 'POST', `/api/admin/users/${cid}/status`, { status: 'suspended' }); r = await call('client', 'GET', '/api/me'); ok(r.s === 401, 'suspended client loses access immediately');
  r = await call('admin', 'GET', '/api/admin/audit'); ok(r.j.length >= 8, 'audit log written');
  r = await fetch(BASE + '/api/me'); ok(r.status === 401, 'API needs login');
  r = await fetch(BASE + '/api/logout', { method: 'POST' }); ok(r.status === 403, 'CSRF header required');
  r = await fetch(BASE + '/../server.js'); ok(r.status !== 200 || !(await r.text()).includes('DatabaseSync'), 'no path traversal');
  ctl.abort(); srv.kill(); try { fs.rmSync(DB, { force: true }); } catch {}
  console.log(fails ? `\n${fails} check(s) FAILED` : '\nAll checks passed'); process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); srv.kill(); process.exit(1); });
