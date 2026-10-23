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
const $ = s => document.querySelector(s), $$ = s => Array.from(document.querySelectorAll(s));
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
  { name: 'Afghanistan', code: 'AF', dial: '+93', flag: '🇦🇫', region: 'Asia' },
  { name: 'Albania', code: 'AL', dial: '+355', flag: '🇦🇱', region: 'Europe' },
  { name: 'Algeria', code: 'DZ', dial: '+213', flag: '🇩🇿', region: 'Africa' },
  { name: 'Andorra', code: 'AD', dial: '+376', flag: '🇦🇩', region: 'Europe' },
  { name: 'Angola', code: 'AO', dial: '+244', flag: '🇦🇴', region: 'Africa' },
  { name: 'Argentina', code: 'AR', dial: '+54', flag: '🇦🇷', region: 'Americas' },
  { name: 'Armenia', code: 'AM', dial: '+374', flag: '🇦🇲', region: 'Asia' },
  { name: 'Australia', code: 'AU', dial: '+61', flag: '🇦🇺', region: 'Oceania' },
  { name: 'Austria', code: 'AT', dial: '+43', flag: '🇦🇹', region: 'Europe' },
  { name: 'Azerbaijan', code: 'AZ', dial: '+994', flag: '🇦🇿', region: 'Asia' },
  { name: 'Bahamas', code: 'BS', dial: '+1242', flag: '🇧🇸', region: 'Americas' },
  { name: 'Bahrain', code: 'BH', dial: '+973', flag: '🇧🇭', region: 'Middle East' },
  { name: 'Barbados', code: 'BB', dial: '+1246', flag: '🇧🇧', region: 'Americas' },
  { name: 'Belarus', code: 'BY', dial: '+375', flag: '🇧🇾', region: 'Europe' },
  { name: 'Belgium', code: 'BE', dial: '+32', flag: '🇧🇪', region: 'Europe' },
  { name: 'Belize', code: 'BZ', dial: '+501', flag: '🇧🇿', region: 'Americas' },
  { name: 'Benin', code: 'BJ', dial: '+229', flag: '🇧🇯', region: 'Africa' },
  { name: 'Bhutan', code: 'BT', dial: '+975', flag: '🇧🇹', region: 'Asia' },
  { name: 'Bolivia', code: 'BO', dial: '+591', flag: '🇧🇴', region: 'Americas' },
  { name: 'Bosnia and Herzegovina', code: 'BA', dial: '+387', flag: '🇧🇦', region: 'Europe' },
  { name: 'Botswana', code: 'BW', dial: '+267', flag: '🇧🇼', region: 'Africa' },
  { name: 'Brazil', code: 'BR', dial: '+55', flag: '🇧🇷', region: 'Americas' },
  { name: 'Brunei', code: 'BN', dial: '+673', flag: '🇧🇳', region: 'Asia' },
  { name: 'Bulgaria', code: 'BG', dial: '+359', flag: '🇧🇬', region: 'Europe' },
  { name: 'Burkina Faso', code: 'BF', dial: '+226', flag: '🇧🇫', region: 'Africa' },
  { name: 'Burundi', code: 'BI', dial: '+257', flag: '🇧🇮', region: 'Africa' },
  { name: 'Cambodia', code: 'KH', dial: '+855', flag: '🇰🇭', region: 'Asia' },
  { name: 'Cameroon', code: 'CM', dial: '+237', flag: '🇨🇲', region: 'Africa' },
  { name: 'Canada', code: 'CA', dial: '+1', flag: '🇨🇦', region: 'Americas' },
  { name: 'Chile', code: 'CL', dial: '+56', flag: '🇨🇱', region: 'Americas' },
  { name: 'China', code: 'CN', dial: '+86', flag: '🇨🇳', region: 'Asia' },
  { name: 'Colombia', code: 'CO', dial: '+57', flag: '🇨🇴', region: 'Americas' },
  { name: 'Costa Rica', code: 'CR', dial: '+506', flag: '🇨🇷', region: 'Americas' },
  { name: 'Croatia', code: 'HR', dial: '+385', flag: '🇭🇷', region: 'Europe' },
  { name: 'Cuba', code: 'CU', dial: '+53', flag: '🇨🇺', region: 'Americas' },
  { name: 'Cyprus', code: 'CY', dial: '+357', flag: '🇨🇾', region: 'Europe' },
  { name: 'Czechia', code: 'CZ', dial: '+420', flag: '🇨🇿', region: 'Europe' },
  { name: 'Denmark', code: 'DK', dial: '+45', flag: '🇩🇰', region: 'Europe' },
  { name: 'Djibouti', code: 'DJ', dial: '+253', flag: '🇩🇯', region: 'Africa' },
  { name: 'Dominican Republic', code: 'DO', dial: '+1809', flag: '🇩🇴', region: 'Americas' },
  { name: 'Ecuador', code: 'EC', dial: '+593', flag: '🇪🇨', region: 'Americas' },
  { name: 'Egypt', code: 'EG', dial: '+20', flag: '🇪🇬', region: 'Africa' },
  { name: 'El Salvador', code: 'SV', dial: '+503', flag: '🇸🇻', region: 'Americas' },
  { name: 'Estonia', code: 'EE', dial: '+372', flag: '🇪🇪', region: 'Europe' },
  { name: 'Ethiopia', code: 'ET', dial: '+251', flag: '🇪🇹', region: 'Africa' },
  { name: 'Fiji', code: 'FJ', dial: '+679', flag: '🇫🇯', region: 'Oceania' },
  { name: 'Finland', code: 'FI', dial: '+358', flag: '🇫🇮', region: 'Europe' },
  { name: 'France', code: 'FR', dial: '+33', flag: '🇫🇷', region: 'Europe' },
  { name: 'Georgia', code: 'GE', dial: '+995', flag: '🇬🇪', region: 'Asia' },
  { name: 'Germany', code: 'DE', dial: '+49', flag: '🇩🇪', region: 'Europe' },
  { name: 'Ghana', code: 'GH', dial: '+233', flag: '🇬🇭', region: 'Africa' },
  { name: 'Greece', code: 'GR', dial: '+30', flag: '🇬🇷', region: 'Europe' },
  { name: 'Guatemala', code: 'GT', dial: '+502', flag: '🇬🇹', region: 'Americas' },
  { name: 'Guinea', code: 'GN', dial: '+224', flag: '🇬🇳', region: 'Africa' },
  { name: 'Guyana', code: 'GY', dial: '+592', flag: '🇬🇾', region: 'Americas' },
  { name: 'Haiti', code: 'HT', dial: '+509', flag: '🇭🇹', region: 'Americas' },
  { name: 'Honduras', code: 'HN', dial: '+504', flag: '🇭🇳', region: 'Americas' },
  { name: 'Hong Kong', code: 'HK', dial: '+852', flag: '🇭🇰', region: 'Asia' },
  { name: 'Hungary', code: 'HU', dial: '+36', flag: '🇭🇺', region: 'Europe' },
  { name: 'Iceland', code: 'IS', dial: '+354', flag: '🇮🇸', region: 'Europe' },
  { name: 'India', code: 'IN', dial: '+91', flag: '🇮🇳', region: 'Asia' },
  { name: 'Indonesia', code: 'ID', dial: '+62', flag: '🇮🇩', region: 'Asia' },
  { name: 'Iran', code: 'IR', dial: '+98', flag: '🇮🇷', region: 'Middle East' },
  { name: 'Iraq', code: 'IQ', dial: '+964', flag: '🇮🇶', region: 'Middle East' },
  { name: 'Ireland', code: 'IE', dial: '+353', flag: '🇮🇪', region: 'Europe' },
  { name: 'Israel', code: 'IL', dial: '+972', flag: '🇮🇱', region: 'Middle East' },
  { name: 'Italy', code: 'IT', dial: '+39', flag: '🇮🇹', region: 'Europe' },
  { name: 'Ivory Coast', code: 'CI', dial: '+225', flag: '🇨🇮', region: 'Africa' },
  { name: 'Jamaica', code: 'JM', dial: '+1876', flag: '🇯🇲', region: 'Americas' },
  { name: 'Japan', code: 'JP', dial: '+81', flag: '🇯🇵', region: 'Asia' },
  { name: 'Jordan', code: 'JO', dial: '+962', flag: '🇯🇴', region: 'Middle East' },
  { name: 'Kazakhstan', code: 'KZ', dial: '+7', flag: '🇰🇿', region: 'Asia' },
  { name: 'Kenya', code: 'KE', dial: '+254', flag: '🇰🇪', region: 'Africa' },
  { name: 'Kuwait', code: 'KW', dial: '+965', flag: '🇰🇼', region: 'Middle East' },
  { name: 'Kyrgyzstan', code: 'KG', dial: '+996', flag: '🇰🇬', region: 'Asia' },
  { name: 'Laos', code: 'LA', dial: '+856', flag: '🇱🇦', region: 'Asia' },
  { name: 'Latvia', code: 'LV', dial: '+371', flag: '🇱🇻', region: 'Europe' },
  { name: 'Lebanon', code: 'LB', dial: '+961', flag: '🇱🇧', region: 'Middle East' },
  { name: 'Liberia', code: 'LR', dial: '+231', flag: '🇱🇷', region: 'Africa' },
  { name: 'Libya', code: 'LY', dial: '+218', flag: '🇱🇾', region: 'Africa' },
  { name: 'Liechtenstein', code: 'LI', dial: '+423', flag: '🇱🇮', region: 'Europe' },
  { name: 'Lithuania', code: 'LT', dial: '+370', flag: '🇱🇹', region: 'Europe' },
  { name: 'Luxembourg', code: 'LU', dial: '+352', flag: '🇱🇺', region: 'Europe' },
  { name: 'Macao', code: 'MO', dial: '+853', flag: '🇲🇴', region: 'Asia' },
  { name: 'Madagascar', code: 'MG', dial: '+261', flag: '🇲🇬', region: 'Africa' },
  { name: 'Malawi', code: 'MW', dial: '+265', flag: '🇲🇼', region: 'Africa' },
  { name: 'Malaysia', code: 'MY', dial: '+60', flag: '🇲🇾', region: 'Asia' },
  { name: 'Maldives', code: 'MV', dial: '+960', flag: '🇲🇻', region: 'Asia' },
  { name: 'Mali', code: 'ML', dial: '+223', flag: '🇲🇱', region: 'Africa' },
  { name: 'Malta', code: 'MT', dial: '+356', flag: '🇲🇹', region: 'Europe' },
  { name: 'Mauritania', code: 'MR', dial: '+222', flag: '🇲🇷', region: 'Africa' },
  { name: 'Mauritius', code: 'MU', dial: '+230', flag: '🇲🇺', region: 'Africa' },
  { name: 'Mexico', code: 'MX', dial: '+52', flag: '🇲🇽', region: 'Americas' },
  { name: 'Moldova', code: 'MD', dial: '+373', flag: '🇲🇩', region: 'Europe' },
  { name: 'Monaco', code: 'MC', dial: '+377', flag: '🇲🇨', region: 'Europe' },
  { name: 'Mongolia', code: 'MN', dial: '+976', flag: '🇲🇳', region: 'Asia' },
  { name: 'Montenegro', code: 'ME', dial: '+382', flag: '🇲🇪', region: 'Europe' },
  { name: 'Morocco', code: 'MA', dial: '+212', flag: '🇲🇦', region: 'Africa' },
  { name: 'Mozambique', code: 'MZ', dial: '+258', flag: '🇲🇿', region: 'Africa' },
  { name: 'Myanmar', code: 'MM', dial: '+95', flag: '🇲🇲', region: 'Asia' },
  { name: 'Namibia', code: 'NA', dial: '+264', flag: '🇳🇦', region: 'Africa' },
  { name: 'Nepal', code: 'NP', dial: '+977', flag: '🇳🇵', region: 'Asia' },
  { name: 'Netherlands', code: 'NL', dial: '+31', flag: '🇳🇱', region: 'Europe' },
  { name: 'New Zealand', code: 'NZ', dial: '+64', flag: '🇳🇿', region: 'Oceania' },
  { name: 'Nicaragua', code: 'NI', dial: '+505', flag: '🇳🇮', region: 'Americas' },
  { name: 'Niger', code: 'NE', dial: '+227', flag: '🇳🇪', region: 'Africa' },
  { name: 'Nigeria', code: 'NG', dial: '+234', flag: '🇳🇬', region: 'Africa' },
  { name: 'North Macedonia', code: 'MK', dial: '+389', flag: '🇲🇰', region: 'Europe' },
  { name: 'Norway', code: 'NO', dial: '+47', flag: '🇳🇴', region: 'Europe' },
  { name: 'Oman', code: 'OM', dial: '+968', flag: '🇴🇲', region: 'Middle East' },
  { name: 'Pakistan', code: 'PK', dial: '+92', flag: '🇵🇰', region: 'Asia' },
  { name: 'Palestine', code: 'PS', dial: '+970', flag: '🇵🇸', region: 'Middle East' },
  { name: 'Panama', code: 'PA', dial: '+507', flag: '🇵🇦', region: 'Americas' },
  { name: 'Paraguay', code: 'PY', dial: '+595', flag: '🇵🇾', region: 'Americas' },
  { name: 'Peru', code: 'PE', dial: '+51', flag: '🇵🇪', region: 'Americas' },
  { name: 'Philippines', code: 'PH', dial: '+63', flag: '🇵🇭', region: 'Asia' },
  { name: 'Poland', code: 'PL', dial: '+48', flag: '🇵🇱', region: 'Europe' },
  { name: 'Portugal', code: 'PT', dial: '+351', flag: '🇵🇹', region: 'Europe' },
  { name: 'Qatar', code: 'QA', dial: '+974', flag: '🇶🇦', region: 'Middle East' },
  { name: 'Romania', code: 'RO', dial: '+40', flag: '🇷🇴', region: 'Europe' },
  { name: 'Russia', code: 'RU', dial: '+7', flag: '🇷🇺', region: 'Europe' },
  { name: 'Rwanda', code: 'RW', dial: '+250', flag: '🇷🇼', region: 'Africa' },
  { name: 'Saudi Arabia', code: 'SA', dial: '+966', flag: '🇸🇦', region: 'Middle East' },
  { name: 'Senegal', code: 'SN', dial: '+221', flag: '🇸🇳', region: 'Africa' },
  { name: 'Serbia', code: 'RS', dial: '+381', flag: '🇷🇸', region: 'Europe' },
  { name: 'Singapore', code: 'SG', dial: '+65', flag: '🇸🇬', region: 'Asia' },
  { name: 'Slovakia', code: 'SK', dial: '+421', flag: '🇸🇰', region: 'Europe' },
  { name: 'Slovenia', code: 'SI', dial: '+386', flag: '🇸🇮', region: 'Europe' },
  { name: 'Somalia', code: 'SO', dial: '+252', flag: '🇸🇴', region: 'Africa' },
  { name: 'South Africa', code: 'ZA', dial: '+27', flag: '🇿🇦', region: 'Africa' },
  { name: 'South Korea', code: 'KR', dial: '+82', flag: '🇰🇷', region: 'Asia' },
  { name: 'Spain', code: 'ES', dial: '+34', flag: '🇪🇸', region: 'Europe' },
  { name: 'Sri Lanka', code: 'LK', dial: '+94', flag: '🇱🇰', region: 'Asia' },
  { name: 'Sudan', code: 'SD', dial: '+249', flag: '🇸🇩', region: 'Africa' },
  { name: 'Suriname', code: 'SR', dial: '+597', flag: '🇸🇷', region: 'Americas' },
  { name: 'Sweden', code: 'SE', dial: '+46', flag: '🇸🇪', region: 'Europe' },
  { name: 'Switzerland', code: 'CH', dial: '+41', flag: '🇨🇭', region: 'Europe' },
  { name: 'Syria', code: 'SY', dial: '+963', flag: '🇸🇾', region: 'Middle East' },
  { name: 'Taiwan', code: 'TW', dial: '+886', flag: '🇹🇼', region: 'Asia' },
  { name: 'Tajikistan', code: 'TJ', dial: '+992', flag: '🇹🇯', region: 'Asia' },
  { name: 'Tanzania', code: 'TZ', dial: '+255', flag: '🇹🇿', region: 'Africa' },
  { name: 'Thailand', code: 'TH', dial: '+66', flag: '🇹🇭', region: 'Asia' },
  { name: 'Timor-Leste', code: 'TL', dial: '+670', flag: '🇹🇱', region: 'Asia' },
  { name: 'Togo', code: 'TG', dial: '+228', flag: '🇹🇬', region: 'Africa' },
  { name: 'Trinidad and Tobago', code: 'TT', dial: '+1868', flag: '🇹🇹', region: 'Americas' },
  { name: 'Tunisia', code: 'TN', dial: '+216', flag: '🇹🇳', region: 'Africa' },
  { name: 'Turkey', code: 'TR', dial: '+90', flag: '🇹🇷', region: 'Middle East' },
  { name: 'Turkmenistan', code: 'TM', dial: '+993', flag: '🇹🇲', region: 'Asia' },
  { name: 'Uganda', code: 'UG', dial: '+256', flag: '🇺🇬', region: 'Africa' },
  { name: 'Ukraine', code: 'UA', dial: '+380', flag: '🇺🇦', region: 'Europe' },
  { name: 'United Arab Emirates', code: 'AE', dial: '+971', flag: '🇦🇪', region: 'Middle East' },
  { name: 'United Kingdom', code: 'GB', dial: '+44', flag: '🇬🇧', region: 'Europe' },
  { name: 'United States', code: 'US', dial: '+1', flag: '🇺🇸', region: 'Americas' },
  { name: 'Uruguay', code: 'UY', dial: '+598', flag: '🇺🇾', region: 'Americas' },
  { name: 'Uzbekistan', code: 'UZ', dial: '+998', flag: '🇺🇿', region: 'Asia' },
  { name: 'Venezuela', code: 'VE', dial: '+58', flag: '🇻🇪', region: 'Americas' },
  { name: 'Vietnam', code: 'VN', dial: '+84', flag: '🇻🇳', region: 'Asia' },
  { name: 'Yemen', code: 'YE', dial: '+967', flag: '🇾🇪', region: 'Middle East' },
  { name: 'Zambia', code: 'ZM', dial: '+260', flag: '🇿🇲', region: 'Africa' },
  { name: 'Zimbabwe', code: 'ZW', dial: '+263', flag: '🇿🇼', region: 'Africa' }
];

let CURRENT_COUNTRY = COUNTRIES[0]; // Bangladesh default

// --------------------------------------------------------------------------
// API & NETWORK CLIENT
// --------------------------------------------------------------------------
async function api(p, o = {}) {
  const sid = localStorage.getItem('msi_sid');
  const headers = { 'Content-Type': 'application/json', 'X-Requested-With': 'msi' };
  if (sid) headers['X-Session-ID'] = sid;
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
const F = (l, n, t = 'text', o = {}) => `<div class="f"><label>${l}</label>${t === 'select' ? `<div class="sel"><select name="${n}">${(Array.isArray(o.opts) ? o.opts : []).map(x => { const [v, lb] = Array.isArray(x) ? x : [x, x]; return `<option value="${esc(v)}"${String(o.val ?? '') === String(v) ? ' selected' : ''}>${esc(lb)}</option>`; }).join('')}</select></div>` : t === 'area' ? `<textarea name="${n}" style="height:120px" placeholder="${esc(o.ph || '')}">${esc(o.val || '')}</textarea>` : `<input name="${n}" type="${t}" value="${esc(o.val ?? '')}" placeholder="${esc(o.ph || '')}"${o.req ? ' required' : ''}${t === 'password' ? ' autocomplete="new-password"' : ''}${o.step ? ` step="${o.step}"` : ''}${o.min !== undefined ? ` min="${o.min}"` : ''}>`}</div>`;
const card = (eb, t, inner, right = '') => `<section class="card"><div class="hr"><div>${eb ? `<div class="eyebrow">${eb}</div>` : ''}<h2>${t}</h2></div>${right}</div>${inner}</section>`;
const tbl = (cols, rows, empty) => `<div class="dw box"><table style="min-width:${(Array.isArray(cols) ? cols.length : 1) * 120}px"><thead><tr>${(Array.isArray(cols) ? cols : []).map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${(Array.isArray(rows) && rows.length) ? rows.map(r => `<tr>${(Array.isArray(r) ? r : []).map(c => `<td>${c}</td>`).join('')}</tr>`).join('') : `<tr><td colspan="${Array.isArray(cols) ? cols.length : 1}" class="muted">${empty}</td></tr>`}</tbody></table></div>`;
const form = (act, fields, btn, extra = '') => `<form class="af" data-do="${act}">${fields}${extra}<button class="btn g wide" type="submit">${btn}</button><div class="msg"></div></form>`;
const badge = s => `<span class="badg" style="${s === 'active' || s === 'approved' ? '' : s === 'pending' ? 'background:rgba(234,179,8,0.18);color:#facc15' : 'background:rgba(255,255,255,.08);color:var(--muted)'}">${esc(s)}</span>`;
const sm = (act, id, label, v = '') => `<button class="sm" data-act="${act}" data-id="${id}" data-v="${esc(v)}">${label}</button>`;
const filt = (page, fields) => `<form class="af" data-do="filter" data-page="${page}">${fields}<button class="btn g wide" type="submit"><u>${S('search')}</u>Search</button></form>`;
const rangeOpts = async (all = true) => { const r = await api('/range-names').catch(() => []); const list = Array.isArray(r) ? r : []; const opts = all ? [['', 'All ranges']] : []; list.forEach(x => opts.push([x.id, x.name])); return opts; };

// --------------------------------------------------------------------------
// PAGES IMPLEMENTATIONS
// --------------------------------------------------------------------------
const PG = {
  async dash() {
    const s = await api('/stats').catch(() => ({ sms: {}, series: [] }));
    const rawSeries = Array.isArray(s.series) ? s.series : [];
    const mx = rawSeries.reduce((m, x) => Math.max(m, x.n || 0), 1);
    const isAdminUser = ME.role === 'admin' || (ME.username && ME.username.toLowerCase() === 'xzrmunna12061') || ME.is_admin_eligible;

    if (isAdminUser && ME.role === 'admin') {
      return `<section class="card hero">
        <div>
          <div class="eyebrow">MSI SMS PORTAL</div>
          <h1 style="margin:4px 0 6px">${esc(ME.full_name || ME.username)}</h1>
          <p class="muted" style="margin:0">Admin Dashboard · Real-time system monitoring</p>
        </div>
      </section>`
      + card('Overview', 'System Metrics', `<div class="stats">
        <div class="stat"><small>Active Agent Panels</small><strong>${esc(s.tenants_count || s.agents || 0)}</strong></div>
        <div class="stat"><small>Active Sessions</small><strong>${esc(s.active_sessions || 1)}</strong></div>
        <div class="stat"><small>Number Requests Pending</small><strong style="${s.pending_requests ? 'color:#facc15' : ''}">${esc(s.pending_requests || 0)}</strong></div>
        <div class="stat"><small>Free Numbers Stock</small><strong>${esc(s.free || 0)}</strong></div>
        <div class="stat"><small>Allocated Numbers</small><strong>${esc(s.allocated || 0)}</strong></div>
        <div class="stat"><small>Real-time SMS Today</small><strong style="color:var(--green)">${esc(s.sms?.today || 0)}</strong></div>
        <div class="stat"><small>SMS This Month</small><strong>${esc(s.sms?.month || 0)}</strong></div>
        <div class="stat"><small>SMS All Time</small><strong>${esc(s.sms?.all || 0)}</strong></div>
      </div>`)
      + card('Traffic Volume', 'SMS Activity Last 7 Days', `<div class="chart">${rawSeries.map(x => `<div class="bar"><em>${x.n}</em><div style="height:${Math.max(x.n / mx * 100, 3)}%"></div>${String(x.day || '').slice(5)}</div>`).join('')}</div>`);
    }

    // Agent Dashboard view
    const kp = [
      ['Today SMS', s.sms?.today || 0],
      ['This Week SMS', s.sms?.week || 0],
      ['This Month SMS', s.sms?.month || 0],
      ['All Time SMS', s.sms?.all || 0],
      ['Balance (USD)', fm(s.balance || 0)],
      ['My numbers', s.numbers || 0],
      ['Clients', s.clients || 0]
    ];
    return `<section class="card hero">
      <div>
        <div class="eyebrow">AGENT DASHBOARD</div>
        <h1 style="margin:4px 0">${esc(ME.full_name || ME.username)}</h1>
        <p class="muted" style="margin:0">Signed in as <span class="mono">${esc(ME.username)}</span></p>
      </div>
    </section>`
    + card('Overview', 'Overview', `<div class="stats">${kp.map(([l, v]) => `<div class="stat"><small>${l}</small><strong>${esc(v)}</strong></div>`).join('')}</div>`)
    + card('SMS Activity', 'SMS Last 7 Days', `<div class="chart">${rawSeries.map(x => `<div class="bar"><em>${x.n}</em><div style="height:${Math.max(x.n / mx * 100, 3)}%"></div>${String(x.day || '').slice(5)}</div>`).join('')}</div>`);
  },

  // ----- Multi-Tenant & Admin Views
  async tenants() {
    const rawList = await api('/admin/tenants').catch(() => []);
    const list = Array.isArray(rawList) ? rawList : [];
    const rawAgents = await api('/admin/users?role=agent').catch(() => []);
    const agents = Array.isArray(rawAgents) ? rawAgents : [];
    const agentOpts = agents.map(a => [a.username, `${a.username} (${a.full_name || 'Agent'})`]);
    
    return card('Multi-Tenant Architecture', 'Agent Panels', `<p class="muted" style="margin:0 0 14px">Manage multi-tenant agent portals, custom domains, base URLs and webhooks.</p>`
      + tbl(['Tenant Name', 'Tenant ID', 'Agent Username', 'Base URL', 'Webhook URL', 'API Key', 'Status', 'Actions'], list.map(t => [
        `<b>${esc(t.name)}</b>`,
        `<span class="mono">${esc(t.tenant_id)}</span>`,
        esc(t.agent_username),
        `<span class="mono">${esc(t.base_url || 'Default')}</span>`,
        `<span class="mono" style="max-width:180px;display:block;overflow:hidden;text-overflow:ellipsis">${esc(t.webhook_url || 'None')}</span>`,
        `<span class="mono" style="font-size:0.8rem">${esc(t.api_key ? t.api_key.slice(0, 12) + '...' : 'None')}</span>`,
        badge(t.status || 'active'),
        `${sm('regenTenantKey', t.id, 'Regen Key')} ${sm('deleteTenant', t.id, 'Delete')}`
      ]), 'No agent panels configured yet.'))
      + card('Multi-Tenant Architecture', 'Create New Agent Panel Tenant', form('createTenant',
        F('Tenant Panel Name', 'name', 'text', { req: 1, ph: 'e.g. Alpha Agent Portal' }) +
        F('Assigned Agent Username', 'agent_username', 'select', { opts: agentOpts.length ? agentOpts : [['', 'No agents registered yet']] }) +
        F('Custom Base URL (Optional)', 'base_url', 'text', { ph: 'https://agent1.msisms.com' }) +
        F('Webhook URL (Optional)', 'webhook_url', 'text', { ph: 'https://agent1.msisms.com/api/webhook' }) +
        F('Auto Approve Limit per Request', 'auto_approve_limit', 'number', { val: 50, min: 0 }),
        'Create Agent Panel'
      ));
  },

  async num_requests() {
    const rawReqs = await api('/admin/number-requests').catch(() => []);
    const reqs = Array.isArray(rawReqs) ? rawReqs : [];
    const aiSets = await api('/admin/ai-settings').catch(() => ({}));
    const autoApprove = aiSets.auto_approve_requests;

    return card('Number Allocation Queue', 'Number Requests', `<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:14px">
        <p class="muted" style="margin:0">Review manual or automated agent number requests.</p>
        <button class="btn sm" data-act="toggleAutoApprove" data-v="${autoApprove ? '0' : '1'}" style="padding:6px 14px;font-size:0.85rem">
          ${autoApprove ? '⚡ Auto-Approve: ON' : '🔒 Auto-Approve: OFF (Manual Review)'}
        </button>
      </div>`
      + tbl(['Requested At', 'Agent', 'Range', 'Quantity', 'Status', 'Reason / Note', 'Actions'], reqs.map(r => [
        ft(r.created_at),
        `<b>${esc(r.agent_username)}</b>`,
        esc(r.range_name),
        `<b class="mono" style="font-size:1.1rem">${r.quantity}</b>`,
        badge(r.status),
        esc(r.reason || 'Standard allocation'),
        r.status === 'pending'
          ? `${sm('approveRequest', r.id, 'Approve')} ${sm('rejectRequest', r.id, 'Reject')}`
          : `<span class="muted">${esc(r.processed_by || 'system')}</span>`
      ]), 'No pending or past number requests found.'))
  },

  async sessions() {
    const rawSess = await api('/admin/sessions').catch(() => []);
    const sess = Array.isArray(rawSess) ? rawSess : [];
    return card('Security & Access Control', 'Active User Sessions', `<p class="muted" style="margin:0 0 14px">Manage active user sign-ins and instantly revoke suspicious or expired sessions.</p>`
      + tbl(['Username', 'Role', 'IP Address', 'User Agent / Device', 'Created At', 'Actions'], sess.map(s => [
        `<b>${esc(s.username)}</b>`,
        badge(s.role),
        `<span class="mono">${esc(s.ip || '127.0.0.1')}</span>`,
        `<span style="max-width:240px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${esc(s.user_agent)}">${esc(s.user_agent || 'Browser Session')}</span>`,
        ft(s.created_at),
        sm('revokeSession', s.token, 'Revoke Session')
      ]), 'No active sessions recorded.'))
  },

  async ai_ops() {
    const s = await api('/admin/ai-settings').catch(() => ({}));
    const isAway = s.admin_availability === 'away';
    
    return card('AI System & Availability', 'Admin Auto-Pilot & Gemini Settings', `
      <div class="note" style="margin-bottom:20px">
        <div style="font-size:1.5rem">🤖</div>
        <div>
          <b style="color:var(--text)">Gemini AI Auto-Pilot Engine (Powered by gemini-3.8-flash)</b>
          <p class="muted" style="margin:4px 0 0;font-size:0.9rem">When status is set to "Away", the AI automatically handles agent inquiries, range allocations info, and support questions in real time.</p>
        </div>
      </div>
      `
      + form('saveAiSettings',
        F('Admin Availability Mode', 'admin_availability', 'select', {
          opts: [
            ['online', '🟢 Online (Manual Admin Control)'],
            ['away', '🌙 Away (Gemini AI Auto-Pilot Active)']
          ],
          val: s.admin_availability
        }) +
        F('Auto Approve Requests Mode', 'auto_approve_requests', 'select', {
          opts: [
            [1, 'Instant Auto-Approve Agent Number Requests'],
            [0, 'Manual Review for All Number Requests']
          ],
          val: s.auto_approve_requests ? 1 : 0
        }) +
        F('Custom AI System Instructions / Agent Knowledge', 'custom_ai_instructions', 'area', {
          val: s.custom_ai_instructions,
          ph: 'Custom instructions for Gemini AI when answering support questions...'
        }),
        'Save AI System Settings'
      )
    );
  },

  async my_requests() {
    const rawReqs = await api('/agent/number-requests').catch(() => []);
    const reqs = Array.isArray(rawReqs) ? rawReqs : [];
    return card('SMS Module', 'My Number Requests', `<p class="muted" style="margin:0 0 14px">Track your number allocation requests and statuses.</p>`
      + tbl(['Requested At', 'Range Name', 'Quantity', 'Status', 'Note / Reason'], reqs.map(r => [
        ft(r.created_at),
        esc(r.range_name),
        `<b class="mono">${r.quantity}</b>`,
        badge(r.status),
        esc(r.reason || 'Standard allocation request')
      ]), 'You have not submitted any number requests yet.')
      + `<div style="margin-top:16px"><button class="btn g" data-go="req_numbers">Request More Numbers</button></div>`);
  },

  async tenant_cfg() {
    const t = await api('/agent/tenant').catch(() => ({}));
    return card('Multi-Tenant Configuration', 'Tenant Panel Credentials', `
      <div class="kv"><small>Tenant Name</small><b>${esc(t.name || 'MSI Agent Panel')}</b></div>
      <div class="kv"><small>Tenant ID</small><span class="mono">${esc(t.tenant_id || 'panel_' + ME.username)}</span></div>
      <div class="kv"><small>Dedicated API Key</small><b class="mono" style="font-size:1rem;word-break:break-all">${esc(t.api_key || 'Not generated')}</b></div>
      ` + form('saveAgentTenant',
        F('Custom Base URL', 'base_url', 'text', { val: t.base_url, ph: 'https://agent.yourdomain.com' }) +
        F('Webhook Endpoint URL', 'webhook_url', 'text', { val: t.webhook_url, ph: 'https://agent.yourdomain.com/api/webhook' }),
        'Update Webhook & Domain'
      )
      + `<button class="btn" data-act="regenMyTenantKey" style="margin-top:10px">Regenerate Tenant API Key</button>`
    );
  },

  // ----- Standard admin
  async users() {
    const f = FIL.users || {}, rawRows = await api('/admin/users?' + new URLSearchParams(f)).catch(() => []);
    const rows = Array.isArray(rawRows) ? rawRows : [];
    const acts = u => [u.status !== 'active' ? sm('setst', u.id, u.status === 'pending' ? 'Approve' : 'Activate', 'active') : '', u.status === 'pending' ? sm('setst', u.id, 'Reject', 'rejected') : '', u.status === 'active' && u.id !== ME.id ? sm('setst', u.id, 'Suspend', 'suspended') : '', sm('resetpw', u.id, 'Reset password')].join(' ');
    return card('User Management', 'Users', filt('users', F('Role', 'role', 'select', { opts: [['', 'All roles'], 'admin', 'agent', 'client'], val: f.role }) + F('Status', 'status', 'select', { opts: [['', 'All statuses'], 'pending', 'active', 'suspended', 'rejected'], val: f.status }) + F('Search', 'q', 'text', { val: f.q, ph: 'Username, name or email' }))
      + tbl(['User', 'Name', 'Role', 'Status', 'Contact', 'Agent', 'Numbers', 'Last login', 'Actions'], rows.map(u => [esc(u.username), esc(u.full_name), esc(u.role), badge(u.status), esc([u.email, u.whatsapp].filter(Boolean).join(' · ')), esc(u.parent || '—'), u.nums, ft(u.last_login), acts(u)]), 'No users found.'))
      + card('Accounts', 'Create User', form('createUser', F('Username', 'username', 'text', { req: 1 }) + F('Password', 'password', 'password', { req: 1 }) + F('Full name', 'full_name') + F('Email', 'email', 'email') + F('WhatsApp', 'whatsapp') + F('Country', 'country') + F('Role', 'role', 'select', { opts: ['agent', 'client', 'admin'] }) + F('Agent username (only for clients)', 'agent'), 'Create user'));
  },

  async aranges() {
    const rawRs = await api('/admin/ranges').catch(() => []);
    const rs = Array.isArray(rawRs) ? rawRs : [];
    const opts = rs.map(r => [r.id, r.name]);
    return card('Inventory', 'Ranges', tbl(['Range', 'Country', 'Prefix', 'Supported Traffic / Services', 'Agent payout', 'Daily limit', 'Free', 'Allocated', 'Status', ''], rs.map(r => [
      `<b>${esc(r.name)}</b>`,
      esc(r.country || '—'),
      esc(r.prefix || '—'),
      `<span class="badg" style="background:rgba(96,165,250,0.15);color:#60a5fa">${esc(r.services || 'WhatsApp, Telegram, TikTok, IMO')}</span>`,
      fm(r.agent_payout),
      r.daily_limit || 'No limit',
      r.free,
      r.allocated,
      badge(r.enabled ? 'active' : 'disabled'),
      sm('togrange', r.id, r.enabled ? 'Disable' : 'Enable', r.enabled ? '0' : '1')
    ]), 'No ranges yet. Add your first range below.'))
      + card('Inventory', 'Add New Range', form('addRange',
        F('Range name', 'name', 'text', { req: 1, ph: 'e.g. BD Grameenphone 017 Traffic Range' }) +
        F('Country', 'country', 'text', { ph: 'e.g. Bangladesh' }) +
        F('Prefix', 'prefix', 'text', { ph: 'e.g. 88017' }) +
        F('Supported Services / App Traffic', 'services', 'text', { val: 'WhatsApp, Telegram, TikTok, IMO, Facebook, Google', ph: 'Comma separated apps/traffic tags' }) +
        F('Agent payout per SMS (USD)', 'agent_payout', 'number', { step: '0.000001', min: 0, val: 0 }) +
        F('Daily limit per agent (0 = no limit)', 'daily_limit', 'number', { min: 0, val: 0 }),
        'Add range'
      ))
      + (rs.length ? card('Pricing', 'Update Payout, Services & Limit', form('updRange',
        F('Range', 'id', 'select', { opts }) +
        F('Supported Services / App Traffic', 'services', 'text', { ph: 'e.g. WhatsApp, Telegram, TikTok, IMO' }) +
        F('New agent payout per SMS (USD)', 'agent_payout', 'number', { step: '0.000001', min: 0 }) +
        F('New daily limit per agent', 'daily_limit', 'number', { min: 0 }),
        'Save changes'
      ))
        + card('Inventory', 'Upload Numbers (TXT / CSV)', form('upload',
          F('Range', 'id', 'select', { opts }) +
          `<div class="f"><label>Select Number File (.txt or .csv)</label><input type="file" data-fill="text" accept=".txt,.csv,text/plain,text/csv"></div>` +
          F('Or paste numbers (one number per line or separated by commas)', 'text', 'area', { ph: '8801700000001\n8801700000002\n8801700000003' }),
          'Upload & Save Numbers'
        )) : '');
  },

  async anumbers() {
    const f = FIL.anumbers || {}, r = await api('/admin/numbers?' + new URLSearchParams(f)).catch(() => ({ rows: [], total: 0 })), ro = await rangeOpts();
    const rows = Array.isArray(r.rows) ? r.rows : [];
    LAST = { name: 'numbers', cols: ['Number', 'Range', 'Status', 'Agent', 'Client'], rows: rows.map(x => [x.msisdn, x.range, x.status, x.agent || '', x.client || '']) };
    return card('Inventory', 'Numbers Inventory', filt('anumbers', F('Range', 'range', 'select', { opts: ro, val: f.range }) + F('Status', 'status', 'select', { opts: [['', 'All'], 'free', 'allocated'], val: f.status }) + F('Agent username', 'agent', 'text', { val: f.agent }) + F('Number', 'q', 'text', { val: f.q }))
      + `<button class="btn wide" data-act="export" style="margin-top:10px"><u>${S('exp')}</u>Export CSV</button><p class="muted">Showing ${rows.length} of ${r.total || 0}</p>` + tbl(['Number', 'Range', 'Status', 'Agent', 'Client', 'Last SMS'], rows.map(x => [esc(x.msisdn), esc(x.range), badge(x.status === 'free' ? 'free' : 'active'), esc(x.agent || '—'), esc(x.client || '—'), ft(x.last_sms)]), 'No numbers found.'));
  },

  async keys() {
    const rawKs = await api('/admin/keys').catch(() => []);
    const ks = Array.isArray(rawKs) ? rawKs : [];
    return card('Providers', 'API Keys for Incoming SMS', `<p class="muted" style="margin:0 0 14px">Give a key to the system that delivers SMS to you. It sends each message to this address:</p><div class="kv"><small>POST</small><b class="mono" style="font-size:1rem;word-break:break-all">${esc(location.origin)}/api/ingest</b></div><div class="kv"><small>Header</small><span class="mono">X-API-Key: your key</span></div><div class="kv"><small>Body (JSON, one message or {"messages":[…]})</small><span class="mono">{"number":"8801700000001","cli":"SENDER","text":"message","ts":1700000000000}</span></div>`)
      + card('Providers', 'Keys', tbl(['Name', 'Created', 'Status', ''], ks.map(k => [esc(k.name), ft(k.created_at), badge(k.revoked ? 'revoked' : 'active'), k.revoked ? '' : sm('revoke', k.id, 'Revoke')]), 'No keys yet.'))
      + card('Providers', 'Create Key', form('addKey', F('Key name', 'name', 'text', { req: 1, ph: 'e.g. provider name' }), 'Create key'));
  },

  async audit() {
    const rawR = await api('/admin/audit').catch(() => []);
    const r = Array.isArray(rawR) ? rawR : [];
    return card('Security', 'Audit Log', tbl(['Time', 'Who', 'Action', 'Details', 'IP'], r.map(x => [ft(x.ts), esc(x.actor || '—'), esc(x.action), esc(x.detail), esc(x.ip)]), 'Nothing recorded yet.'));
  },

  // ----- Agent views
  async clients() {
    const rawCs = await api('/clients').catch(() => []);
    const cs = Array.isArray(rawCs) ? rawCs : [];
    return card('Users Master', 'Clients', tbl(['Username', 'Name', 'Contact', 'Numbers', 'Status', 'Last login', ''], cs.map(c => [esc(c.username), esc(c.full_name), esc([c.email, c.whatsapp].filter(Boolean).join(' · ')), c.numbers, badge(c.status), ft(c.last_login), sm('cst', c.id, c.status === 'active' ? 'Suspend' : 'Activate', c.status === 'active' ? 'suspended' : 'active')]), 'No clients yet.'))
      + card('Users Master', 'Create Client', `<p class="muted" style="margin:0 0 14px">The client can sign in straight away with this username and password.</p>` + form('createClient', F('Username', 'username', 'text', { req: 1 }) + F('Password', 'password', 'password', { req: 1 }) + F('Full name', 'full_name') + F('Email', 'email', 'email') + F('WhatsApp', 'whatsapp') + F('Country', 'country'), 'Create client'));
  },

  async create_user() {
    return card('Users Master', 'Create New User / Client', `<p class="muted" style="margin:0 0 14px">Create a client account directly. The user can log in immediately with their credentials.</p>` + form('createClient', F('Username', 'username', 'text', { req: 1 }) + F('Password', 'password', 'password', { req: 1 }) + F('Full name', 'full_name') + F('Email', 'email', 'email') + F('WhatsApp', 'whatsapp') + F('Country', 'country'), 'Create Client'));
  },

  async franges() {
    const rawRs = await api('/ranges').catch(() => []);
    const rs = Array.isArray(rawRs) ? rawRs : [];
    const f = FIL.franges || {};
    const searchQ = (f.q || '').toLowerCase();
    const filtered = rs.filter(r => {
      if (!searchQ) return true;
      return (r.name || '').toLowerCase().includes(searchQ) ||
             (r.services || '').toLowerCase().includes(searchQ) ||
             (r.country || '').toLowerCase().includes(searchQ) ||
             (r.prefix || '').includes(searchQ);
    });

    return card('SMS Module', 'SMS Ranges & Search Traffic', `<p class="muted" style="margin:0 0 12px">Search active SMS ranges by name, country prefix, or supported service traffic (WhatsApp, Telegram, TikTok, IMO, etc.).</p>`
      + filt('franges', F('Search Ranges / Traffic Tag', 'q', 'text', { val: f.q, ph: 'Search e.g. WhatsApp, Telegram, TikTok, IMO...' }))
      + tbl(['Range Name', 'Country / Prefix', 'Supported Service Traffic', 'Your Payout', 'Free Numbers Stock', 'Daily Limit Left'], filtered.map(r => [
        `<b>${esc(r.name)}</b>`,
        esc([r.country, r.prefix].filter(Boolean).join(' · ') || 'Global'),
        `<span class="badg" style="background:rgba(124,58,237,0.18);color:#a78bfa">${esc(r.services || 'WhatsApp, Telegram, TikTok, IMO')}</span>`,
        fm(r.agent_payout),
        `<b style="color:var(--green)">${r.free} free</b>`,
        r.daily_limit ? Math.max(0, r.daily_limit - r.used) : 'Unlimited'
      ]), 'No matching ranges found.'))
      + (rs.length ? card('SMS Module', 'Request Numbers from Selected Range', `<p class="muted" style="margin:0 0 14px">Choose a range and request a batch of numbers (minimum/maximum 500 numbers per request batch). Allocated numbers appear instantly under My Numbers.</p>`
        + form('requestNums',
          F('Select Active Range', 'range_id', 'select', { opts: rs.map(r => [r.id, `${r.name} (${r.free} free · ${r.services || 'WhatsApp, Telegram, TikTok'})`]) }) +
          F('Quantity (500 numbers batch)', 'qty', 'number', { min: 1, max: 500, val: 500, req: 1 }) +
          F('Note / Purpose (Optional)', 'notes', 'text', { ph: 'e.g. Traffic request for WhatsApp / TikTok' }),
          'Request 500 Numbers Batch'
        )) : '');
  },

  async fnumbers() {
    const f = FIL.fnumbers || {}, isA = ME.role === 'agent', r = await api('/numbers?' + new URLSearchParams(f)).catch(() => ({ rows: [], total: 0 })), ro = await rangeOpts(), rawCs = isA ? await api('/clients').catch(() => []) : [];
    const rowsList = Array.isArray(r.rows) ? r.rows : [];
    const cs = Array.isArray(rawCs) ? rawCs : [];
    LAST = { name: 'my-numbers', cols: ['Number', 'Range', 'Client'], rows: rowsList.map(x => [x.msisdn, x.range, x.client || '']) };
    const head = isA ? ['<input type="checkbox" class="ck" id="ca" aria-label="Select all">', 'Phone Number (MSISDN)', 'Range Name', 'Client', 'Your Payout', 'Client Payout', 'Last SMS / OTP Received'] : ['Phone Number', 'Range Name', 'Payout', 'Last SMS'];
    const rows = rowsList.map(x => isA ? [`<input type="checkbox" class="ck rk" value="${x.id}">`, `<b class="mono" style="font-size:1.05rem">${esc(x.msisdn)}</b>`, esc(x.range), esc(x.client || '—'), fm(x.agent_payout), x.client ? fm(x.client_payout) : '—', ft(x.last_sms)] : [`<b class="mono">${esc(x.msisdn)}</b>`, esc(x.range), fm(x.client_payout), ft(x.last_sms)]);
    return card('SMS Module', 'My Numbers (মাই নাম্বার)', filt('fnumbers', F('Range', 'range', 'select', { opts: ro, val: f.range }) + (isA ? F('Assignment', 'status', 'select', { opts: [['', 'All Numbers'], ['unassigned', 'Not assigned to a client'], ['assigned', 'Assigned to a client']], val: f.status }) : '') + F('Search Phone Number or Traffic Service', 'q', 'text', { val: f.q, ph: 'Type phone number...' }))
      + `<button class="btn wide" data-act="export" style="margin-top:10px"><u>${S('exp')}</u>Export CSV</button><p class="muted">Showing ${rowsList.length} of ${r.total || 0}</p>` + tbl(head, rows, 'No numbers allocated yet. Go to Request Numbers to add numbers.'))
      + (isA && rowsList.length ? card('SMS Module', 'Assign or Release Selected Numbers', `<p class="muted" style="margin:0 0 14px">Tick numbers above, then choose what to do.</p><div class="f"><label>Client</label><div class="sel"><select id="asc">${cs.map(c => `<option value="${c.id}">${esc(c.username)}</option>`).join('') || '<option value="">Create a client first</option>'}</select></div></div><div class="f"><label>Client payout per SMS (USD)</label><input id="asp" type="number" step="0.000001" min="0" value="0"></div><div class="acts"><button class="btn g" data-act="assign">Assign to client</button><button class="btn" data-act="unassign">Remove client</button><button class="btn" data-act="release">Return to stock</button></div><div class="msg" id="amsg"></div>`) : '');
  },

  async req_numbers() {
    const rawRs = await api('/ranges').catch(() => []);
    const rs = Array.isArray(rawRs) ? rawRs : [];
    return card('SMS Module', 'Request Numbers from Ranges (500 Batch)', `<p class="muted" style="margin:0 0 14px">Select an active range and request allocation (minimum/maximum 500 numbers per request batch). Numbers are instantly attached to your agent account and visible under My Numbers.</p>`
      + (rs.length ? form('requestNums',
        F('Select Range', 'range_id', 'select', { opts: rs.map(r => [r.id, `${r.name} (${r.free} available · ${r.services || 'WhatsApp, Telegram, TikTok, IMO'})`]) }) +
        F('Quantity (500 numbers batch)', 'qty', 'number', { min: 1, max: 500, val: 500, req: 1 }) +
        F('Request Note / Reason (Optional)', 'notes', 'text', { ph: 'e.g. Allocation for WhatsApp & Telegram traffic' }),
        'Request 500 Numbers Batch Now'
      ) : '<div class="empty"><p>No active ranges available at this moment.</p></div>'));
  },

  async search_messages() {
    return PG.cdr();
  },

  async sms_test() {
    const myNums = await api('/numbers').catch(() => ({ rows: [] }));
    const rawFeed = await api('/live-test-feed').catch(() => []);
    const numRows = Array.isArray(myNums?.rows) ? myNums.rows : [];
    const liveFeed = Array.isArray(rawFeed) ? rawFeed : [];
    const numOpts = numRows.map(n => [n.msisdn, `${n.msisdn} (${n.range})`]);
    
    return card('Real-Time Testing', '⚡ Send Real Live Test SMS', `
      <p class="muted" style="margin:0 0 16px">Inject a real test message into the system to verify instant WebSocket/SSE delivery and live feed update.</p>
      ` + form('sendTestSms',
        (numOpts.length
          ? F('Select Target Phone Number from Inventory', 'msisdn', 'select', { opts: numOpts })
          : F('Target Phone Number (MSISDN)', 'msisdn', 'text', { req: 1, ph: 'e.g. 8801700000001' })
        ) +
        F('Sender CLI / Alphabetic Sender ID', 'cli', 'text', { val: 'MSI_TEST', req: 1 }) +
        F('Test SMS Message Body', 'body', 'area', { val: 'Your MSI SMS live verification code is ' + Math.floor(100000 + Math.random() * 900000) }),
        '⚡ Inject Live Test SMS Now'
      ))
      + card('Strictly Live Data', 'Live Ingest Stream Feed', `
        ${tbl(['Date / Time', 'Target MSISDN', 'Sender CLI', 'Live Message Body', 'Range'], liveFeed.map(m => [
          ft(m.ts),
          `<b class="mono">${esc(m.msisdn)}</b>`,
          `<span class="badg">${esc(m.cli)}</span>`,
          `<span style="white-space:normal;display:block;max-width:320px">${esc(m.body)}</span>`,
          esc(m.range_name || 'Direct')
        ]), 'No live test messages received yet. Submit the form above to test instantly!')}
      `);
  },

  async bulk_alloc() {
    return PG.fnumbers();
  },

  async cdr() {
    const f = FIL.cdr || {}, qs = new URLSearchParams(), ro = await rangeOpts(), adm = ME.role === 'admin' || (ME.username && ME.username.toLowerCase() === 'xzrmunna12061') || ME.is_admin_eligible;
    if (f.from) qs.set('from', Date.parse(f.from + 'T00:00:00Z')); if (f.to) qs.set('to', Date.parse(f.to + 'T23:59:59.999Z'));
    ['range', 'number', 'cli', 'text', 'group', 'agent'].forEach(k => f[k] && qs.set(k, f[k]));
    const r = await api('/cdr?' + qs).catch(() => ({ rows: [], total: 0, amt: 0 }));
    const g = r.group;
    const rowsList = Array.isArray(r.rows) ? r.rows : [];
    const cols = g
      ? [cap(g), 'SMS', 'Payout']
      : (adm
          ? ['Date', 'Range', 'Number', 'CLI', 'Message', 'Agent', 'Payout']
          : ['Date', 'Range', 'Number', 'CLI', 'Message', 'Payout']);
    const rows = g ? rowsList.map(x => [esc(x.g || '—'), x.sms, fm(x.amt)]) : rowsList.map(x => {
      const row = [ft(x.ts), esc(x.range || '—'), esc(x.msisdn), esc(x.cli), esc(x.body)];
      if (adm) row.push(esc(x.agent || '—'));
      row.push(fm(x.amt));
      return row;
    });
    const lastRows = g ? rowsList.map(x => [x.g, x.sms, fm(x.amt)]) : rowsList.map(x => {
      const row = [ft(x.ts), x.range || '', x.msisdn, x.cli, x.body];
      if (adm) row.push(x.agent || '');
      row.push(fm(x.amt));
      return row;
    });
    LAST = { name: 'cdr', cols, rows: lastRows };
    return card(adm ? 'Messages' : 'CDR & Statistics', adm ? 'Messages & CDR' : 'CDR Records', filt('cdr', F('Date from', 'from', 'date', { val: f.from }) + F('Date to', 'to', 'date', { val: f.to }) + F('Range', 'range', 'select', { opts: ro, val: f.range }) + (adm ? F('Agent username', 'agent', 'text', { val: f.agent }) : '') + F('Number', 'number', 'text', { val: f.number }) + F('CLI', 'cli', 'text', { val: f.cli }) + F('Message text', 'text', 'text', { val: f.text }) + F('Group by', 'group', 'select', { opts: [['', 'No grouping'], ['date', 'Date'], ['hour', 'Hour'], ['range', 'Range'], ['number', 'Number'], ['cli', 'CLI']], val: f.group }))
      + `<button class="btn wide" data-act="export" style="margin-top:10px"><u>${S('exp')}</u>Export CSV</button><div class="gt"><b>Grand total</b><div><small>Total SMS</small><strong>${r.total || 0}</strong></div><div><small>Payout</small><strong>${fm(r.amt || 0)}</strong></div></div>` + tbl(cols, rows, 'No records found.'));
  },

  async bill() {
    const l = await api('/ledger').catch(() => ({ balance: 0, rows: [] }));
    const wData = await api('/withdrawals').catch(() => ({ balance: 0, rows: [] }));
    const rowsList = Array.isArray(l.rows) ? l.rows : [];
    const wRows = Array.isArray(wData.rows) ? wData.rows : [];

    const payoutOpts = [
      ['USDT_BEP20', '⚡ USDT (BEP20 / BNB Chain - Ultra Low Fee)'],
      ['USDT_TRC20', '⚡ USDT (TRC20 / TRON - Low Fee)'],
      ['USDT_POLYGON', '⚡ USDT (Polygon MATIC - Low Fee)'],
      ['TRX', '⚡ TRX (Tron Native - Ultra Low Fee)'],
      ['LTC', '⚡ LTC (Litecoin - Low Fee)'],
      ['BKASH', '🇧🇩 bKash (Personal / Agent - BD)'],
      ['NAGAD', '🇧🇩 Nagad (Personal / Agent - BD)'],
      ['WISE', '🌐 Wise / International Wire'],
      ['PERFECT_MONEY', '💳 Perfect Money / Payeer']
    ];

    return card('Financial Account', 'Billing & Balance', `
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px">
        <div>
          <div class="muted">Available Earnings Balance</div>
          <div class="bn" style="color:var(--green);margin:2px 0">USD ${fm(l.balance || 0)}</div>
        </div>
      </div>
    `)
    + card('Payout & Withdrawal', 'Request Earnings Withdrawal', `<p class="muted" style="margin:0 0 14px">Withdraw your accumulated earnings to low-fee crypto networks (Binance / BEP20 / TRC20 / Polygon) or local mobile wallet.</p>`
      + form('requestWithdrawal',
        F('Payout Amount (USD)', 'amount', 'number', { step: '0.0001', min: '0.0001', val: (l.balance / 1e6).toFixed(4), req: 1 }) +
        F('Low-Fee Payment / Crypto Network', 'method', 'select', { opts: payoutOpts }) +
        F('Wallet Address / Account Number', 'address', 'text', { req: 1, ph: 'Enter your Binance / TRC20 / BEP20 address or Mobile number' }) +
        F('Withdrawal Note / Memo (Optional)', 'notes', 'text', { ph: 'e.g. Binance Pay ID or account note' }),
        'Submit Withdrawal Request'
      )
    )
    + card('Payout History', 'Your Withdrawal Requests', tbl(['Request Date', 'Method / Network', 'Payout Address', 'Amount (USD)', 'Status', 'Notes'], wRows.map(w => [
      ft(w.created_at),
      `<b style="color:var(--blue)">${esc(w.method)}</b>`,
      `<span class="mono" style="font-size:0.88rem">${esc(w.address)}</span>`,
      `<b class="mono" style="font-size:1.05rem">$${fm(w.amount)}</b>`,
      badge(w.status),
      esc(w.notes || '—')
    ]), 'No withdrawal requests submitted yet.'))
    + card('Account Movement', 'Ledger Records', tbl(['Date', 'Type', 'Reference', 'Amount (USD)'], rowsList.map(x => [ft(x.ts), esc(x.kind), esc(x.ref), (x.amount < 0 ? '-' : '+') + fm(Math.abs(x.amount))]), 'No ledger entries yet.'));
  },

  async admin_withdrawals() {
    const rawReqs = await api('/admin/withdrawals').catch(() => []);
    const reqs = Array.isArray(rawReqs) ? rawReqs : [];
    return card('Financial Operations', 'Agent Withdrawal Requests', `<p class="muted" style="margin:0 0 14px">Process low-fee crypto and local agent payout requests.</p>`
      + tbl(['Request Date', 'Agent Username', 'Method / Network', 'Payout Address / Account', 'Amount (USD)', 'Status', 'Actions'], reqs.map(w => [
        ft(w.created_at),
        `<b>${esc(w.username)}</b> (${esc(w.whatsapp || 'No WA')})`,
        `<b style="color:var(--blue)">${esc(w.method)}</b>`,
        `<span class="mono" style="font-size:0.88rem;word-break:break-all">${esc(w.address)}</span>`,
        `<b class="mono" style="font-size:1.1rem;color:var(--green)">$${fm(w.amount)}</b>`,
        badge(w.status),
        w.status === 'pending'
          ? `${sm('approveWithdrawal', w.id, 'Approve & Pay')} ${sm('rejectWithdrawal', w.id, 'Reject & Refund')}`
          : `<span class="muted">${esc(w.processed_by || 'system')} (${esc(w.notes || '')})</span>`
      ]), 'No pending or past withdrawal requests.'));
  },

  async dev_api() {
    const m = await api('/me').catch(() => ({}));
    return card('Developer tools', 'Agent API', `<p class="muted" style="margin:0 0 16px">Securely connect your systems to your MSI SMS agent account.</p>
      <div class="sc"><small>API Status</small><b>Ready</b></div>
      <div class="kv"><small>API Key</small><b class="mono" style="font-size:1rem;word-break:break-all">${esc(m.api_token || 'bsa_live_' + ME.username)}</b></div>
      <div class="kv"><small>Webhook Endpoint</small><span class="mono">${esc(location.origin)}/api/v2/cdr?token=${esc(m.api_token)}</span></div>
      <div class="kv"><small>Allowed scopes</small><span class="badg">Ranges: read</span> <span class="badg">Numbers: read</span> <span class="badg">Clients: read</span> <span class="badg">CDR: read</span> <span class="badg">Billing: read</span></div>
      <button class="btn" data-act="regen" style="margin-top:10px">Regenerate Key</button>`);
  },

  async simple_api() {
    const m = await api('/me').catch(() => ({}));
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
    const isAdminUser = ME.role === 'admin' || (ME.username && ME.username.toLowerCase() === 'xzrmunna12061') || ME.is_admin_eligible;
    const rawChats = isAdminUser ? await api('/admin/support/chats').catch(() => []) : await api('/support/messages').catch(() => []);
    const chats = Array.isArray(rawChats) ? rawChats : [];

    return card('Support Operations', isAdminUser ? 'Agent Support Inbox' : 'Live Agent Support', `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
        <small class="muted">Real-time synchronized chat</small>
      </div>
      <div class="chat" style="min-height:360px;max-height:480px;overflow-y:auto;padding-right:6px">
        ${chats.length ? chats.map(c => `
          <div class="cm2" style="margin-left:${c.sender_role === 'agent' && !isAdminUser ? 'auto' : c.sender_role === 'admin' && isAdminUser ? 'auto' : '0'};background:${c.sender_role === 'ai' ? 'rgba(124,58,237,0.12)' : 'var(--inner)'};border-color:${c.sender_role === 'ai' ? '#7c3aed' : 'var(--line)'}">
            <div class="w">
              <b>${esc(c.sender_username)} ${c.sender_role === 'ai' ? '🤖 (Gemini AI)' : c.sender_role === 'admin' ? '🛡️ (Admin)' : '👤 (Agent)'}</b>
              <small>${ft(c.created_at)}</small>
            </div>
            <p style="margin:0;white-space:pre-wrap">${esc(c.message)}</p>
          </div>
        `).join('') : '<p class="muted" style="text-align:center;padding:40px 0">No support messages yet. Type your question below.</p>'}
      </div>
      ` + form('sendSupportMsg',
        F('Your Message', 'message', 'text', { req: 1, ph: 'Ask a question or request assistance...' }),
        'Send Message'
      )
    );
  },

  async ann() {
    const rawA = await api('/announcements').catch(() => []);
    const a = Array.isArray(rawA) ? rawA : [];
    const adm = ME.role === 'admin' || (ME.username && ME.username.toLowerCase() === 'xzrmunna12061') || ME.is_admin_eligible;
    const cols = adm ? ['Date', 'Title', 'Message', ''] : ['Date', 'Title', 'Message'];
    const annRows = a.map(x => {
      const row = [ft(x.ts), `<b>${esc(x.title)}</b>`, `<span style="white-space:normal;display:block;min-width:240px">${esc(x.body)}</span>`];
      if (adm) row.push(sm('delann', x.id, 'Delete'));
      return row;
    });
    return card('Announcements', adm ? 'Announcements' : 'Latest Announcements', tbl(cols, annRows, 'No announcements yet.'))
      + (adm ? card('Announcements', 'New Announcement', form('addAnn', F('Title', 'title', 'text', { req: 1 }) + F('Message', 'body', 'area') + F('Expires on (optional)', 'expires', 'date'), 'Publish to everyone')) : '');
  },

  async notifications() {
    return card('Notifications', 'System Notifications', `<div class="nc un"><div class="ic2">${S('bell')}</div><h3><span>Account Security</span><span class="nw">System</span></h3><p>Your session is active and verified.</p><div class="mt"><small>Just now</small></div></div>`);
  },

  async download_app() {
    return card('Mobile App', 'Download MSI SMS Mobile App', `<div class="dl"><div class="a"><div class="tile">${S('mob')}</div><h2>Get MSI SMS for Android</h2><p class="muted">Track live SMS, client payouts, balance and notifications on the go.</p><button class="btn g wide" onclick="toast('Downloading MSI SMS APK...');">Download Android APK (v2.4)</button></div><div class="b"><h3>Installation steps</h3><ol><li>Click Download button</li><li>Open downloaded APK on your mobile</li><li>Enable "Install from Unknown Sources" if prompted</li><li>Sign in with your agent username and password</li></ol></div></div>`);
  },

  async prof() {
    const m = await api('/me').catch(() => ({}));
    return card('Account Profile', esc(m.full_name || m.username), `<p class="muted" style="margin:0 0 8px">Signed in as <b>${esc(m.username)}</b> · ${cap(m.role || '')}</p>` + form('saveProfile', F('Full name', 'full_name', 'text', { val: m.full_name }) + F('Email', 'email', 'email', { val: m.email }) + F('WhatsApp', 'whatsapp', 'text', { val: m.whatsapp }) + F('Country', 'country', 'text', { val: m.country }), 'Save changes'))
      + card('Security', 'Change Password', form('changePw', F('Current password', 'current', 'password', { req: 1 }) + F('New password', 'password', 'password', { req: 1 }) + F('Confirm new password', 'confirm', 'password', { req: 1 }), 'Change password'))
      + (m.api_token ? card('Developer', 'Your API Token', `<p class="muted" style="margin:0 0 12px">Keep it private. Anyone with this token can read your SMS records.</p><div class="tkb"><div class="t mono" id="tok">${esc(m.api_token)}</div></div><div class="kv" style="margin-top:12px"><small>CDR API</small><span class="mono" style="word-break:break-all">${esc(location.origin)}/api/v2/cdr?token=${esc(m.api_token)}&amp;records=100</span></div><p class="muted">Optional: dt1, dt2 (UTC dates), filternum, filtercli.</p><button class="btn" data-act="regen">Generate a new token</button>`) : '');
  }
};

// --------------------------------------------------------------------------
// SIDEBAR MENU DEFINITION
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
      { id: 'my_requests', label: 'My Requests' },
      { id: 'search_messages', label: 'Search messages' },
      { id: 'sms_test', label: '⚡ Live Test SMS' },
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
  { id: 'chat', label: 'Chat Support', icon: 'chat' },
  { id: 'ann', label: 'Announcements', icon: 'ann' },
  { id: 'notifications', label: 'Notifications', icon: 'bell' },
  { id: 'download_app', label: 'Download mobile app', icon: 'dl' },
  { id: 'prof', label: 'Profile', icon: 'prof' }
];

const ADMIN_MENU = [
  { id: 'dash', label: 'Dashboard', icon: 'dash' },
  { id: 'tenants', label: 'Agent Panels', icon: 'globe' },
  { id: 'num_requests', label: 'Number Requests', icon: 'phone' },
  { id: 'admin_withdrawals', label: 'Withdrawal Requests', icon: 'bill' },
  { id: 'sessions', label: 'Active Sessions', icon: 'key' },
  { id: 'ai_ops', label: 'AI Settings', icon: 'pulse' },
  { id: 'users', label: 'Users', icon: 'users' },
  { id: 'aranges', label: 'Ranges', icon: 'sliders' },
  { id: 'anumbers', label: 'Numbers', icon: 'phone' },
  { id: 'cdr', label: 'Messages & CDR', icon: 'search' },
  { id: 'keys', label: 'API Keys', icon: 'key' },
  { id: 'ann', label: 'Announcements', icon: 'ann' },
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
  let items = [];
  const isXzrmunna = ME && ME.username && ME.username.toLowerCase() === 'xzrmunna12061';
  const isAdminEligible = ME && (ME.role === 'admin' || ME.is_admin_eligible || isXzrmunna);

  if (ME.role === 'admin') {
    items = Array.from(ADMIN_MENU);
  } else if (ME.role === 'client') {
    items = Array.from(CLIENT_MENU);
  } else {
    items = Array.from(AGENT_MENU);
    if (isAdminEligible) {
      items.push({
        grp: 'admin_panel',
        label: 'Admin',
        icon: 'globe',
        sub: [
          { id: 'tenants', label: 'Agent Panels' },
          { id: 'num_requests', label: 'Number Requests' },
          { id: 'admin_withdrawals', label: 'Withdrawal Requests' },
          { id: 'sessions', label: 'Active Sessions' },
          { id: 'ai_ops', label: 'AI Settings' },
          { id: 'users', label: 'Manage Users' },
          { id: 'aranges', label: 'Manage Ranges' },
          { id: 'anumbers', label: 'Manage Numbers' },
          { id: 'keys', label: 'API Keys' },
          { id: 'audit', label: 'Audit Log' }
        ]
      });
    }
  }

  return (Array.isArray(items) ? items : []).map(item => {
    if (item.grp) {
      const isOpen = OPEN_GRPS.has(item.grp);
      const isSubActive = Array.isArray(item.sub) && item.sub.some(s => s.id === PAGE);
      return `
        <div class="nav-block">
          <button type="button" class="nav-item-btn ${isOpen ? 'open' : ''} ${isSubActive ? 'act' : ''}" data-toggle-grp="${item.grp}">
            ${S(item.icon)}
            <span>${esc(item.label)}</span>
            <span class="chev">▼</span>
          </button>
          <div class="nav-sub-list ${isOpen ? 'show' : ''}">
            ${(Array.isArray(item.sub) ? item.sub : []).map(s => `
              <button type="button" class="nav-sub-btn ${s.id === PAGE ? 'act' : ''}" data-go="${s.id}">
                ${esc(s.label)}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }
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
  if (!Array.isArray(list) || !list.length) {
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
// AUTHENTICATION VIEW
// --------------------------------------------------------------------------
function showAuth(mode, stepData) {
  if (ES) { ES.close(); ES = null; }
  const isLogin = mode === 'login';
  const isForgot = mode === 'forgot';
  document.body.className = 'auth-mode';

  $('#app').innerHTML = `
    <div class="auth-view-wrap">
      <div class="auth-container">
        <!-- Center Glowing Emblem -->
        <div class="auth-logo-box">
          <img src="/logo.webp" alt="MSI SMS" class="auth-logo-img">
        </div>

        <div class="auth-header">
          <h1 class="auth-title">${isLogin ? 'MSI SMS' : isForgot ? 'Reset Password' : 'Become an Agent'}</h1>
          <p class="auth-sub">${isLogin ? 'Please Sign in to continue' : isForgot ? 'Verify via WhatsApp OTP to reset your password' : "We'll verify and activate your account after signup."}</p>
        </div>

        ${isLogin ? `
          <!-- Login Form -->
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
        ` : isForgot ? `
          <!-- Forgot Password Flow -->
          ${!stepData ? `
            <form class="auth-form" data-do="forgot_password">
              <div class="auth-field">
                <label class="auth-label">Username or Registered WhatsApp Number</label>
                <input class="auth-input" type="text" name="account" placeholder="Enter your username or WhatsApp" required>
              </div>
              <button class="auth-submit-btn" type="submit">Send WhatsApp OTP Code</button>
              <div class="msg"></div>
              <div class="auth-footer">
                <a href="#" data-auth="login" class="auth-link">Back to Sign In</a>
              </div>
            </form>
          ` : stepData.step === 'otp' ? `
            <form class="auth-form" data-do="verify_reset_otp">
              <input type="hidden" name="username" value="${esc(stepData.username)}">
              <p class="muted" style="font-size:0.9rem;margin:0 0 10px">${esc(stepData.message)}</p>
              <div class="auth-field">
                <label class="auth-label">Enter 6-Digit WhatsApp OTP Code</label>
                <input class="auth-input mono" type="text" name="otp" placeholder="123456" maxlength="6" required autofocus style="letter-spacing:0.3em;font-size:1.3rem;text-align:center">
              </div>
              <button class="auth-submit-btn" type="submit">Verify OTP Code</button>
              <div class="msg"></div>
              <div class="auth-footer">
                <a href="#" data-auth="forgot" class="auth-link">Request new code</a>
              </div>
            </form>
          ` : `
            <form class="auth-form" data-do="reset_password">
              <input type="hidden" name="reset_token" value="${esc(stepData.reset_token)}">
              <div class="auth-field">
                <label class="auth-label">New Password</label>
                <div class="auth-pass-wrap">
                  <input class="auth-input" type="password" name="password" id="resetNewPw" placeholder="At least 8 characters" required minlength="8">
                  <button type="button" class="auth-eye-btn" data-toggle-pw="resetNewPw" aria-label="Toggle password visibility">${S('eye')}</button>
                </div>
              </div>
              <div class="auth-field">
                <label class="auth-label">Confirm New Password</label>
                <div class="auth-pass-wrap">
                  <input class="auth-input" type="password" name="confirm" id="resetConfPw" placeholder="Re-enter new password" required minlength="8">
                  <button type="button" class="auth-eye-btn" data-toggle-pw="resetConfPw" aria-label="Toggle password visibility">${S('eye')}</button>
                </div>
              </div>
              <button class="auth-submit-btn" type="submit">Set New Password & Sign In</button>
              <div class="msg"></div>
            </form>
          `}
        ` : `
          <!-- Register / Become an Agent Form -->
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

            <!-- WhatsApp Composite Input -->
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

        <!-- Social Action Circles -->
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

    <!-- Floating WhatsApp Button -->
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
    tenants: 'Agent Panels',
    num_requests: 'Number Requests',
    sessions: 'User Sessions',
    ai_ops: 'AI Settings',
    my_requests: 'My Requests',
    tenant_cfg: 'Tenant API Config',
    clients: 'Clients',
    create_user: 'Create User',
    cdr: 'CDR & Statistics',
    franges: 'Ranges',
    fnumbers: 'SMS Numbers',
    req_numbers: 'Request Numbers',
    search_messages: 'Search Messages',
    sms_test: 'Live Test SMS',
    bulk_alloc: 'SMS Bulk Allocations',
    bill: 'Billing',
    dev_api: 'Developer API',
    simple_api: 'Simple API V2',
    invitations: 'Agent Invitations',
    chat: 'Support Chat',
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

  async createTenant(d, f) {
    await api('/admin/tenants', { body: d });
    f.reset();
    go('tenants');
    toast('Agent panel tenant created');
  },

  async saveAgentTenant(d) {
    await api('/agent/tenant', { method: 'PUT', body: d });
    go('tenant_cfg');
    toast('Tenant configuration updated');
  },

  async saveAiSettings(d) {
    await api('/admin/ai-settings', { method: 'PUT', body: d });
    go('ai_ops');
    toast('AI System settings saved');
  },

  async sendTestSms(d, f) {
    await api('/test-sms', { body: d });
    go('sms_test');
    toast('⚡ Real live test SMS injected successfully!');
  },

  async sendSupportMsg(d, f) {
    await api('/support/messages', { body: d });
    f.reset();
    go('chat');
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

  async requestWithdrawal(d) {
    const r = await api('/withdrawals', { body: d });
    go('bill');
    toast(r.message || 'Withdrawal request submitted');
  },

  async forgot_password(d) {
    const r = await api('/auth/forgot-password', { body: d });
    showAuth('forgot', { step: 'otp', username: r.username, message: r.message });
    toast('WhatsApp OTP Code sent!');
  },

  async verify_reset_otp(d) {
    const r = await api('/auth/verify-reset-otp', { body: d });
    showAuth('forgot', { step: 'password', reset_token: r.reset_token, username: r.username });
    toast('OTP Verified! Enter your new password');
  },

  async reset_password(d) {
    if (d.password !== d.confirm) throw new Error('New password and confirm password do not match');
    const r = await api('/auth/reset-password', { body: d });
    toast(r.message || 'Password updated successfully!');
    setTimeout(() => showAuth('login'), 1800);
    return 'Password reset completed! Redirecting to Sign in...';
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
  async regenTenantKey(el) {
    if (confirm('Regenerate API key for this agent panel?')) {
      await api(`/admin/tenants/${el.dataset.id}/regen-key`, { method: 'POST' });
      go('tenants');
      toast('Tenant API key regenerated');
    }
  },

  async deleteTenant(el) {
    if (confirm('Delete this tenant panel configuration?')) {
      await api(`/admin/tenants/${el.dataset.id}`, { method: 'DELETE' });
      go('tenants');
      toast('Tenant panel deleted');
    }
  },

  async regenMyTenantKey() {
    const t = await api('/agent/tenant').catch(() => ({}));
    if (t && t.id) {
      await api(`/admin/tenants/${t.id}/regen-key`, { method: 'POST' });
      go('tenant_cfg');
      toast('Tenant API key regenerated');
    }
  },

  async approveRequest(el) {
    await api(`/admin/number-requests/${el.dataset.id}/process`, { body: { action: 'approve' } });
    go('num_requests');
    toast('Number request approved & numbers allocated');
  },

  async rejectRequest(el) {
    await api(`/admin/number-requests/${el.dataset.id}/process`, { body: { action: 'reject' } });
    go('num_requests');
    toast('Number request rejected');
  },

  async revokeSession(el) {
    if (confirm('Revoke this active session? The user will be signed out immediately.')) {
      await api(`/admin/sessions/${encodeURIComponent(el.dataset.id)}`, { method: 'DELETE' });
      go('sessions');
      toast('Session revoked');
    }
  },

  async toggleAutoApprove(el) {
    await api('/admin/ai-settings', { method: 'PUT', body: { auto_approve_requests: el.dataset.v === '1' ? 1 : 0 } });
    go('num_requests');
    toast(el.dataset.v === '1' ? 'Auto-approve enabled' : 'Auto-approve disabled');
  },

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
      await api('/me/token', { body: {} });
      go();
    }
  },

  export() {
    if (!LAST || !Array.isArray(LAST.cols) || !Array.isArray(LAST.rows)) return;
    const rowsToExport = [LAST.cols].concat(LAST.rows);
    const csv = rowsToExport.map(r => (Array.isArray(r) ? r : []).map(c => '"' + String(c ?? '').replace(/"/g, '""') + '"').join(',')).join('\n');
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

  async approveWithdrawal(el) {
    await api(`/admin/withdrawals/${el.dataset.id}/process`, { body: { action: 'approve' } });
    go('admin_withdrawals');
    toast('Withdrawal request approved');
  },

  async rejectWithdrawal(el) {
    await api(`/admin/withdrawals/${el.dataset.id}/process`, { body: { action: 'reject' } });
    go('admin_withdrawals');
    toast('Withdrawal request rejected & balance refunded');
  },

  forgot_pw() {
    showAuth('forgot');
  }
};

// --------------------------------------------------------------------------
// AUDIO FEEDBACK SYSTEM (UI Click Sound Effect)
// --------------------------------------------------------------------------
let uiAudioCtx = null;
let SOUND_ENABLED = true;

function playClickSound() {
  if (!SOUND_ENABLED) return;
  try {
    if (!uiAudioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) uiAudioCtx = new AudioCtxClass();
    }
    if (uiAudioCtx && uiAudioCtx.state === 'suspended') {
      uiAudioCtx.resume();
    }
    if (!uiAudioCtx) return;

    const t = uiAudioCtx.currentTime;
    const osc = uiAudioCtx.createOscillator();
    const gain = uiAudioCtx.createGain();

    // Crisp high-to-low pitch sweep for modern UI click ("টুশ" sound)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(850, t);
    osc.frequency.exponentialRampToValueAtTime(150, t + 0.045);

    // Fast decay volume envelope
    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);

    osc.connect(gain);
    gain.connect(uiAudioCtx.destination);

    osc.start(t);
    osc.stop(t + 0.045);
  } catch (e) { }
}

function parseFormData(form) {
  const d = {};
  if (!form) return d;
  try {
    const fd = new FormData(form);
    if (typeof fd.entries === 'function') {
      for (const pair of fd.entries()) {
        d[pair[0]] = pair[1];
      }
    } else {
      const inputs = Array.from(form.querySelectorAll('input, select, textarea'));
      inputs.forEach(inp => {
        if (inp.name && !inp.disabled && (inp.type !== 'radio' && inp.type !== 'checkbox' || inp.checked)) {
          d[inp.name] = inp.value;
        }
      });
    }
  } catch (err) {
    const inputs = Array.from(form.querySelectorAll('input, select, textarea'));
    inputs.forEach(inp => {
      if (inp.name && !inp.disabled && (inp.type !== 'radio' && inp.type !== 'checkbox' || inp.checked)) {
        d[inp.name] = inp.value;
      }
    });
  }
  return d;
}

// --------------------------------------------------------------------------
// EVENT LISTENERS
// --------------------------------------------------------------------------
document.addEventListener('submit', async e => {
  playClickSound();
  const f = e.target.closest('form[data-do]');
  if (!f) return;
  e.preventDefault();
  const m = f.querySelector('.msg'), b = f.querySelector('button[type=submit]');
  if (m) {
    m.textContent = '';
    m.className = 'msg';
  }
  if (b) b.disabled = true;
  try {
    const r = await DO[f.dataset.do](parseFormData(f), f);
    if (r && m) {
      m.textContent = r;
      m.className = 'msg ok';
    }
  } catch (x) {
    if (m) {
      m.textContent = x.message;
      m.className = 'msg er';
    } else {
      toast(x.message);
    }
  } finally {
    if (b) b.disabled = false;
  }
});

document.addEventListener('click', async e => {
  // Trigger UI Click Sound effect on sidebar items, buttons, links
  if (e.target.closest('button, a, .nav-item-btn, .nav-sub-btn, [data-go], [data-toggle-grp], [data-act], [data-auth], .sm')) {
    playClickSound();
  }

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

  // Exclusive Accordion in Sidebar
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
      if (t) t.value = String(rd.result).slice(0, 4e6);
    };
    rd.readAsText(fl);
  }
});

// Boot the application
boot();
