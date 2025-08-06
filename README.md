# Smart Ledger - Full Stack Application

A financial ledger application with React frontend and Node.js backend.

## Structure

- `frontend/` - React + Vite frontend with Clerk authentication
- `smartledger-backend/` - Node.js backend with tRPC and Prisma

## Development

### Backend
```bash
cd smartledger-backend
npm install
npx prisma generate
npx prisma db push
npm run seed
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Deployment to Vercel

### Prerequisites
1. Create a cloud PostgreSQL database (Supabase, Neon, or Railway)
2. Push code to GitHub repository

### Vercel Environment Variables
Set these in your Vercel dashboard:

- `DATABASE_URL` - Your cloud PostgreSQL connection string
- `VITE_CLERK_PUBLISHABLE_KEY` - Your Clerk publishable key
- `NODE_ENV` - Set to "production"

### Deploy
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the configuration from `vercel.json`
3. The build will:
   - Generate Prisma client
   - Deploy database migrations
   - Build frontend and backend together

## API Endpoints

- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-app.vercel.app/trpc`

## Features

- Financial ledger entries
- Bank statement upload and processing
- Email receipt parsing
- Reconciliation tools
- User authentication with Clerk
