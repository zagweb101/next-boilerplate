# Next Boilerplate

A production-ready Next.js boilerplate with everything you need to start building immediately.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, TypeScript) |
| Database | PostgreSQL + Prisma 7 ORM |
| Auth | Auth.js v5 (Google OAuth + Credentials) |
| UI | Tailwind CSS v4 + shadcn/ui (Base UI) |
| Validation | Zod 4 |
| Dark mode | next-themes |
| Toasts | sonner |
| Rate limiting | in-memory middleware |
| CI/CD | GitHub Actions |
| Deployment | Railway (Nixpacks or Docker) |

## Quick start

```bash
# 1. Clone or use as a GitHub template
git clone <your-template-url> my-app
cd my-app

# 2. Install dependencies (runs prisma generate automatically)
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL and AUTH_SECRET

# 4. Run database migrations
npx prisma migrate dev --name init

# 5. (Optional) Seed the database
npm run db:seed

# 6. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | NextAuth secret (generate with `npx auth secret`) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |

### Google OAuth setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create an OAuth 2.0 Client ID
3. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Copy the Client ID and Secret into `.env`

## Project structure

```
src/
├── app/
│   ├── (auth)/            # Login & register pages
│   ├── (protected)/       # Authenticated routes
│   ├── api/
│   │   ├── auth/          # Auth.js route handler
│   │   └── health/        # Health check endpoint
│   ├── error.tsx          # Global error boundary
│   ├── not-found.tsx      # 404 page
│   ├── loading.tsx        # Global loading UI
│   ├── layout.tsx         # Root layout (providers + navbar)
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── providers.tsx      # Session + Theme + Toaster
│   ├── navbar.tsx         # Navigation with user menu
│   └── theme-toggle.tsx   # Dark mode toggle
├── lib/
│   ├── actions/           # Server actions
│   ├── validations/       # Zod schemas
│   ├── auth.ts            # Auth.js config (re-exported from src/auth.ts)
│   ├── prisma.ts          # Prisma client singleton
│   ├── rate-limit.ts      # Rate limiting utility
│   └── utils.ts           # cn() helper
├── auth.ts                # NextAuth configuration
├── proxy.ts               # Route protection (Edge)
└── types/                 # Type augmentations
```

## npm scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Generate Prisma client + build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript compiler check |
| `npm run db:migrate` | Create & apply migration (dev) |
| `npm run db:deploy` | Apply pending migrations (prod) |
| `npm run db:seed` | Seed the database |
| `npm run db:studio` | Open Prisma Studio |

## Deploying to Railway

### Option A: Railway GitHub integration (recommended)

1. Push this repo to GitHub
2. Go to [Railway](https://railway.app) → New Project → Deploy from GitHub repo
3. Add a PostgreSQL database service
4. Set environment variables (`DATABASE_URL`, `AUTH_SECRET`, Google OAuth vars)
5. Railway auto-deploys on every push to `main`

The `railway.toml` runs `prisma migrate deploy` before starting the app.

### Option B: GitHub Actions deploy

1. In Railway, create a project and get a **token** + **service ID**
2. Add GitHub repo secrets:
   - `RAILWAY_TOKEN`
   - `RAILWAY_SERVICE_ID`
3. Push to `main` — the deploy workflow runs `railway up`

### Option C: Docker

```bash
docker build -t my-app .
docker run -p 3000:3000 --env-file .env my-app
```

## Using this as a template

1. Click **"Use this template"** on GitHub to create a new repo
2. Clone the new repo
3. Follow the Quick start steps above
