# MSI SMS

একটাই প্রজেক্ট: লগইন, রেজিস্ট্রেশন, **অ্যাডমিন প্যানেল**, **এজেন্ট প্যানেল** ও **ক্লায়েন্ট প্যানেল** — সব একসাথে, একই ডাটাবেসে। রিয়েল-টাইম আপডেট সার্ভার থেকে সরাসরি আসে (পেজ রিফ্রেশ লাগে না)। কোনো npm প্যাকেজ লাগে না।

## কোথায় চালাবেন
- **চলবে:** যেকোনো ছোট ভিপিএস (Ubuntu/Debian ইত্যাদি), অথবা Render / Railway / Fly.io (স্থায়ী ডিস্কসহ)।
- **চলবে না:** GitHub Pages (শুধু স্থির ফাইল চলে, সার্ভার নেই)। Vercel-এও সরাসরি নয়, কারণ ওখানে ফাইল-ডাটাবেস ও লাইভ সংযোগ টেকে না।
- দরকার: **Node.js 22.13 বা নতুন**।

## চালানোর ধাপ
```bash
cp .env.example .env        # তারপর .env খুলে ADMIN_PASSWORD বদলান
node server.js              # http://localhost:3000
```
প্রথমবার চালালে অ্যাডমিন অ্যাকাউন্ট নিজে তৈরি হয় (`ADMIN_USERNAME` / `ADMIN_PASSWORD`)। পাসওয়ার্ড না দিলে কনসোলে একবার দেখানো হয়।

## HTTPS (ডোমেইনসহ) — Caddy দিয়ে সবচেয়ে সহজ
`Caddyfile`:
```
yourdomain.com {
  reverse_proxy localhost:3000
}
```
`.env`-এ `COOKIE_SECURE=1` ও `TRUST_PROXY=1` দিন।

## সার্ভার চালু রাখা (systemd)
`/etc/systemd/system/msi-sms.service`:
```
[Unit]
Description=MSI SMS
After=network.target
[Service]
WorkingDirectory=/opt/msi-sms
ExecStart=/usr/bin/node server.js
Restart=always
User=www-data
[Install]
WantedBy=multi-user.target
```
`sudo systemctl enable --now msi-sms`

(Docker চাইলে: `docker build -t msi-sms . && docker run -d -p 3000:3000 -v msi-data:/data --env-file .env msi-sms`)

## প্রথম ব্যবহার
1. অ্যাডমিন হিসেবে লগইন করুন → **Ranges** → রেঞ্জ যোগ করুন (নাম, দেশ, এজেন্ট পেআউট, দৈনিক লিমিট)।
2. একই পেজে **Upload Numbers** → নম্বরের ফাইল (.txt/.csv) দিন বা পেস্ট করুন। ডুপ্লিকেট নিজে বাদ যায়।
3. কেউ **Apply for an account** দিয়ে সাইন-আপ করলে অ্যাডমিনের কাছে **Users** পেজে লাইভ দেখা যায় → **Approve** করলে সে লগইন করতে পারে।
4. এজেন্ট **Ranges & Request** থেকে নম্বর নেয় → **My Numbers**-এ আসে → **Clients** পেজে ক্লায়েন্ট বানিয়ে নম্বর **Assign** করে। ক্লায়েন্ট সাথে সাথে নিজের ইউজারনেম-পাসওয়ার্ডে ঢুকতে পারে।
5. SMS আসার জন্য অ্যাডমিন **API Keys** থেকে প্রোভাইডারের জন্য কী বানায়। প্রোভাইডার প্রতিটি মেসেজ পাঠায়:
```bash
curl -X POST https://yourdomain.com/api/ingest \
  -H "X-API-Key: msi_..." -H "Content-Type: application/json" \
  -d '{"number":"8801711000001","cli":"SENDER","text":"your code is 123456"}'
```
(একসাথে অনেক মেসেজ: `{"messages":[ {...}, {...} ]}`, সর্বোচ্চ ৫০০টি।) নম্বরটি কোনো এজেন্ট/ক্লায়েন্টের হলে মেসেজ তার CDR-এ যায়, পেআউট হিসাবে জমা হয় এবং তারা লাইভ নোটিফিকেশন পায়।

## এজেন্ট/ক্লায়েন্টের API
প্রোফাইল পেজে প্রত্যেকের নিজের টোকেন আছে: `GET /api/v2/cdr?token=...&dt1=2026-10-01&dt2=2026-10-31&records=100&filternum=&filtercli=`

## ব্যাকআপ
সব তথ্য `data/msi.db` ফাইলে। সার্ভার বন্ধ করে (বা `sqlite3 data/msi.db ".backup backup.db"` দিয়ে) ফাইলটা কপি করে রাখুন।

## পরীক্ষা
`npm test` — একটা অস্থায়ী সার্ভার চালিয়ে পুরো প্রবাহ (রেজিস্ট্রেশন → অনুমোদন → নম্বর → মেসেজ → ব্যালেন্স → লাইভ ইভেন্ট) যাচাই করে।

## নিরাপত্তা
পাসওয়ার্ড scrypt দিয়ে হ্যাশ করা, সেশন কুকি HttpOnly, প্রতিটি অনুরোধে রোল-ভিত্তিক অনুমতি, লগইন ও রেজিস্ট্রেশনে রেট লিমিট, অডিট লগ, কড়া CSP।

## এখনো যা নেই (পরের ধাপ)
প্রোভাইডারের API থেকে নিজে রেঞ্জ/নম্বর টেনে আনা (অটো সিঙ্ক), পেআউট রিকোয়েস্ট ও অনুমোদন, রেফারেল, সাপোর্ট চ্যাট, SMS টেস্ট প্যানেল, বাল্ক অ্যালোকেশন পেজ, মেসেজ-থেকে-রেঞ্জ সার্চ, মোবাইল অ্যাপ ডাউনলোড পেজ।
