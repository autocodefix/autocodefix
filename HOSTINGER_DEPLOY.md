# Deploying AUTO CODE FIX on Hostinger

## Requirements
- Hostinger VPS or Node.js hosting plan
- Node.js 20 (set in `.nvmrc` and `package.json` engines)

---

## Step 1 — Upload your project

Upload the project folder to your Hostinger server, or connect via Git:
```bash
git clone https://github.com/yourname/autocodefix.git
cd autocodefix
```

---

## Step 2 — Set environment variables

In Hostinger dashboard → **Node.js** → **Environment Variables**, add:

| Key | Value |
|---|---|
| `NEXT_PUBLIC_BASE_URL` | `https://autocodefix.com` |
| `SUPABASE_URL` | `https://your-project.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` |
| `ANTHROPIC_API_KEY` | `sk-ant-...` |
| `PORT` | `3000` |
| `NODE_ENV` | `production` |

---

## Step 3 — Install, build, start

```bash
# Install dependencies
npm install

# Build the Next.js app (creates .next/standalone/)
npm run build

# Start the server
node .next/standalone/server.js
```

Or set these in Hostinger's dashboard:
- **Build command:** `npm install && npm run build`
- **Start command:** `node .next/standalone/server.js`

---

## Step 4 — Static assets (important for standalone output)

After building, copy these folders into the standalone output:
```bash
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
```

Hostinger may do this automatically. If images/CSS fail to load, run this manually.

---

## Step 5 — Seed the database (first deploy only)

```bash
npm run seed
```

---

## Troubleshooting

**Port:** Hostinger assigns the port via `$PORT`. Next.js standalone respects this automatically.

**Node version:** Hostinger reads `.nvmrc` (contains `20`). If it doesn't, set Node 20 manually in the dashboard.

**Build fails with "Cannot find module":** Run `npm install` before `npm run build`.

**Static files 404:** Run the `cp` commands in Step 4 above.
