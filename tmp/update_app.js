const fs = require('fs');
let app = fs.readFileSync('public/app.js', 'utf8');

// 1. Replace PG.dash
const dashStart = app.indexOf('  async dash() {');
const dashEnd = app.indexOf('  // ----- admin users');
const oldDash = app.slice(dashStart, dashEnd);

const newDash = `  async dash() {
    const s = await api('/stats'), mx = Math.max(1, ...(s.series || []).map(x => x.n));
    const kp = ME.role === 'admin'
      ? [['Active agents', s.agents || 0], ['Pending approvals', s.pending || 0], ['Clients', s.clients || 0], ['Free numbers', s.free || 0], ['Allocated numbers', s.allocated || 0], ['SMS today', s.sms?.today || 0], ['SMS this month', s.sms?.month || 0], ['SMS all time', s.sms?.all || 0]]
      : [['Today SMS', s.sms?.today || 0], ['This Week SMS', s.sms?.week || 0], ['This Month SMS', s.sms?.month || 0], ['This Year SMS', s.sms?.year || 0], ['All Time SMS', s.sms?.all || 0], ['Balance (USD)', fm(s.balance || 0)], ['My numbers', s.numbers || 0], ...(ME.role === 'agent' ? [['Clients', s.clients || 0]] : [])];

    const agentModHtml = \`
      <section class="card">
        <div class="eyebrow">AGENT NAVIGATION CENTER</div>
        <h2 style="margin:0 0 4px">Agent Modules & Features (এজেন্ট প্যানেলের সকল অপশনসমূহ)</h2>
        <p class="muted" style="margin:0 0 16px">Quick access to all sections and sub-options in your agent portal.</p>
        <div class="mod-grid">
          <div class="mod-card">
            <div class="mod-head"><span>\${S('sliders')} SMS Module</span><span class="badge active">5 Options</span></div>
            <div class="mod-links">
              <button class="mod-btn" data-go="franges">\${S('sliders')} <b>Ranges & Request</b> — Browse stock & request</button>
              <button class="mod-btn" data-go="fnumbers">\${S('phone')} <b>My Numbers</b> — Active allocated numbers</button>
              <button class="mod-btn" data-go="livesms">\${S('pulse')} <b>Live SMS Stream</b> — Real-time incoming SMS</button>
              <button class="mod-btn" data-go="testsms">\${S('txt')} <b>Test SMS Simulator</b> — Send test message</button>
              <button class="mod-btn" data-go="cdr">\${S('search')} <b>CDR & Statistics</b> — Complete SMS logs</button>
            </div>
          </div>
          <div class="mod-card">
            <div class="mod-head"><span>\${S('users')} Clients Master</span><span class="badge active">3 Options</span></div>
            <div class="mod-links">
              <button class="mod-btn" data-go="clients">\${S('users')} <b>Clients List</b> — Manage your clients</button>
              <button class="mod-btn" data-go="addclient">\${S('uplus')} <b>Create Client</b> — Add new client account</button>
              <button class="mod-btn" data-go="assign_client">\${S('phone')} <b>Assign Numbers</b> — Allocate numbers & rate</button>
            </div>
          </div>
          <div class="mod-card">
            <div class="mod-head"><span>\${S('wallet')} Billing & Payout</span><span class="badge active">3 Options</span></div>
            <div class="mod-links">
              <button class="mod-btn" data-go="bill">\${S('bill')} <b>Balance & Ledger</b> — Current balance & history</button>
              <button class="mod-btn" data-go="payout">\${S('wallet')} <b>Request Payout</b> — Withdraw your earnings</button>
              <button class="mod-btn" data-go="payout_hist">\${S('book')} <b>Payout History</b> — View all withdrawal records</button>
            </div>
          </div>
          <div class="mod-card">
            <div class="mod-head"><span>\${S('ann')} Support & Notice</span><span class="badge active">2 Options</span></div>
            <div class="mod-links">
              <button class="mod-btn" data-go="ann">\${S('ann')} <b>Announcements</b> — System news & updates</button>
              <button class="mod-btn" data-go="chat">\${S('chat')} <b>Live Support Chat</b> — Contact admin desk</button>
            </div>
          </div>
          <div class="mod-card">
            <div class="mod-head"><span>\${S('mob')} Tools & Download</span><span class="badge active">3 Options</span></div>
            <div class="mod-links">
              <button class="mod-btn" data-go="prof">\${S('prof')} <b>Profile & Password</b> — Account settings</button>
              <button class="mod-btn" data-go="dev_api">\${S('key')} <b>API Token & Docs</b> — CDR API access</button>
              <button class="mod-btn" data-go="mobapp">\${S('dl')} <b>Mobile Android App</b> — App download & setup</button>
            </div>
          </div>
        </div>
      </section>
    \`;

    const adminModHtml = \`
      <section class="card">
        <div class="eyebrow">ADMIN MANAGEMENT CENTER</div>
        <h2 style="margin:0 0 4px">Admin Modules & Features (অ্যাডমিন প্যানেল অপশনসমূহ)</h2>
        <p class="muted" style="margin:0 0 16px">Master management modules and administrative control panels.</p>
        <div class="mod-grid">
          <div class="mod-card">
            <div class="mod-head"><span>\${S('users')} User Management</span><span class="badge active">3 Options</span></div>
            <div class="mod-links">
              <button class="mod-btn" data-go="users">\${S('users')} <b>Users Master</b> — All accounts & statuses</button>
              <button class="mod-btn" data-go="pending_users">\${S('chk')} <b>Pending Approvals</b> — Review registrations</button>
              <button class="mod-btn" data-go="add_user">\${S('uplus')} <b>Create User</b> — Add agent/admin/client</button>
            </div>
          </div>
          <div class="mod-card">
            <div class="mod-head"><span>\${S('sliders')} Inventory & Ranges</span><span class="badge active">3 Options</span></div>
            <div class="mod-links">
              <button class="mod-btn" data-go="aranges">\${S('sliders')} <b>Ranges Management</b> — Country ranges & rates</button>
              <button class="mod-btn" data-go="anumbers">\${S('phone')} <b>Numbers List</b> — Full phone inventory</button>
              <button class="mod-btn" data-go="upload_num">\${S('exp')} <b>Upload Numbers</b> — Bulk import numbers</button>
            </div>
          </div>
          <div class="mod-card">
            <div class="mod-head"><span>\${S('search')} Messages & Routing</span><span class="badge active">4 Options</span></div>
            <div class="mod-links">
              <button class="mod-btn" data-go="cdr">\${S('search')} <b>Messages & CDR</b> — Global SMS records</button>
              <button class="mod-btn" data-go="livesms">\${S('pulse')} <b>Live SMS Monitor</b> — Real-time feed</button>
              <button class="mod-btn" data-go="keys">\${S('key')} <b>API Ingest Keys</b> — Provider webhook keys</button>
              <button class="mod-btn" data-go="testsms">\${S('send')} <b>Test SMS Simulator</b> — Ingest test message</button>
            </div>
          </div>
          <div class="mod-card">
            <div class="mod-head"><span>\${S('wallet')} Finance & Payouts</span><span class="badge active">3 Options</span></div>
            <div class="mod-links">
              <button class="mod-btn" data-go="admin_payout">\${S('wallet')} <b>Payout Requests</b> — Approve agent payouts</button>
              <button class="mod-btn" data-go="bill">\${S('bill')} <b>System Ledger</b> — Credits & debits balance</button>
              <button class="mod-btn" data-go="audit">\${S('book')} <b>Security Audit Log</b> — Activity tracking</button>
            </div>
          </div>
          <div class="mod-card">
            <div class="mod-head"><span>\${S('ann')} Support & Notice</span><span class="badge active">3 Options</span></div>
            <div class="mod-links">
              <button class="mod-btn" data-go="ann">\${S('ann')} <b>Announcements</b> — Post system broadcast</button>
              <button class="mod-btn" data-go="chat">\${S('chat')} <b>Support Desk</b> — Reply to agents/clients</button>
              <button class="mod-btn" data-go="prof">\${S('prof')} <b>Profile & Settings</b> — Admin settings</button>
            </div>
          </div>
        </div>
      </section>
    \`;

    const clientModHtml = \`
      <section class="card">
        <div class="eyebrow">CLIENT NAVIGATION CENTER</div>
        <h2 style="margin:0 0 4px">Client Modules & Features (ক্লায়েন্ট অপশনসমূহ)</h2>
        <p class="muted" style="margin:0 0 16px">Access your assigned numbers, live SMS, and statistics.</p>
        <div class="mod-grid">
          <div class="mod-card">
            <div class="mod-head"><span>\${S('phone')} SMS Module</span><span class="badge active">3 Options</span></div>
            <div class="mod-links">
              <button class="mod-btn" data-go="fnumbers">\${S('phone')} <b>My Numbers</b> — Your assigned numbers</button>
              <button class="mod-btn" data-go="livesms">\${S('pulse')} <b>Live SMS Feed</b> — Incoming messages</button>
              <button class="mod-btn" data-go="cdr">\${S('search')} <b>CDR & Statistics</b> — Complete SMS logs</button>
            </div>
          </div>
          <div class="mod-card">
            <div class="mod-head"><span>\${S('bill')} Billing & Account</span><span class="badge active">4 Options</span></div>
            <div class="mod-links">
              <button class="mod-btn" data-go="bill">\${S('bill')} <b>Balance & Ledger</b> — Current balance</button>
              <button class="mod-btn" data-go="ann">\${S('ann')} <b>Announcements</b> — System updates</button>
              <button class="mod-btn" data-go="chat">\${S('chat')} <b>Support Chat</b> — Help desk</button>
              <button class="mod-btn" data-go="prof">\${S('prof')} <b>Profile & API</b> — Settings & API token</button>
            </div>
          </div>
        </div>
      </section>
    \`;

    return \`<section class="card hero"><div class="eyebrow">MSI SMS</div><h1>\${esc(ME.full_name || ME.username)}</h1><p class="muted" style="margin:0">Live overview — updates the moment something happens.</p>\${s.pending ? \`<div class="row"><button class="btn g nf" data-go="pending_users">\${s.pending} account(s) waiting for approval</button></div>\` : ''}</section>\`
      + card('Overview', 'Overview', \`<div class="stats">\${kp.map(([l, v]) => \`<div class="stat"><small>\${l}</small><strong>\${esc(v)}</strong></div>\`).join('')}</div>\`)
      + (ME.role === 'agent' ? agentModHtml : (ME.role === 'admin' ? adminModHtml : clientModHtml))
      + card('SMS Activity', 'SMS Last 7 Days', \`<div class="chart">\${(s.series || []).map(x => \`<div class="bar"><em>\${x.n}</em><div style="height:\${Math.max(x.n / mx * 100, 3)}%"></div>\${x.day.slice(5)}</div>\`).join('')}</div>\`);
  },
`;

app = app.replace(oldDash, newDash);

// 2. Add extra pages
const extraPages = `  async livesms() {
    const res = await api('/cdr?limit=30').catch(() => ({ rows: [] }));
    const rows = res.rows || [];
    return card('Real-time Stream', 'Live SMS Stream', \`
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:14px">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--green)"></span>
          <b>Live Stream Active</b>
          <span class="muted">(incoming messages arrive automatically)</span>
        </div>
        <div style="display:flex;gap:10px">
          <button class="btn" data-go="testsms">⚡ Test Simulator</button>
          <button class="btn" data-go="cdr">View CDR</button>
        </div>
      </div>
      <div id="livesmsList" style="display:flex;flex-direction:column;gap:10px">
        \${rows.length ? rows.map(m => \`
          <div class="card" style="padding:14px 18px;margin:0;border-left:4px solid var(--blue);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
            <div>
              <div style="display:flex;align-items:center;gap:10px">
                <span class="mono" style="font-weight:700;font-size:1.1rem;color:var(--text)">\${esc(m.msisdn || m.number)}</span>
                <span class="badge active" style="font-size:0.75rem">\${esc(m.cli || 'SMS')}</span>
              </div>
              <div style="margin-top:6px;color:var(--text);font-size:0.96rem;word-break:break-word">\${esc(m.text || m.msg || '')}</div>
            </div>
            <div style="text-align:right">
              <span class="muted" style="font-size:0.82rem">\${ft(m.ts)}</span>
              \${m.payout ? \`<div style="color:var(--green);font-weight:700;font-size:0.9rem;margin-top:4px">+\${fm(m.payout)} USD</div>\` : ''}
            </div>
          </div>
        \`).join('') : '<p class="muted">Waiting for real-time messages... When a message is sent to your numbers, it appears here instantly.</p>'}
      </div>
    \`);
  },
  async assign_client() {
    const [cs, numData] = await Promise.all([api('/clients'), api('/numbers')]);
    const unassigned = (numData.rows || []).filter(x => !x.client);
    if (!cs.length) {
      return card('Clients Master', 'Assign Numbers to Client', '<p class="muted">You do not have any clients yet. Please create a client first from <a data-go="addclient">Create Client</a>.</p>');
    }
    return card('Clients Master', 'Assign Numbers to Client', \`
      <p class="muted" style="margin:0 0 14px">Assign your active numbers to a registered client and set the client payout rate per SMS.</p>\`
      + form('assignClientForm',
        F('Select Client', 'client_id', 'select', { opts: cs.map(c => [c.id, \`\${c.username} (\${c.full_name || 'No name'})\`]), req: 1 })
        + F('Client payout per SMS (USD)', 'payout', 'number', { step: '0.000001', min: 0, val: '0.005', req: 1 })
        + \`<div class="f"><label>Select Numbers (\${unassigned.length} unassigned numbers available)</label>
           <div style="max-height:220px;overflow-y:auto;background:var(--inner);padding:10px;border-radius:10px;border:1px solid var(--line);display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:6px">
             \${unassigned.length ? unassigned.map(n => \`<label style="display:flex;align-items:center;gap:6px;font-size:0.85rem;cursor:pointer"><input type="checkbox" name="nums" value="\${n.id}"> <span class="mono">\${esc(n.msisdn)}</span></label>\`).join('') : '<span class="muted" style="padding:10px">No unassigned numbers. Request more numbers from Ranges.</span>'}
           </div></div>\`,
        'Assign Selected Numbers'
      )
    );
  },
  async payout_hist() {
    const list = await api('/payouts');
    return card('Billing & Payout', 'Payout History', tbl(
      ['Request ID', 'Date', 'Amount (USD)', 'Method', 'Account / Wallet', 'Status', 'Notes'],
      list.map(p => [
        '#' + p.id,
        ft(p.created_at || p.ts),
        '<b>' + fm(p.amount) + '</b>',
        esc(p.method),
        '<span class="mono">' + esc(p.account || p.details || '—') + '</span>',
        badge(p.status),
        esc(p.notes || '—')
      ]),
      'No payout requests submitted yet. Use <a data-go="payout">Request Payout</a> to withdraw your earnings.'
    ));
  },
  async dev_api() {
    const m = ME;
    return card('Developer & API', 'CDR & Ingest API Integration', \`
      <p class="muted" style="margin:0 0 16px">You can retrieve your incoming SMS and CDR data programmatically using your personal API Token.</p>
      <div class="card" style="background:var(--inner);padding:16px;margin-bottom:16px">
        <label style="font-weight:600">Your Personal API Token</label>
        <div style="display:flex;align-items:center;gap:10px;margin-top:8px">
          <input type="text" class="mono" value="\${esc(m.api_token || '')}" readonly style="flex:1;background:var(--surface)">
          <button class="btn nf" onclick="navigator.clipboard.writeText('\${esc(m.api_token)}');toast('Token copied to clipboard!')">Copy Token</button>
          <button class="btn nf" data-act="regen">Regenerate</button>
        </div>
      </div>
      <h3>API Endpoints</h3>
      <div class="kv" style="margin-top:10px">
        <small>GET Endpoint</small>
        <b class="mono" style="word-break:break-all">\${esc(location.origin)}/api/v2/cdr?token=\${esc(m.api_token)}&records=100</b>
      </div>
      <div class="kv">
        <small>Query Parameters</small>
        <span><code>token</code> (required), <code>records</code> (max 500), <code>dt1</code>, <code>dt2</code> (UTC dates YYYY-MM-DD), <code>filternum</code>, <code>filtercli</code></span>
      </div>
      <div class="kv">
        <small>cURL Example</small>
        <pre class="mono" style="margin:6px 0 0;padding:10px;background:var(--surface);border-radius:8px;font-size:0.85rem;overflow-x:auto">curl -s "\${esc(location.origin)}/api/v2/cdr?token=\${esc(m.api_token)}&records=20"</pre>
      </div>
    \`);
  }
`;

const pageEnd = '  }};\n// ---------- nested menus with expandable categories ----------';
app = app.replace(pageEnd, extraPages + pageEnd);

// 3. Add assignClientForm to DO
const doTarget = "async createClient(d, f) { await api('/clients', { body: d }); go('clients'); toast('Client created — they can sign in now'); },";
const doAddition = `async assignClientForm(d, f) {
    const nums = $$('input[name=nums]:checked').map(x => +x.value);
    if (!nums.length) throw new Error('Please select at least one number to assign');
    const r = await api('/numbers/assign', { body: { ids: nums, client_id: d.client_id, client_payout: d.payout } });
    go('clients');
    toast(\`\${r.updated} number(s) assigned to client\`);
  },
  ` + doTarget;

app = app.replace(doTarget, doAddition);

fs.writeFileSync('public/app.js', app, 'utf8');
console.log('Update finished successfully!');
