'use strict';

// --------------------------------------------------------------------------
// SVG ICON REGISTRY
// --------------------------------------------------------------------------
const P = {
  dash: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c2.5 0 4.5 1.8 4.5 4.5"/>',
  uplus: '<circle cx="10" cy="8" r="3.5"/><path d="M3 20c0-3.6 3-6 7-6M18 14v6M15 17h6"/>',
  sliders: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H15a3 3 0 010 6H9a3 3 0 000 6h6.5"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
  bill: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6"/>',
  code: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3"/>',
  chat: '<path d="M4 5h16v11H9l-5 4zM8 9h8M8 12h5"/>',
  ann: '<path d="M6 16v-5a6 6 0 0112 0v5l2 2H4zM10 21h4M2 8c.5-2 1.5-3.5 3-4.5M22 8c-.5-2-1.5-3.5-3-4.5"/>',
  bell: '<path d="M6 16v-5a6 6 0 0112 0v5l2 2H4zM10 21h4"/>',
  dl: '<path d="M12 4v11M7 11l5 5 5-5M4 20h16"/>',
  prof: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M6 19c1.5-3 4-4 6-4s4.5 1 6 4"/>',
  pulse: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l5 5"/>',
  clip: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 3h6v3H9zM9 11h6M9 15h6"/>',
  chev: '<path d="M6 9l6 6 6-6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
  out: '<path d="M10 4H5v16h5M15 8l4 4-4 4M19 12H9"/>',
  cal: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M8 3v4M16 3v4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  refresh: '<path d="M20 12a8 8 0 11-2.3-5.7M20 4v5h-5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.5-6 8-6s8 2 8 6"/>',
  exp: '<path d="M7 3h7l4 4v14H7zM14 3v4h4M12 11v5M10 14l2 2 2-2"/>',
  txt: '<path d="M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 012-2h9"/>',
  chk: '<path d="M5 12l5 5 9-10"/>',
  vchk: '<circle cx="12" cy="12" r="9" fill="rgba(52,211,153,0.15)"/><path d="M8 12.5l2.5 2.5 5.5-6" stroke="#34d399" stroke-width="2"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff: '<path d="M3 3l18 18M10.584 10.587a2 2 0 002.828 2.83M9.363 5.365A9.466 9.466 0 0112 5c7 0 10 7 10 7a13.16 13.16 0 01-1.673 2.68m-4.47 4.47A9.458 9.458 0 0112 19c-7 0-10-7-10-7a13.15 13.15 0 012.872-3.873"/>',
  tg: '<path d="M21.5 3.5L2.5 11l6.5 2.5 2 6 3-3.5 5 3.5 2.5-16zM9 13.5l8-7-6.5 7.5v3.5L9 13.5z" fill="currentColor"/>',
  wa: '<path d="M12 2a10 10 0 00-8.6 15.1L2 22l5.1-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.2c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8 1-.1.1-.3.2-.5.1a6.6 6.6 0 01-4-3.5c-.2-.3 0-.5.1-.6l.4-.5c.1-.1.1-.3.2-.4s0-.3 0-.4-.5-1.2-.7-1.7c-.2-.4-.4-.4-.5-.4h-.4c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 5 4.3 1.8.8 2.5.9 3.4.7.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" fill="currentColor"/>',
  mob: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M12 17h.01"/>'
};

const S = n => `<svg class="i" viewBox="0 0 24 24">${P[n] || P.dash}</svg>`;
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fm = n => (n / 1e6).toFixed(4), ft = t => t ? new Date(t).toISOString().slice(0, 16).replace('T', ' ') + ' UTC' : '—';
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

let ME = null, PAGE = 'dash', ES = null, LAST = null;
const FIL = {};
const OPEN_GRPS = new Set(); // Tracks open accordion menu sections in sidebar

// --------------------------------------------------------------------------
// WORLDWIDE COUNTRIES DATASET FOR WHATSAPP & COUNTRY SELECTOR
// --------------------------------------------------------------------------
const COUNTRIES = [
  { name: 'Bangladesh', code: 'BD', dial: '+880', flag: '🇧🇩', region: 'Asia' },
  { name: 'India', code: 'IN', dial: '+91', flag: '🇮🇳', region: 'Asia' },
  { name: 'Pakistan', code: 'PK', dial: '+92', flag: '🇵🇰', region: 'Asia' },
  { name: 'Nepal', code: 'NP', dial: '+977', flag: '🇳🇵', region: 'Asia' },
  { name: 'Sri Lanka', code: 'LK', dial: '+94', flag: '🇱🇰', region: 'Asia' },
  { name: 'China', code: 'CN', dial: '+86', flag: '🇨🇳', region: 'Asia' },
  { name: 'Japan', code: 'JP', dial: '+81', flag: '🇯🇵', region: 'Asia' },
  { name: 'South Korea', code: 'KR', dial: '+82', flag: '🇰🇷', region: 'Asia' },
  { name: 'Malaysia', code: 'MY', dial: '+60', flag: '🇲🇾', region: 'Asia' },
  { name: 'Singapore', code: 'SG', dial: '+65', flag: '🇸🇬', region: 'Asia' },
  { name: 'Indonesia', code: 'ID', dial: '+62', flag: '🇮🇩', region: 'Asia' },
  { name: 'Thailand', code: 'TH', dial: '+66', flag: '🇹🇭', region: 'Asia' },
  { name: 'Vietnam', code: 'VN', dial: '+84', flag: '🇻🇳', region: 'Asia' },
  { name: 'Philippines', code: 'PH', dial: '+63', flag: '🇵🇭', region: 'Asia' },
  { name: 'United Arab Emirates', code: 'AE', dial: '+971', flag: '🇦🇪', region: 'Middle East' },
  { name: 'Saudi Arabia', code: 'SA', dial: '+966', flag: '🇸🇦', region: 'Middle East' },
  { name: 'Qatar', code: 'QA', dial: '+974', flag: '🇶🇦', region: 'Middle East' },
  { name: 'Kuwait', code: 'KW', dial: '+965', flag: '🇰🇼', region: 'Middle East' },
  { name: 'Oman', code: 'OM', dial: '+968', flag: '🇴🇲', region: 'Middle East' },
  { name: 'Bahrain', code: 'BH', dial: '+973', flag: '🇧🇭', region: 'Middle East' },
  { name: 'Turkey', code: 'TR', dial: '+90', flag: '🇹🇷', region: 'Middle East' },
  { name: 'United States', code: 'US', dial: '+1', flag: '🇺🇸', region: 'Americas' },
  { name: 'Canada', code: 'CA', dial: '+1', flag: '🇨🇦', region: 'Americas' },
  { name: 'United Kingdom', code: 'GB', dial: '+44', flag: '🇬🇧', region: 'Europe' },
  { name: 'Germany', code: 'DE', dial: '+49', flag: '🇩🇪', region: 'Europe' },
  { name: 'France', code: 'FR', dial: '+33', flag: '🇫🇷', region: 'Europe' },
  { name: 'Italy', code: 'IT', dial: '+39', flag: '🇮🇹', region: 'Europe' },
  { name: 'Spain', code: 'ES', dial: '+34', flag: '🇪🇸', region: 'Europe' },
  { name: 'Netherlands', code: 'NL', dial: '+31', flag: '🇳🇱', region: 'Europe' },
  { name: 'Australia', code: 'AU', dial: '+61', flag: '🇦🇺', region: 'Oceania' },
  { name: 'New Zealand', code: 'NZ', dial: '+64', flag: '🇳🇿', region: 'Oceania' },
  { name: 'Brazil', code: 'BR', dial: '+55', flag: '🇧🇷', region: 'Americas' },
  { name: 'South Africa', code: 'ZA', dial: '+27', flag: '🇿🇦', region: 'Africa' },
  { name: 'Egypt', code: 'EG', dial: '+20', flag: '🇪🇬', region: 'Africa' },
  { name: 'Nigeria', code: 'NG', dial: '+234', flag: '🇳🇬', region: 'Africa' },
  { name: 'Kenya', code: 'KE', dial: '+254', flag: '🇰🇪', region: 'Africa' }
];

let CURRENT_COUNTRY = COUNTRIES[0]; // Bangladesh default

// --------------------------------------------------------------------------
// API & NETWORK CLIENT
// --------------------------------------------------------------------------
async function api(p, o = {}) {
  const sid = localStorage.getItem('msi_sid');
  const headers = { 'Content-Type': 'application/json', 'X-Requested-With': 'msi', ...(sid ? { 'X-Session-ID': sid } : {}) };
  const r = await fetch('/api' + p, {
    method: o.method || (o.body ? 'POST' : 'GET'),
    credentials: 'include',
    headers,
    body: o.body ? JSON.stringify(o.body) : undefined
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) {
    if (r.status === 401 && ME) {
      ME = null;
      localStorage.removeItem('msi_sid');
      showAuth('login');
    }
    throw new Error(j.error || 'Something went wrong. Please try again.');
  }
  return j;
}

const toast = t => {
  const e = $('#toast');
  if (!e) return;
  e.textContent = t;
  e.className = 'show';
  clearTimeout(toast.t);
  toast.t = setTimeout(() => e.className = '', 4500);
};

// --------------------------------------------------------------------------
// HTML BUILDERS & REUSABLE COMPONENTS
// --------------------------------------------------------------------------
const F = (l, n, t = 'text', o = {}) => `<div class="f"><label>${l}</label>${t === 'select' ? `<div class="sel"><select name="${n}">${o.opts.map(x => { const [v, lb] = Array.isArray(x) ? x : [x, x]; return `<option value="${esc(v)}"${String(o.val ?? '') === String(v) ? ' selected' : ''}>${esc(lb)}</option>`; }).join('')}</select></div>` : t === 'area' ? `<textarea name="${n}" style="height:140px" placeholder="${esc(o.ph || '')}"></textarea>` : `<input name="${n}" type="${t}" value="${esc(o.val ?? '')}" placeholder="${esc(o.ph || '')}"${o.req ? ' required' : ''}${t === 'password' ? ' autocomplete="new-password"' : ''}${o.step ? ` step="${o.step}"` : ''}${o.min !== undefined ? ` min="${o.min}"` : ''}>`}</div>`;
const card = (eb, t, inner, right = '') => `<section class="card"><div class="hr"><div>${eb ? `<div class="eyebrow">${eb}</div>` : ''}<h2>${t}</h2></div>${right}</div>${inner}</section>`;
const tbl = (cols, rows, empty) => `<div class="dw box"><table style="min-width:${cols.length * 120}px"><thead><tr>${cols.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.length ? rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('') : `<tr><td colspan="${cols.length}" class="muted">${empty}</td></tr>`}</tbody></table></div>`;
const form = (act, fields, btn, extra = '') => `<form class="af" data-do="${act}">${fields}${extra}<button class="btn g wide" type="submit">${btn}</button><div class="msg"></div></form>`;
const badge = s => `<span class="badg" style="${s === 'active' ? '' : 'background:rgba(255,255,255,.08);color:var(--muted)'}">${esc(s)}</span>`;
const sm = (act, id, label, v = '') => `<button class="sm" data-act="${act}" data-id="${id}" data-v="${esc(v)}">${label}</button>`;
const filt = (page, fields) => `<form class="af" data-do="filter" data-page="${page}">${fields}<button class="btn g wide" type="submit"><u>${S('search')}</u>Search</button></form>`;
const rangeOpts = async (all = true) => { const r = await api('/range-names'); return [...(all ? [['', 'All ranges']] : []), ...r.map(x => [x.id, x.name])]; };

// --------------------------------------------------------------------------
// PAGES IMPLEMENTATIONS (All agent, admin and client views)
// --------------------------------------------------------------------------
const PG = {
  async dash() {
    const s = await api('/stats'), mx = Math.max(1, ...s.series.map(x => x.n));
    const liveFeed = await api('/live-test-feed').catch(() => []);
    
    if (ME.role === 'admin') {
      const isAway = s.admin_availability === 'away';
      return `<section class="card hero">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:14px">
          <div>
            <div class="eyebrow">MSI SMS MULTI-TENANT ARCHITECTURE</div>
            <h1 style="margin:4px 0 6px">Master Operations Dashboard</h1>
            <p class="muted" style="margin:0">Real-time tenant synchronization · Multi-agent panels · Automated number routing</p>
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <span class="badg" style="background:${isAway ? 'rgba(234,179,8,0.18)' : 'rgba(52,211,153,0.18)'};color:${isAway ? '#facc15' : '#34d399'};border:1px solid ${isAway ? '#ca8a04' : '#059669'}">
              ${isAway ? '🌙 Admin Away (AI Auto-Pilot Active)' : '🟢 Admin Online'}
            </span>
            <button class="btn nf sm" data-go="ai_ops" style="padding:7px 14px;font-size:0.85rem">AI Settings</button>
          </div>
        </div>
        <div class="row" style="margin-top:16px;gap:8px">
          <button class="btn g" data-go="tenants"><u>${S('globe')}</u>Manage Agent Panels (${s.tenants_count || 0})</button>
          <button class="btn" data-go="num_requests"><u>${S('phone')}</u>Number Requests ${s.pending_requests ? `<span class="badge" style="position:static;display:inline-flex;margin-left:6px">${s.pending_requests}</span>` : ''}</button>
          <button class="btn" data-go="sessions"><u>${S('key')}</u>User Sessions (${s.active_sessions || 1})</button>
          <button class="btn" data-go="sms_test"><u>${S('pulse')}</u>⚡ Real-Time Live Test SMS</button>
        </div>
      </section>`
      + card('Multi-Tenant Overview', 'System Metrics', `<div class="stats">
        <div class="stat"><small>Active Agent Panels</small><strong>${esc(s.tenants_count || s.agents)}</strong></div>
        <div class="stat"><small>Active Sessions</small><strong>${esc(s.active_sessions || 1)}</strong></div>
        <div class="stat"><small>Number Requests Pending</small><strong style="${s.pending_requests ? 'color:#facc15' : ''}">${esc(s.pending_requests || 0)}</strong></div>
        <div class="stat"><small>Free Numbers Stock</small><strong>${esc(s.free)}</strong></div>
        <div class="stat"><small>Allocated Numbers</small><strong>${esc(s.allocated)}</strong></div>
        <div class="stat"><small>Real-time SMS Today</small><strong style="color:var(--green)">${esc(s.sms.today)}</strong></div>
        <div class="stat"><small>SMS This Month</small><strong>${esc(s.sms.month)}</strong></div>
        <div class="stat"><small>SMS All Time</small><strong>${esc(s.sms.all)}</strong></div>
      </div>`)
      + card('Strictly Live Data', 'Real-Time Live Test SMS Feed', `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <p class="muted" style="margin:0">Live incoming test messages synchronized straight from SQLite ingest stream.</p>
          <button class="btn sm" data-go="sms_test" style="padding:6px 14px;font-size:0.85rem">Send Live Test SMS</button>
        </div>
        ${tbl(['Date / Time', 'Target MSISDN', 'Sender CLI', 'Live Message Body', 'Range'], liveFeed.map(m => [
          ft(m.ts),
          `<b class="mono">${esc(m.msisdn)}</b>`,
          `<span class="badg">${esc(m.cli)}</span>`,
          `<span style="white-space:normal;display:block;max-width:340px">${esc(m.body)}</span>`,
          esc(m.range_name || 'Direct')
        ]), 'No live SMS received yet. Click "Send Live Test SMS" to generate real live stream data.' )}
      `)
      + card('Traffic Volume', 'SMS Activity Last 7 Days', `<div class="chart">${s.series.map(x => `<div class="bar"><em>${x.n}</em><div style="height:${Math.max(x.n / mx * 100, 3)}%"></div>${x.day.slice(5)}</div>`).join('')}</div>`);
    }

    // Agent Dashboard view
    const isAway = s.admin_availability === 'away';
    const kp = [
      ['Today SMS', s.sms.today],
      ['This Week SMS', s.sms.week],
      ['This Month SMS', s.sms.month],
      ['All Time SMS', s.sms.all],
      ['Balance (USD)', fm(s.balance)],
      ['My numbers', s.numbers],
      ['Clients', s.clients || 0],
      ['Tenant Panel', s.tenant ? s.tenant.name : 'MSI Agent Portal']
    ];
    return `<section class="card hero">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px">
        <div>
          <div class="eyebrow">${s.tenant ? esc(s.tenant.name) : 'MSI SMS AGENT PANEL'}</div>
          <h1 style="margin:4px 0">${esc(ME.full_name || ME.username)}</h1>
          <p class="muted" style="margin:0">Tenant ID: <span class="mono">${esc(s.tenant ? s.tenant.tenant_id : 'panel_' + ME.username)}</span> · Synchronized with Master Dashboard</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <span class="badg" style="background:${isAway ? 'rgba(234,179,8,0.18)' : 'rgba(52,211,153,0.18)'};color:${isAway ? '#facc15' : '#34d399'}">
            ${isAway ? '🌙 Admin Away (AI Assistant Active)' : '🟢 Admin Online'}
          </span>
          <button class="btn sm" data-go="chat" style="padding:6px 12px;font-size:0.85rem">Live AI Support</button>
        </div>
      </div>
      <div class="row" style="margin-top:16px;gap:8px">
        <button class="btn g" data-go="req_numbers">Request Numbers</button>
        <button class="btn" data-go="sms_test">⚡ Test Live SMS</button>
        <button class="btn" data-go="fnumbers">SMS Numbers (${s.numbers})</button>
        <button class="btn" data-go="my_requests">My Requests</button>
      </div>
    </section>`
    + card('Overview', 'Overview', `<div class="stats">${kp.map(([l, v]) => `<div class="stat"><small>${l}</small><strong>${esc(v)}</strong></div>`).join('')}</div>`)
    + card('Real-Time Live Feed', 'Recent Live SMS Activity', `
      ${tbl(['Date / Time', 'Number', 'Sender CLI', 'Live Message Body', 'Range'], liveFeed.map(m => [
        ft(m.ts),
        `<b class="mono">${esc(m.msisdn)}</b>`,
        `<span class="badg">${esc(m.cli)}</span>`,
        `<span style="white-space:normal;display:block;max-width:320px">${esc(m.body)}</span>`,
        esc(m.range_name || 'Standard')
      ]), 'No incoming SMS recorded yet. Try the Live Test SMS tool above!')}
    `)
    + card('SMS Activity', 'SMS Last 7 Days', `<div class="chart">${s.series.map(x => `<div class="bar"><em>${x.n}</em><div style="height:${Math.max(x.n / mx * 100, 3)}%"></div>${x.day.slice(5)}</div>`).join('')}</div>`);
  },

  // ----- admin
  async users() {
    const f = FIL.users || {}, rows = await api('/admin/users?' + new URLSearchParams(f));
    const acts = u => [u.status !== 'active' ? sm('setst', u.id, u.status === 'pending' ? 'Approve' : 'Activate', 'active') : '', u.status === 'pending' ? sm('setst', u.id, 'Reject', 'rejected') : '', u.status === 'active' && u.id !== ME.id ? sm('setst', u.id, 'Suspend', 'suspended') : '', sm('resetpw', u.id, 'Reset password')].join(' ');
    return card('User Management', 'Users', filt('users', F('Role', 'role', 'select', { opts: [['', 'All roles'], 'admin', 'agent', 'client'], val: f.role }) + F('Status', 'status', 'select', { opts: [['', 'All statuses'], 'pending', 'active', 'suspended', 'rejected'], val: f.status }) + F('Search', 'q', 'text', { val: f.q, ph: 'Username, name or email' }))
      + tbl(['User', 'Name', 'Role', 'Status', 'Contact', 'Agent', 'Numbers', 'Last login', 'Actions'], rows.map(u => [esc(u.username), esc(u.full_name), esc(u.role), badge(u.status), esc([u.email, u.whatsapp].filter(Boolean).join(' · ')), esc(u.parent || '—'), u.nums, ft(u.last_login), acts(u)]), 'No users found.'))
      + card('Accounts', 'Create User', form('createUser', F('Username', 'username', 'text', { req: 1 }) + F('Password', 'password', 'password', { req: 1 }) + F('Full name', 'full_name') + F('Email', 'email', 'email') + F('WhatsApp', 'whatsapp') + F('Country', 'country') + F('Role', 'role', 'select', { opts: ['agent', 'client', 'admin'] }) + F('Agent username (only for clients)', 'agent'), 'Create user'));
  },

  async aranges() {
    const rs = await api('/admin/ranges'), opts = rs.map(r => [r.id, r.name]);
    return card('Inventory', 'Ranges', tbl(['Range', 'Country', 'Prefix', 'Agent payout', 'Daily limit', 'Free', 'Allocated', 'Status', ''], rs.map(r => [esc(r.name), esc(r.country), esc(r.prefix), fm(r.agent_payout), r.daily_limit || 'No limit', r.free, r.allocated, badge(r.enabled ? 'active' : 'disabled'), sm('togrange', r.id, r.enabled ? 'Disable' : 'Enable', r.enabled ? '0' : '1')]), 'No ranges yet. Add your first range below.'))
      + card('Inventory', 'Add Range', form('addRange', F('Range name', 'name', 'text', { req: 1 }) + F('Country', 'country') + F('Prefix', 'prefix') + F('Agent payout per SMS (USD)', 'agent_payout', 'number', { step: '0.000001', min: 0, val: 0 }) + F('Daily limit per agent (0 = no limit)', 'daily_limit', 'number', { min: 0, val: 0 }), 'Add range'))
      + (rs.length ? card('Pricing', 'Update Payout & Limit', form('updRange', F('Range', 'id', 'select', { opts }) + F('New agent payout per SMS (USD)', 'agent_payout', 'number', { step: '0.000001', min: 0 }) + F('New daily limit per agent', 'daily_limit', 'number', { min: 0 }), 'Save changes'))
        + card('Inventory', 'Upload Numbers', form('upload', F('Range', 'id', 'select', { opts }) + `<div class="f"><label>Numbers file (.txt or .csv)</label><input type="file" data-fill="text" accept=".txt,.csv,text/plain,text/csv"></div>` + F('Or paste numbers (one per line, or separated by commas)', 'text', 'area'), 'Upload numbers')) : '');
  },

  async anumbers() {
    const f = FIL.anumbers || {}, r = await api('/admin/numbers?' + new URLSearchParams(f)), ro = await rangeOpts();
    LAST = { name: 'numbers', cols: ['Number', 'Range', 'Status', 'Agent', 'Client'], rows: r.rows.map(x => [x.msisdn, x.range, x.status, x.agent || '', x.client || '']) };
    return card('Inventory', 'Numbers', filt('anumbers', F('Range', 'range', 'select', { opts: ro, val: f.range }) + F('Status', 'status', 'select', { opts: [['', 'All'], 'free', 'allocated'], val: f.status }) + F('Agent username', 'agent', 'text', { val: f.agent }) + F('Number', 'q', 'text', { val: f.q }))
      + `<button class="btn wide" data-act="export" style="margin-top:10px"><u>${S('exp')}</u>Export CSV</button><p class="muted">Showing ${r.rows.length} of ${r.total}</p>` + tbl(['Number', 'Range', 'Status', 'Agent', 'Client', 'Last SMS'], r.rows.map(x => [esc(x.msisdn), esc(x.range), badge(x.status === 'free' ? 'free' : 'active'), esc(x.agent || '—'), esc(x.client || '—'), ft(x.last_sms)]), 'No numbers found.'));
  },

  async keys() {
    const ks = await api('/admin/keys');
    return card('Providers', 'API Keys for Incoming SMS', `<p class="muted" style="margin:0 0 14px">Give a key to the system that delivers SMS to you. It sends each message to this address:</p><div class="kv"><small>POST</small><b class="mono" style="font-size:1rem;word-break:break-all">${esc(location.origin)}/api/ingest</b></div><div class="kv"><small>Header</small><span class="mono">X-API-Key: your key</span></div><div class="kv"><small>Body (JSON, one message or {"messages":[…]})</small><span class="mono">{"number":"8801700000001","cli":"SENDER","text":"message","ts":1700000000000}</span></div>`)
      + card('Providers', 'Keys', tbl(['Name', 'Created', 'Status', ''], ks.map(k => [esc(k.name), ft(k.created_at), badge(k.revoked ? 'revoked' : 'active'), k.revoked ? '' : sm('revoke', k.id, 'Revoke')]), 'No keys yet.'))
      + card('Providers', 'Create Key', form('addKey', F('Key name', 'name', 'text', { req: 1, ph: 'e.g. provider name' }), 'Create key'));
  },

  async audit() { const r = await api('/admin/audit'); return card('Security', 'Audit Log', tbl(['Time', 'Who', 'Action', 'Details', 'IP'], r.map(x => [ft(x.ts), esc(x.actor || '—'), esc(x.action), esc(x.detail), esc(x.ip)]), 'Nothing recorded yet.')); },

  // ----- agent views
  async clients() {
    const cs = await api('/clients');
    return card('Users Master', 'Clients', tbl(['Username', 'Name', 'Contact', 'Numbers', 'Status', 'Last login', ''], cs.map(c => [esc(c.username), esc(c.full_name), esc([c.email, c.whatsapp].filter(Boolean).join(' · ')), c.numbers, badge(c.status), ft(c.last_login), sm('cst', c.id, c.status === 'active' ? 'Suspend' : 'Activate', c.status === 'active' ? 'suspended' : 'active')]), 'No clients yet.'))
      + card('Users Master', 'Create Client', `<p class="muted" style="margin:0 0 14px">The client can sign in straight away with this username and password.</p>` + form('createClient', F('Username', 'username', 'text', { req: 1 }) + F('Password', 'password', 'password', { req: 1 }) + F('Full name', 'full_name') + F('Email', 'email', 'email') + F('WhatsApp', 'whatsapp') + F('Country', 'country'), 'Create client'));
  },

  async create_user() {
    return card('Users Master', 'Create New User / Client', `<p class="muted" style="margin:0 0 14px">Create a client account directly. The user can log in immediately with their credentials.</p>` + form('createClient', F('Username', 'username', 'text', { req: 1 }) + F('Password', 'password', 'password', { req: 1 }) + F('Full name', 'full_name') + F('Email', 'email', 'email') + F('WhatsApp', 'whatsapp') + F('Country', 'country'), 'Create Client'));
  },

  async franges() {
    const rs = await api('/ranges');
    return card('SMS Module', 'Ranges', tbl(['Range', 'Country', 'Prefix', 'Your payout', 'Free numbers', 'Daily limit left'], rs.map(r => [esc(r.name), esc(r.country), esc(r.prefix), fm(r.agent_payout), r.free, r.daily_limit ? Math.max(0, r.daily_limit - r.used) : 'No limit']), 'No ranges are available yet.'))
      + (rs.length ? card('SMS Module', 'Request Numbers', `<p class="muted" style="margin:0 0 14px">Choose a range and how many numbers you need. They appear in My Numbers immediately.</p>` + form('requestNums', F('Range', 'range_id', 'select', { opts: rs.map(r => [r.id, `${r.name} (${r.free} free)`]) }) + F('Quantity', 'qty', 'number', { min: 1, val: 1 }), 'Request numbers')) : '');
  },

  async fnumbers() {
    const f = FIL.fnumbers || {}, isA = ME.role === 'agent', r = await api('/numbers?' + new URLSearchParams(f)), ro = await rangeOpts(), cs = isA ? await api('/clients') : [];
    LAST = { name: 'my-numbers', cols: ['Number', 'Range', 'Client'], rows: r.rows.map(x => [x.msisdn, x.range, x.client || '']) };
    const head = isA ? ['<input type="checkbox" class="ck" id="ca" aria-label="Select all">', 'Number', 'Range', 'Client', 'Your payout', 'Client payout', 'Last SMS'] : ['Number', 'Range', 'Payout', 'Last SMS'];
    const rows = r.rows.map(x => isA ? [`<input type="checkbox" class="ck rk" value="${x.id}">`, esc(x.msisdn), esc(x.range), esc(x.client || '—'), fm(x.agent_payout), x.client ? fm(x.client_payout) : '—', ft(x.last_sms)] : [esc(x.msisdn), esc(x.range), fm(x.client_payout), ft(x.last_sms)]);
    return card('SMS Module', 'SMS Numbers', filt('fnumbers', F('Range', 'range', 'select', { opts: ro, val: f.range }) + (isA ? F('Assignment', 'status', 'select', { opts: [['', 'All'], ['unassigned', 'Not assigned to a client'], ['assigned', 'Assigned to a client']], val: f.status }) : '') + F('Number', 'q', 'text', { val: f.q }))
      + `<button class="btn wide" data-act="export" style="margin-top:10px"><u>${S('exp')}</u>Export CSV</button><p class="muted">Showing ${r.rows.length} of ${r.total}</p>` + tbl(head, rows, 'No numbers yet.'))
      + (isA && r.rows.length ? card('SMS Module', 'Assign or Release Selected Numbers', `<p class="muted" style="margin:0 0 14px">Tick numbers above, then choose what to do.</p><div class="f"><label>Client</label><div class="sel"><select id="asc">${cs.map(c => `<option value="${c.id}">${esc(c.username)}</option>`).join('') || '<option value="">Create a client first</option>'}</select></div></div><div class="f"><label>Client payout per SMS (USD)</label><input id="asp" type="number" step="0.000001" min="0" value="0"></div><div class="acts"><button class="btn g" data-act="assign">Assign to client</button><button class="btn" data-act="unassign">Remove client</button><button class="btn" data-act="release">Return to stock</button></div><div class="msg" id="amsg"></div>`) : '');
  },

  async req_numbers() {
    const rs = await api('/ranges');
    return card('SMS Module', 'Request Numbers from Ranges', `<p class="muted" style="margin:0 0 14px">Select an active range and request allocation. Numbers are instantly attached to your agent account.</p>`
      + (rs.length ? form('requestNums', F('Range', 'range_id', 'select', { opts: rs.map(r => [r.id, `${r.name} (${r.free} numbers available · Payout: $${fm(r.agent_payout)})`]) }) + F('Quantity', 'qty', 'number', { min: 1, val: 1, req: 1 }), 'Request Numbers Now') : '<div class="empty"><p>No ranges available at this moment.</p></div>'));
  },

  async search_messages() {
    return PG.cdr();
  },

  async sms_test() {
    return card('SMS Module', 'SMS Test Panel', `<p class="muted" style="margin:0 0 16px">Simulate receiving an SMS on your allocated numbers to verify webhook routing and balance increments.</p>
      <div class="sc">
        <small>Testing status</small>
        <b>Ready</b>
      </div>
      <div class="kv">
        <small>Target phone number</small>
        <span class="mono">Use any number from your SMS Numbers inventory</span>
      </div>
      <div class="kv">
        <small>Test Payload Example</small>
        <pre class="mono" style="margin:0;font-size:0.85rem">{"number":"8801700000001","cli":"TEST_OTP","text":"Your MSI SMS code is 789012"}</pre>
      </div>`);
  },

  async bulk_alloc() {
    return PG.fnumbers();
  },

  async cdr() {
    const f = FIL.cdr || {}, qs = new URLSearchParams(), ro = await rangeOpts(), adm = ME.role === 'admin';
    if (f.from) qs.set('from', Date.parse(f.from + 'T00:00:00Z')); if (f.to) qs.set('to', Date.parse(f.to + 'T23:59:59.999Z'));
    ['range', 'number', 'cli', 'text', 'group', 'agent'].forEach(k => f[k] && qs.set(k, f[k]));
    const r = await api('/cdr?' + qs), g = r.group;
    const cols = g ? [cap(g), 'SMS', 'Payout'] : ['Date', 'Range', 'Number', 'CLI', 'Message', ...(adm ? ['Agent'] : []), 'Payout'];
    const rows = g ? r.rows.map(x => [esc(x.g || '—'), x.sms, fm(x.amt)]) : r.rows.map(x => [ft(x.ts), esc(x.range || '—'), esc(x.msisdn), esc(x.cli), esc(x.body), ...(adm ? [esc(x.agent || '—')] : []), fm(x.amt)]);
    LAST = { name: 'cdr', cols, rows: g ? r.rows.map(x => [x.g, x.sms, fm(x.amt)]) : r.rows.map(x => [ft(x.ts), x.range || '', x.msisdn, x.cli, x.body, ...(adm ? [x.agent || ''] : []), fm(x.amt)]) };
    return card(adm ? 'Messages' : 'CDR & Statistics', adm ? 'Messages & CDR' : 'CDR Records', filt('cdr', F('Date from', 'from', 'date', { val: f.from }) + F('Date to', 'to', 'date', { val: f.to }) + F('Range', 'range', 'select', { opts: ro, val: f.range }) + (adm ? F('Agent username', 'agent', 'text', { val: f.agent }) : '') + F('Number', 'number', 'text', { val: f.number }) + F('CLI', 'cli', 'text', { val: f.cli }) + F('Message text', 'text', 'text', { val: f.text }) + F('Group by', 'group', 'select', { opts: [['', 'No grouping'], ['date', 'Date'], ['hour', 'Hour'], ['range', 'Range'], ['number', 'Number'], ['cli', 'CLI']], val: f.group }))
      + `<button class="btn wide" data-act="export" style="margin-top:10px"><u>${S('exp')}</u>Export CSV</button><div class="gt"><b>Grand total</b><div><small>Total SMS</small><strong>${r.total}</strong></div><div><small>Payout</small><strong>${fm(r.amt)}</strong></div></div>` + tbl(cols, rows, 'No records found.'));
  },

  async bill() {
    const l = await api('/ledger');
    return card('Financial Account', 'Billing', `<div class="muted">Current balance</div><div class="bn">USD ${fm(l.balance)}</div>`) + card('Account Movement', 'Ledger', tbl(['Date', 'Type', 'Reference', 'Amount (USD)'], l.rows.map(x => [ft(x.ts), esc(x.kind), esc(x.ref), (x.amount < 0 ? '-' : '+') + fm(Math.abs(x.amount))]), 'No ledger entries yet.'));
  },

  async dev_api() {
    const m = await api('/me');
    return card('Developer tools', 'Agent API', `<p class="muted" style="margin:0 0 16px">Securely connect your systems to your MSI SMS agent account.</p>
      <div class="sc"><small>API Status</small><b>Ready</b></div>
      <div class="kv"><small>API Key</small><b class="mono" style="font-size:1rem;word-break:break-all">${esc(m.api_token || 'bsa_live_' + ME.username)}</b></div>
      <div class="kv"><small>Webhook Endpoint</small><span class="mono">${esc(location.origin)}/api/v2/cdr?token=${esc(m.api_token)}</span></div>
      <div class="kv"><small>Allowed scopes</small><span class="badg">Ranges: read</span> <span class="badg">Numbers: read</span> <span class="badg">Clients: read</span> <span class="badg">CDR: read</span> <span class="badg">Billing: read</span></div>
      <button class="btn" data-act="regen" style="margin-top:10px">Regenerate Key</button>`);
  },

  async simple_api() {
    const m = await api('/me');
    return card('Developer', 'Simple API V2', `<p class="muted" style="margin:0 0 14px">Fast REST API to fetch live CDR and message statuses.</p>
      <div class="kv"><small>GET Endpoint</small><span class="mono" style="word-break:break-all">${esc(location.origin)}/api/v2/cdr?token=${esc(m.api_token)}&amp;records=100</span></div>
      <div class="cdx"><div class="h"><span>cURL Example</span></div><pre>curl -X GET "${esc(location.origin)}/api/v2/cdr?token=${esc(m.api_token)}&amp;records=50"</pre></div>`);
  },

  async invitations() {
    const refLink = `${location.origin}/portal/register?ref=${esc(ME.username)}`;
    return card('Referral System', 'Agent Invitations', `<p class="muted" style="margin:0 0 14px">Invite new agents to MSI SMS using your unique referral link.</p>
      <div class="kv"><small>Your Referral Link</small><b class="mono" style="font-size:0.95rem;word-break:break-all">${refLink}</b></div>
      <div class="sc"><small>Total Referred Agents</small><b>0</b></div>
      <button class="btn g" onclick="navigator.clipboard.writeText('${refLink}');toast('Referral link copied!');">Copy Invite Link</button>`);
  },

  async chat() {
    return card('Support', 'Live Chat', `<div class="chat"><div class="cm2"><div class="w"><b>MSI SMS Support</b><small>Automated Help Desk</small></div><p style="margin:0">Welcome to MSI SMS! If you have any inquiries regarding rates, ranges or allocations, reply here.</p></div><div class="cin"><textarea id="chatInput" placeholder="Type your message..."></textarea><button class="btn g" onclick="const i=$('#chatInput');if(i.value.trim()){toast('Message sent to agent support');i.value='';}">Send</button></div></div>`);
  },

  async ann() {
    const a = await api('/announcements'), adm = ME.role === 'admin';
    return card('Announcements', adm ? 'Announcements' : 'Latest Announcements', tbl(['Date', 'Title', 'Message', ...(adm ? [''] : [])], a.map(x => [ft(x.ts), `<b>${esc(x.title)}</b>`, `<span style="white-space:normal;display:block;min-width:240px">${esc(x.body)}</span>`, ...(adm ? [sm('delann', x.id, 'Delete')] : [])]), 'No announcements yet.'))
      + (adm ? card('Announcements', 'New Announcement', form('addAnn', F('Title', 'title', 'text', { req: 1 }) + F('Message', 'body', 'area') + F('Expires on (optional)', 'expires', 'date'), 'Publish to everyone')) : '');
  },

  async notifications() {
    return card('Notifications', 'System Notifications', `<div class="nc un"><div class="ic2">${S('bell')}</div><h3><span>Account Security</span><span class="nw">System</span></h3><p>Your session is active and verified.</p><div class="mt"><small>Just now</small></div></div>`);
  },

  async download_app() {
    return card('Mobile App', 'Download MSI SMS Mobile App', `<div class="dl"><div class="a"><div class="tile">${S('mob')}</div><h2>Get MSI SMS for Android</h2><p class="muted">Track live SMS, client payouts, balance and notifications on the go.</p><button class="btn g wide" onclick="toast('Downloading MSI SMS APK...');">Download Android APK (v2.4)</button></div><div class="b"><h3>Installation steps</h3><ol><li>Click Download button</li><li>Open downloaded APK on your mobile</li><li>Enable "Install from Unknown Sources" if prompted</li><li>Sign in with your agent username and password</li></ol></div></div>`);
  },

  async prof() {
    const m = await api('/me');
    return card('Account Profile', esc(m.full_name || m.username), `<p class="muted" style="margin:0 0 8px">Signed in as <b>${esc(m.username)}</b> · ${cap(m.role)}</p>` + form('saveProfile', F('Full name', 'full_name', 'text', { val: m.full_name }) + F('Email', 'email', 'email', { val: m.email }) + F('WhatsApp', 'whatsapp', 'text', { val: m.whatsapp }) + F('Country', 'country', 'text', { val: m.country }), 'Save changes'))
      + card('Security', 'Change Password', form('changePw', F('Current password', 'current', 'password', { req: 1 }) + F('New password', 'password', 'password', { req: 1 }) + F('Confirm new password', 'confirm', 'password', { req: 1 }), 'Change password'))
      + (m.api_token ? card('Developer', 'Your API Token', `<p class="muted" style="margin:0 0 12px">Keep it private. Anyone with this token can read your SMS records.</p><div class="tkb"><div class="t mono" id="tok">${esc(m.api_token)}</div></div><div class="kv" style="margin-top:12px"><small>CDR API</small><span class="mono" style="word-break:break-all">${esc(location.origin)}/api/v2/cdr?token=${esc(m.api_token)}&amp;records=100</span></div><p class="muted">Optional: dt1, dt2 (UTC dates), filternum, filtercli.</p><button class="btn" data-act="regen">Generate a new token</button>`) : '');
  }
};

// --------------------------------------------------------------------------
// SIDEBAR MENU DEFINITION (Matching Screenshots 3, 4, 5, 6)
// --------------------------------------------------------------------------
const AGENT_MENU = [
  { id: 'dash', label: 'Dashboard', icon: 'dash' },
  {
    grp: 'users_master',
    label: 'Users Master',
    icon: 'users',
    sub: [
      { id: 'clients', label: 'Clients' },
      { id: 'create_user', label: 'Create User' }
    ]
  },
  {
    grp: 'cdr_stats',
    label: 'CDR & Statistics',
    icon: 'pulse',
    sub: [
      { id: 'cdr', label: 'CDR' }
    ]
  },
  {
    grp: 'sms_module',
    label: 'SMS Module',
    icon: 'phone',
    sub: [
      { id: 'franges', label: 'Ranges' },
      { id: 'fnumbers', label: 'SMS Numbers' },
      { id: 'req_numbers', label: 'Request Numbers' },
      { id: 'search_messages', label: 'Search messages' },
      { id: 'sms_test', label: 'SMS Test Panel' },
      { id: 'bulk_alloc', label: 'SMS Bulk Allocations' }
    ]
  },
  { id: 'bill', label: 'Billing', icon: 'bill' },
  { id: 'dev_api', label: 'Developer API', icon: 'code' },
  { id: 'simple_api', label: 'Simple API V2', icon: 'key' },
  {
    grp: 'referral_system',
    label: 'Referral System',
    icon: 'uplus',
    sub: [
      { id: 'invitations', label: 'Agent invitations' }
    ]
  },
  { id: 'chat', label: 'Chat', icon: 'chat' },
  { id: 'ann', label: 'Announcements', icon: 'ann' },
  { id: 'notifications', label: 'Notifications', icon: 'bell' },
  { id: 'download_app', label: 'Download mobile app', icon: 'dl' },
  { id: 'prof', label: 'Profile', icon: 'prof' }
];

const ADMIN_MENU = [
  { id: 'dash', label: 'Dashboard', icon: 'dash' },
  { id: 'users', label: 'Users', icon: 'users' },
  { id: 'aranges', label: 'Ranges', icon: 'sliders' },
  { id: 'anumbers', label: 'Numbers', icon: 'phone' },
  { id: 'cdr', label: 'Messages & CDR', icon: 'search' },
  { id: 'ann', label: 'Announcements', icon: 'ann' },
  { id: 'keys', label: 'API Keys', icon: 'key' },
  { id: 'audit', label: 'Audit Log', icon: 'clip' },
  { id: 'prof', label: 'Profile', icon: 'prof' }
];

const CLIENT_MENU = [
  { id: 'dash', label: 'Dashboard', icon: 'dash' },
  { id: 'fnumbers', label: 'My Numbers', icon: 'phone' },
  { id: 'cdr', label: 'CDR & Statistics', icon: 'pulse' },
  { id: 'bill', label: 'Billing', icon: 'bill' },
  { id: 'ann', label: 'Announcements', icon: 'ann' },
  { id: 'prof', label: 'Profile', icon: 'prof' }
];

function renderNav() {
  const items = ME.role === 'admin' ? ADMIN_MENU : ME.role === 'agent' ? AGENT_MENU : CLIENT_MENU;
  return items.map(item => {
    if (item.grp) {
      // Accordion dropdown item (Collapsed by default, opens only on click!)
      const isOpen = OPEN_GRPS.has(item.grp);
      const isSubActive = item.sub.some(s => s.id === PAGE);
      return `
        <div class="nav-block">
          <button type="button" class="nav-item-btn ${isOpen ? 'open' : ''} ${isSubActive ? 'act' : ''}" data-toggle-grp="${item.grp}">
            ${S(item.icon)}
            <span>${esc(item.label)}</span>
            <span class="chev">▼</span>
          </button>
          <div class="nav-sub-list ${isOpen ? 'show' : ''}">
            ${item.sub.map(s => `
              <button type="button" class="nav-sub-btn ${s.id === PAGE ? 'act' : ''}" data-go="${s.id}">
                ${esc(s.label)}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }
    // Direct link item
    const isAct = PAGE === item.id;
    return `
      <div class="nav-block">
        <button type="button" class="nav-item-btn ${isAct ? 'act' : ''}" data-go="${item.id}">
          ${S(item.icon)}
          <span>${esc(item.label)}</span>
        </button>
      </div>
    `;
  }).join('');
}

// --------------------------------------------------------------------------
// COUNTRY SELECTOR MODAL
// --------------------------------------------------------------------------
function openCountryModal() {
  const existing = $('#countryModalOverlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'countryModalOverlay';
  overlay.className = 'country-modal-overlay';
  overlay.innerHTML = `
    <div class="country-modal-card" role="dialog" aria-modal="true">
      <div class="country-modal-top">
        <h3>Select Country & Code</h3>
        <button type="button" class="country-modal-close-btn" id="countryModalClose" aria-label="Close">${S('x')}</button>
      </div>
      <div class="country-search-box">
        <input type="text" class="country-search-field" id="countrySearchInput" placeholder="Search country name or dial code..." autocomplete="off" autofocus>
      </div>
      <div class="country-scroll-list" id="countryScrollList">
        ${renderCountryList(COUNTRIES)}
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const inp = $('#countrySearchInput');
  if (inp) {
    inp.focus();
    inp.addEventListener('input', e => {
      const q = e.target.value.trim().toLowerCase();
      const filtered = COUNTRIES.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        (c.region && c.region.toLowerCase().includes(q))
      );
      const listEl = $('#countryScrollList');
      if (listEl) listEl.innerHTML = renderCountryList(filtered);
    });
  }
}

function renderCountryList(list) {
  if (!list.length) {
    return `<div style="text-align:center;padding:30px 10px;color:#94a3b8;font-size:0.9rem">No matching countries found</div>`;
  }
  return list.map(c => `
    <div class="country-item-row ${c.code === CURRENT_COUNTRY.code ? 'active' : ''}" data-country-code="${c.code}">
      <div class="c-left">
        <span class="flag">${c.flag}</span>
        <span>${esc(c.name)}</span>
      </div>
      <span class="dial-badge">${c.dial}</span>
    </div>
  `).join('');
}

function closeCountryModal() {
  const m = $('#countryModalOverlay');
  if (m) m.remove();
}

function selectCountry(code) {
  const found = COUNTRIES.find(c => c.code === code);
  if (!found) return;
  CURRENT_COUNTRY = found;

  const cBtn = $('#authCountryBtn');
  if (cBtn) {
    cBtn.innerHTML = `
      <div class="flag-name">
        <span class="flag">${found.flag}</span>
        <span>${esc(found.name)}</span>
      </div>
      <span class="arrow">▼</span>
    `;
  }
  const cInp = $('#authCountryInput');
  if (cInp) cInp.value = found.name;

  const waBtn = $('#authWaDialBtn');
  if (waBtn) {
    waBtn.innerHTML = `
      <span class="flag">${found.flag}</span>
      <span class="code">${found.dial}</span>
      <span class="arrow">▼</span>
    `;
  }
  const waDialInp = $('#authWaDialInput');
  if (waDialInp) waDialInp.value = found.dial;

  closeCountryModal();
}

// --------------------------------------------------------------------------
// AUTHENTICATION VIEW (Screenshot 1 & 2: Nexor Login & Become an Agent)
// --------------------------------------------------------------------------
function showAuth(mode) {
  if (ES) { ES.close(); ES = null; }
  const isLogin = mode === 'login';
  document.body.className = 'auth-mode';

  $('#app').innerHTML = `
    <div class="auth-view-wrap">
      <div class="auth-container">
        <!-- Center Glowing Emblem with Zero Watermark -->
        <div class="auth-logo-box">
          <img src="/logo.webp" alt="MSI SMS" class="auth-logo-img">
        </div>

        <div class="auth-header">
          <h1 class="auth-title">${isLogin ? 'MSI SMS' : 'Become an Agent'}</h1>
          <p class="auth-sub">${isLogin ? 'Please Sign in to continue' : "We'll verify and activate your account after signup."}</p>
        </div>

        ${isLogin ? `
          <!-- Login Form (Screenshot 1) -->
          <form class="auth-form" data-do="login">
            <div class="auth-field">
              <label class="auth-label">Username</label>
              <input class="auth-input" type="text" name="username" placeholder="Your username" required autocomplete="username">
            </div>

            <div class="auth-field">
              <label class="auth-label">Password</label>
              <div class="auth-pass-wrap">
                <input class="auth-input" type="password" name="password" id="loginPw" placeholder="Your password" required autocomplete="current-password">
                <button type="button" class="auth-eye-btn" data-toggle-pw="loginPw" aria-label="Toggle password visibility">${S('eye')}</button>
              </div>
            </div>

            <div class="auth-verified">
              ${S('vchk')}
              <span>Verified</span>
            </div>

            <button class="auth-submit-btn" type="submit">Sign In</button>
            <div class="msg"></div>

            <div class="auth-footer">
              <a href="#" class="auth-link" data-act="forgot_pw">Forgot your password?</a>
              <div style="color:#94a3b8;font-size:0.88rem;margin-top:2px">
                New agent? <a href="#" data-auth="register" class="auth-link"><u class="underline">Apply for an account</u></a>
              </div>
            </div>
          </form>
        ` : `
          <!-- Register / Become an Agent Form (Screenshot 2) -->
          <form class="auth-form" data-do="register">
            <div class="auth-field">
              <label class="auth-label">Full name</label>
              <input class="auth-input" type="text" name="full_name" placeholder="Your full name" required>
            </div>

            <div class="auth-field">
              <label class="auth-label">Username</label>
              <input class="auth-input" type="text" name="username" placeholder="Choose a username" required autocomplete="username">
            </div>

            <div class="auth-field">
              <label class="auth-label">Email</label>
              <input class="auth-input" type="email" name="email" placeholder="you@example.com" required autocomplete="email">
            </div>

            <!-- WhatsApp Composite Input (Flag + Dial + Local Number) -->
            <div class="auth-field">
              <label class="auth-label">WhatsApp</label>
              <div class="auth-wa-wrap">
                <button type="button" class="auth-dial-btn" id="authWaDialBtn" title="Choose country dial code">
                  <span class="flag">${CURRENT_COUNTRY.flag}</span>
                  <span class="code">${CURRENT_COUNTRY.dial}</span>
                  <span class="arrow">▼</span>
                </button>
                <input type="hidden" name="whatsapp_dial" id="authWaDialInput" value="${CURRENT_COUNTRY.dial}">
                <input class="auth-input" type="tel" name="whatsapp_num" id="authWaNumInput" placeholder="Your WhatsApp number" required>
              </div>
            </div>

            <!-- Searchable Country Field -->
            <div class="auth-field">
              <label class="auth-label">Country</label>
              <button type="button" class="auth-country-btn" id="authCountryBtn" title="Select country">
                <div class="flag-name">
                  <span class="flag">${CURRENT_COUNTRY.flag}</span>
                  <span>${esc(CURRENT_COUNTRY.name)}</span>
                </div>
                <span class="arrow">▼</span>
              </button>
              <input type="hidden" name="country" id="authCountryInput" value="${esc(CURRENT_COUNTRY.name)}">
            </div>

            <!-- Password with Eye Toggle -->
            <div class="auth-field">
              <label class="auth-label">Password</label>
              <div class="auth-pass-wrap">
                <input class="auth-input" type="password" name="password" id="regPw" placeholder="At least 8 characters" required minlength="8" autocomplete="new-password">
                <button type="button" class="auth-eye-btn" data-toggle-pw="regPw" aria-label="Toggle password visibility">${S('eye')}</button>
              </div>
            </div>

            <!-- Confirm Password with Eye Toggle -->
            <div class="auth-field">
              <label class="auth-label">Confirm password</label>
              <div class="auth-pass-wrap">
                <input class="auth-input" type="password" name="confirm" id="regConfirmPw" placeholder="Re-enter password" required minlength="8" autocomplete="new-password">
                <button type="button" class="auth-eye-btn" data-toggle-pw="regConfirmPw" aria-label="Toggle password visibility">${S('eye')}</button>
              </div>
            </div>

            <div class="auth-verified">
              ${S('vchk')}
              <span>Verified</span>
            </div>

            <button class="auth-submit-btn" type="submit">Create account</button>
            <div class="msg"></div>

            <div class="auth-footer">
              <div style="color:#94a3b8;font-size:0.88rem">
                Already have an account? <a href="#" data-auth="login" class="auth-link"><u class="underline">Sign in</u></a>
              </div>
            </div>
          </form>
        `}

        <!-- Social Action Circles (Telegram & WhatsApp) -->
        <div class="auth-social-row">
          <a class="auth-social-circle auth-social-tg" href="https://t.me/" target="_blank" rel="noopener noreferrer" title="Telegram Support">
            ${S('tg')}
          </a>
          <a class="auth-social-circle auth-social-wa" href="https://wa.me/" target="_blank" rel="noopener noreferrer" title="WhatsApp Support">
            ${S('wa')}
          </a>
        </div>
      </div>
    </div>

    <!-- Floating WhatsApp Button (Bottom-Right, Glowing Green) -->
    <a class="auth-floating-wa" href="https://wa.me/" target="_blank" rel="noopener noreferrer" title="Direct WhatsApp Chat" aria-label="WhatsApp Support">
      ${S('wa')}
    </a>
  `;
}

// --------------------------------------------------------------------------
// MAIN APPLICATION SHELL
// --------------------------------------------------------------------------
function shell() {
  document.body.className = '';
  const app = $('#app');
  app.innerHTML = `
    <header class="top">
      <button class="ib" id="menu" aria-label="Menu">${S('menu')}</button>
      <div class="ttl">
        <b id="ptitle">Dashboard</b>
        <span>${esc(ME.full_name || ME.username)} · ${cap(ME.role)} <i id="live" style="color:var(--muted);font-style:normal" title="Live connection">●</i></span>
      </div>
      <button class="ib" id="theme" aria-label="Theme">${S('sun')}</button>
      <button class="ib" data-act="logout" aria-label="Sign out">${S('out')}</button>
    </header>
    <main id="mn"></main>
    <button class="fab" id="fab" aria-label="Menu">${S('menu')}</button>
    <div class="ov" id="ov"></div>
    <aside class="side" id="side">
      <div class="brand">
        <div class="logo"><img src="/logo-sm.webp" alt="MSI SMS"></div>
        <div>
          <b>MSI SMS</b>
          <span>${cap(ME.role)}</span>
        </div>
        <button class="ib" id="close" aria-label="Close">${S('x')}</button>
      </div>
      <nav id="nv">${renderNav()}</nav>
    </aside>
  `;
}

const menu = o => document.body.classList.toggle('open', o);

async function go(p) {
  if (p) PAGE = p;
  menu(false);

  const nv = $('#nv');
  if (nv) nv.innerHTML = renderNav();

  const titleMap = {
    dash: 'Dashboard',
    clients: 'Clients',
    create_user: 'Create User',
    cdr: 'CDR & Statistics',
    franges: 'Ranges',
    fnumbers: 'SMS Numbers',
    req_numbers: 'Request Numbers',
    search_messages: 'Search Messages',
    sms_test: 'SMS Test Panel',
    bulk_alloc: 'SMS Bulk Allocations',
    bill: 'Billing',
    dev_api: 'Developer API',
    simple_api: 'Simple API V2',
    invitations: 'Agent Invitations',
    chat: 'Chat',
    ann: 'Announcements',
    notifications: 'Notifications',
    download_app: 'Download App',
    prof: 'Profile',
    users: 'Users',
    aranges: 'Ranges',
    anumbers: 'Numbers',
    keys: 'API Keys',
    audit: 'Audit Log'
  };

  const pt = $('#ptitle');
  if (pt) pt.textContent = titleMap[PAGE] || cap(PAGE);

  try {
    const fn = PG[PAGE] || PG.dash;
    const h = await fn();
    $('#mn').innerHTML = `<div class="pg on">${h}</div>`;
  } catch (e) {
    $('#mn').innerHTML = `<div class="pg on">${card('', 'Something went wrong', `<p class="muted">${esc(e.message)}</p><button class="btn" data-go="${PAGE}">Try again</button>`)}</div>`;
  }
}

const soft = () => {
  clearTimeout(soft.t);
  soft.t = setTimeout(() => {
    const a = document.activeElement;
    if (a && /INPUT|TEXTAREA|SELECT/.test(a.tagName) && $('#mn') && $('#mn').contains(a)) return;
    if (ME) go();
  }, 500);
};

function connect() {
  if (ES) ES.close();
  const sid = localStorage.getItem('msi_sid');
  ES = new EventSource('/api/events' + (sid ? '?sid=' + encodeURIComponent(sid) : ''));
  const live = o => {
    const e = $('#live');
    if (e) e.style.color = o ? '#3ddc97' : 'var(--muted)';
  };
  ES.onopen = () => live(true);
  ES.onerror = () => live(false);
  ['message', 'account', 'announcement', 'refresh'].forEach(ev =>
    ES.addEventListener(ev, e => {
      let d = {};
      try { d = JSON.parse(e.data); } catch { }
      if (d.toast || d.text) toast(d.toast || d.text);
      soft();
    })
  );
}

async function boot() {
  try {
    ME = await api('/me');
  } catch {
    ME = null;
    return showAuth('login');
  }
  shell();
  connect();
  go('dash');
}

// --------------------------------------------------------------------------
// USER ACTIONS & FORMS
// --------------------------------------------------------------------------
const picked = () => $$('.rk:checked').map(x => +x.value);

const DO = {
  async login(d) {
    ME = await api('/login', { body: d });
    if (ME && ME.sid) localStorage.setItem('msi_sid', ME.sid);
    shell();
    connect();
    go('dash');
  },

  async register(d) {
    if (d.password !== d.confirm) throw new Error('Passwords do not match');
    const waNum = (d.whatsapp_num || d.whatsapp || '').replace(/[\s\-()]/g, '');
    const dial = (d.whatsapp_dial || '+880').replace(/[\s\-()]/g, '');
    const finalWa = waNum.startsWith('+') ? waNum : (dial + waNum);
    const r = await api('/register', {
      body: {
        full_name: d.full_name,
        username: d.username,
        password: d.password,
        email: d.email,
        whatsapp: finalWa,
        country: d.country || (CURRENT_COUNTRY && CURRENT_COUNTRY.name) || 'Bangladesh'
      }
    });
    toast('Application submitted successfully!');
    setTimeout(() => showAuth('login'), 2200);
    return r.message || 'Your account has been submitted. An admin will review it and you can sign in once it is approved.';
  },

  filter(d, f) {
    FIL[f.dataset.page] = d;
    go();
  },

  async createUser(d, f) {
    await api('/admin/users', { body: d });
    f.reset();
    go('users');
    toast('User created');
  },

  async addRange(d, f) {
    await api('/admin/ranges', { body: d });
    go('aranges');
    toast('Range added');
  },

  async updRange(d) {
    await api('/admin/ranges/' + d.id, { method: 'PUT', body: d });
    go('aranges');
    toast('Range updated');
  },

  async upload(d, f) {
    const r = await api(`/admin/ranges/${d.id}/numbers`, { body: { text: d.text } });
    await go('aranges');
    toast(`Added ${r.added} numbers (${r.duplicates} already existed).`);
  },

  async addAnn(d) {
    await api('/admin/announcements', { body: d });
    go('ann');
  },

  async addKey(d) {
    const r = await api('/admin/keys', { body: d });
    await go('keys');
    toast('Key created');
    $('#mn').insertAdjacentHTML('afterbegin', `<section class="card"><div class="eyebrow">Copy it now</div><h2>New key</h2><div class="kv"><b class="mono" style="word-break:break-all">${esc(r.key)}</b></div><p class="muted">It is shown only once.</p></section>`);
  },

  async createClient(d, f) {
    await api('/clients', { body: d });
    go('clients');
    toast('Client created — they can sign in now');
  },

  async requestNums(d) {
    const r = await api('/numbers/request', { body: d });
    go('fnumbers');
    toast(`${r.allocated} number(s) added to SMS Numbers`);
  },

  async saveProfile(d) {
    await api('/me', { method: 'PUT', body: d });
    ME = await api('/me');
    return 'Saved';
  },

  async changePw(d, f) {
    if (d.password !== d.confirm) throw new Error('Passwords do not match');
    await api('/me/password', { body: { current: d.current, password: d.password } });
    f.reset();
    return 'Password changed';
  }
};

const ACT = {
  async setst(el) {
    await api(`/admin/users/${el.dataset.id}/status`, { body: { status: el.dataset.v } });
    go();
  },

  async resetpw(el) {
    const p = prompt('New password for this user (at least 8 characters):');
    if (!p) return;
    await api(`/admin/users/${el.dataset.id}/password`, { body: { password: p } });
    toast('Password changed');
  },

  async togrange(el) {
    await api('/admin/ranges/' + el.dataset.id, { method: 'PUT', body: { enabled: el.dataset.v === '1' } });
    go();
  },

  async delann(el) {
    if (confirm('Delete this announcement?')) {
      await api('/admin/announcements/' + el.dataset.id, { method: 'DELETE' });
      go();
    }
  },

  async revoke(el) {
    if (confirm('Revoke this key? The provider using it will stop working.')) {
      await api('/admin/keys/' + el.dataset.id, { method: 'DELETE' });
      go();
    }
  },

  async cst(el) {
    await api(`/clients/${el.dataset.id}/status`, { body: { status: el.dataset.v } });
    go();
  },

  async assign() {
    const ids = picked();
    if (!ids.length) return toast('Tick at least one number');
    const r = await api('/numbers/assign', { body: { ids, client_id: $('#asc').value, client_payout: $('#asp').value } });
    go();
    toast(`${r.updated} number(s) assigned`);
  },

  async unassign() {
    const ids = picked();
    if (!ids.length) return toast('Tick at least one number');
    await api('/numbers/assign', { body: { ids } });
    go();
  },

  async release() {
    const ids = picked();
    if (!ids.length) return toast('Tick at least one number');
    if (confirm(`Return ${ids.length} number(s) to stock?`)) {
      await api('/numbers/release', { body: { ids } });
      go();
    }
  },

  async regen() {
    if (confirm('The old token will stop working. Continue?')) {
      const r = await api('/me/token', { body: {} });
      go();
    }
  },

  export() {
    if (!LAST) return;
    const csv = [LAST.cols, ...LAST.rows].map(r => r.map(c => '"' + String(c ?? '').replace(/"/g, '""') + '"').join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = `msi-sms-${LAST.name}.csv`;
    a.click();
  },

  async logout() {
    await api('/logout', { body: {} }).catch(() => { });
    localStorage.removeItem('msi_sid');
    ME = null;
    showAuth('login');
  },

  forgot_pw() {
    toast('Please contact your administrator or Telegram support to reset your password.');
  }
};

// --------------------------------------------------------------------------
// EVENT LISTENERS
// --------------------------------------------------------------------------
document.addEventListener('submit', async e => {
  const f = e.target.closest('form[data-do]');
  if (!f) return;
  e.preventDefault();
  const m = f.querySelector('.msg'), b = f.querySelector('button[type=submit]');
  m.textContent = '';
  m.className = 'msg';
  if (b) b.disabled = true;
  try {
    const r = await DO[f.dataset.do](Object.fromEntries(new FormData(f)), f);
    if (r) {
      m.textContent = r;
      m.className = 'msg ok';
    }
  } catch (x) {
    m.textContent = x.message;
    m.className = 'msg er';
  } finally {
    if (b) b.disabled = false;
  }
});

document.addEventListener('click', async e => {
  // Password Show / Hide Toggle
  const eyeBtn = e.target.closest('[data-toggle-pw]');
  if (eyeBtn) {
    const inpId = eyeBtn.dataset.togglePw;
    const inp = $('#' + inpId);
    if (inp) {
      const isPw = inp.type === 'password';
      inp.type = isPw ? 'text' : 'password';
      eyeBtn.innerHTML = S(isPw ? 'eyeOff' : 'eye');
    }
    return;
  }

  // Country modal triggers & selection
  if (e.target.closest('#authCountryBtn, #authWaDialBtn')) {
    return openCountryModal();
  }
  if (e.target.closest('#countryModalClose')) {
    return closeCountryModal();
  }
  const countryRow = e.target.closest('[data-country-code]');
  if (countryRow) {
    return selectCountry(countryRow.dataset.countryCode);
  }
  if (e.target.id === 'countryModalOverlay') {
    return closeCountryModal();
  }

  // Auth screen toggle (Login <-> Register)
  const a = e.target.closest('[data-auth]');
  if (a) return showAuth(a.dataset.auth);

  // Exclusive Accordion in Sidebar: opening one collapses any other open group
  const tg = e.target.closest('[data-toggle-grp]');
  if (tg) {
    const grp = tg.dataset.toggleGrp;
    if (OPEN_GRPS.has(grp)) {
      OPEN_GRPS.delete(grp);
    } else {
      OPEN_GRPS.clear();
      OPEN_GRPS.add(grp);
    }
    const nv = $('#nv');
    if (nv) nv.innerHTML = renderNav();
    return;
  }

  // Navigation Click
  const g = e.target.closest('[data-go]');
  if (g) return go(g.dataset.go);

  if (e.target.closest('#menu,#fab')) return menu(true);
  if (e.target.closest('#close,#ov')) return menu(false);

  if (e.target.closest('#theme')) {
    const d = document.documentElement;
    d.dataset.theme = (d.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark' ? 'light' : 'dark';
    return;
  }

  const el = e.target.closest('[data-act]');
  if (!el) return;
  try {
    await ACT[el.dataset.act](el);
  } catch (x) {
    const m = $('#amsg');
    if (m && /assign|release/.test(el.dataset.act)) {
      m.textContent = x.message;
      m.className = 'msg er';
    } else toast(x.message);
  }
});

document.addEventListener('change', e => {
  if (e.target.id === 'ca') $$('.rk').forEach(c => c.checked = e.target.checked);
  if (e.target.matches('input[type=file][data-fill]')) {
    const fl = e.target.files[0];
    if (!fl) return;
    const rd = new FileReader();
    rd.onload = () => {
      const t = e.target.closest('form').querySelector(`[name=${e.target.dataset.fill}]`);
      t.value = String(rd.result).slice(0, 4e6);
    };
    rd.readAsText(fl);
  }
});

// Boot the application
boot();
