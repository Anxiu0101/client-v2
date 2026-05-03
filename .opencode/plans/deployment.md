# Deployment Plan — Anxiu Online Client-v2

## Changes needed

### 1. `next.config.ts` — Add `output: "standalone"`
```ts
const nextConfig: NextConfig = {
  output: "standalone",  // ← add this line
  reactStrictMode: true,
  images: { remotePatterns: [...] },
};
```

### 2. Create `docs/deployment.md` — Full deployment guide

## Deploy Steps Summary

| Step | Action |
|------|--------|
| 1 | System init (update, ufw, curl, git) |
| 2 | Install Node.js 20 LTS + yarn + pm2 |
| 3 | Install nginx |
| 4 | Clone repo, `yarn install --ignore-engines`, `yarn gen && yarn build` |
| 5 | Copy `public/` + `.velite/` to `.next/standalone/` |
| 6 | Start with PM2 ecosystem |
| 7 | Nginx reverse proxy config |
| 8 | Create `deploy.sh` for updates |
