# Innerloom

Professional website for **Parishkriti Bamrara**, Counselling Psychologist — offering warm, CBT-based online counselling for young adults, students, and professionals across India.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui (radix-nova) |
| Email | Resend |
| Database | Neon (serverless Postgres) |
| Validation | Zod |
| Hosting | Vercel |
| CDN / DNS | Cloudflare |
<!-- | Analytics | Plausible (post-launch) | -->

---

## Project Structure

```
src/
├── app/
│   ├── (pages)/
│   │   ├── about/          → /about
│   │   ├── contact/        → /contact
│   │   ├── privacy/        → /privacy
│   │   └── terms/          → /terms
│   ├── api/
│   │   └── contact/        → POST /api/contact
│   ├── layout.tsx           → root layout + SEO metadata + JSON-LD
│   ├── page.tsx             → home page
│   ├── sitemap.ts           → /sitemap.xml
│   └── robots.ts            → /robots.txt
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── CrisisBanner.tsx
│   │   └── LegalLayout.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── WhoIHelp.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── AboutSnippet.tsx
│   │   ├── TrustBar.tsx
│   │   └── HomeCTA.tsx
│   ├── about/
│   │   ├── AboutMe.tsx
│   │   ├── MyApproach.tsx
│   │   ├── Credentials.tsx
│   │   └── Vignettes.tsx
│   ├── seo/
│   │   └── JsonLd.tsx
│   └── shared/
│       ├── ContactForm.tsx
│       └── WhatsAppFAB.tsx
└── lib/
    ├── db/
    │   ├── neon.ts          → Neon client
    │   └── submissions.ts   → insert contact submission
    ├── resend/
    │   └── send.ts          → email template + Resend call
    ├── validations/
    │   └── contact.ts       → Zod schema
    └── ratelimit.ts         → in-memory rate limiter
```

---

## Getting Started

### Prerequisites

- Node.js >= 20
- npm

### Install dependencies

```bash
npm install
```

### Environment variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WA_NUMBER=91xxxxxxxxxx

RESEND_API_KEY=re_xxxx
ADMIN_EMAIL=example@gmail.com

DATABASE_URL=postgresql://your-neon-connection-string
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Full site URL — `https://innerloom.in` in production |
| `NEXT_PUBLIC_WA_NUMBER` | WhatsApp number with country code, no `+` (e.g. `919876543210`) |
| `RESEND_API_KEY` | API key from resend.com |
| `ADMIN_EMAIL` | Gmail inbox that receives contact form submissions |
| `DATABASE_URL` | Neon serverless Postgres connection string |

---

## Contact Form Architecture

```
User submits form
      ↓
Rate limiter (3 req / 10 min per IP)
      ↓
Honeypot check (silent discard if bot)
      ↓
Zod validation
      ↓
Resend → Gmail inbox        ← critical path
      ↓
Neon DB insert              ← best-effort (failure doesn't surface to user)
      ↓
200 OK → success state shown
```

---

## Branch Strategy

| Branch | Purpose |
|---|---|
| `dev` | Active development |
| `prod` | Production — auto-deploys to Vercel |

Merge `dev → prod` when ready to ship a release.

---

## Deployment

Hosted on **Vercel**. Every push to `prod` triggers an automatic deployment.

Add all environment variables listed above in:
Vercel Dashboard → Project → Settings → Environment Variables

## Crisis Resources

The site displays Indian mental health crisis lines throughout:

| Organisation | Number |
|---|---|
| iCall (TISS) | 9152987821 |
| Vandrevala Foundation | 1860-2662-345 (24/7) |
| AASRA | 9820466627 |
| NIMHANS | 080-46110007 |

---

*Built by [Apoorva Sati](https://github.com/Apoorva-Sati)*
