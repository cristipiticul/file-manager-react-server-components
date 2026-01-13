# Architecture

The app is developed in [React Server Components (RSC)](https://react.dev/reference/rsc/server-components) which is similar to NextJS but newer, and I wanted to learn it. I chose this for simplicity (monorepo for front-end + back-end) and simple deployment. Started from the template from [`@vitejs/plugin-rsc`](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-rsc).

For storage, I went with Supabase, because:
1. It offers both a relational database (PostgreSQL) and file storage.
2. Simple deployment - it's a managed service.

# Run locally

Run with `docker compose up` and open <http://localhost:5173/>.

# Deployment

Prerequisites: [GitHub](https://github.com/), [Supabase](https://supabase.com/), and [Vercel](https://vercel.com/) accounts

Supabase setup:
1. Create an organization & project (save somewhere the database password)
2. Go to Settings > Data API > disable the "Enable Data API" checkbox (for security)

Can be deployed on Vercel using the following setup:
1. Fork the code to a GitHub repository
2. Create an account on <https://vercel.com>
3. Click "Add New..." > Project
4. Import the GitHub repository
5. Choose Framework Preset: Nitro
6. TODO!!! Add Environment Variables -- supabase
7. Click Deploy

# Development tools

- Generate migrations: `pnpm run db:generate --name create_users_table`
- Database management: <http://localhost:8000/> and use `DASHBOARD_USERNAME` & `DASHBOARD_PASSWORD` env vars for login
