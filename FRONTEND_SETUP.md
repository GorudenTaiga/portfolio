# Frontend Supabase Integration - Setup Guide

## Overview
The Next.js portfolio has been updated to:
1. Fetch projects and skills from Supabase instead of hardcoded data
2. Use environment variables for multi-tenant configuration (private/public deployment)
3. Support dynamic names and URLs based on deployment host

## Required Environment Variables

Add these to your `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://rqbcrttxfhxmcaxiropg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Environment-based Configuration
NEXT_PUBLIC_PRIVATEURL=rezaar
NEXT_PUBLIC_PRIVATENAME=Reza Arfana Rafi
NEXT_PUBLIC_PUBLICNAME=GorudenTaiga
```

## What Changed

### 1. **New Supabase Client** (`app/lib/supabase.ts`)
- Lazily initializes Supabase client only when env vars are present
- `fetchProjects()` - Returns projects sorted by creation date
- `fetchSkills()` - Returns skills sorted by date learned
- Graceful fallback to empty arrays if Supabase isn't configured (useful for build time)

### 2. **Updated Page Component** (`app/page.tsx`)
- Now uses `NEXT_PUBLIC_PRIVATEURL` env var instead of hardcoded `'rezaar'`
- Conditional display name from `NEXT_PUBLIC_PRIVATENAME` or `NEXT_PUBLIC_PUBLICNAME`
- Fetches projects from Supabase at build/runtime via `fetchProjects()`

### 3. **Updated Layout** (`app/layout.tsx`)
- Uses env vars for metadata generation
- Dynamically sets `displayName` based on host and env configuration

### 4. **Updated Hero Component** (`app/pages/Hero.tsx`)
- Default displayName changed from hardcoded to function parameter

### 5. **Updated Footer Component** (`app/pages/Footer.tsx`)
- Changed from `isReza` prop to `isPrivate` prop
- Consistency across component naming

### 6. **Updated Skills Page** (`app/pages/Skills.tsx`)
- Fetches skills from Supabase instead of hardcoded array
- Dynamically renders icon components based on `ICON_MAP` lookup table
- Loading state while fetching from database

### 7. **Updated HomeClient** (`app/components/HomeClient.tsx`)
- Updated prop naming: `isReza` → `isPrivate`
- Now accepts `projects` array from parent
- All data is passed from server component to client

### 8. **Updated ProjectModal** (`app/pages/ProjectModal.tsx`)
- Host check now uses `process.env.NEXT_PUBLIC_PRIVATEURL` instead of hardcoded `'rezaar'`

## How It Works

### Multi-Tenant Configuration
The app uses the host header to determine which deployment is running:

```typescript
const privateUrl = process.env.NEXT_PUBLIC_PRIVATEURL || '';
const isPrivate = !!privateUrl && host.includes(privateUrl);

const displayName = isPrivate 
  ? (process.env.NEXT_PUBLIC_PRIVATENAME || 'Reza Arfana Rafi')
  : (process.env.NEXT_PUBLIC_PUBLICNAME || 'GorudenTaiga');
```

### Deployment Examples

**Private (Reza) Deployment on rezaar.vercel.app:**
```env
NEXT_PUBLIC_PRIVATEURL=rezaar
NEXT_PUBLIC_PRIVATENAME=Reza Arfana Rafi
NEXT_PUBLIC_PUBLICNAME=GorudenTaiga  # ignored
```

**Public (GorudenTaiga) Deployment on gorudentaiga.vercel.app:**
```env
NEXT_PUBLIC_PRIVATEURL=rezaar
NEXT_PUBLIC_PRIVATENAME=Reza Arfana Rafi  # ignored
NEXT_PUBLIC_PUBLICNAME=GorudenTaiga
```

## Data Flow

```
Supabase Database
    ↓
Supabase PostgREST API
    ↓
fetchProjects() / fetchSkills() (app/lib/supabase.ts)
    ↓
app/page.tsx (Server Component)
    ↓
HomeClient Component (Client Component)
    ↓
ProjectSection / Skills / Hero / Footer (display)
```

## Building & Running

```bash
# Install dependencies
npm install

# Build
npm run build

# Development server
npm run dev
```

## Fallback Behavior

If Supabase environment variables are not configured:
- `fetchProjects()` returns `[]`
- `fetchSkills()` returns `[]`
- Components display empty states gracefully
- Build succeeds (doesn't throw errors)

This allows development and testing without needing Supabase configured during build time.

## Next Steps

1. Set `NEXT_PUBLIC_SUPABASE_ANON_KEY` in your Vercel/deployment environment
2. Ensure the CMS seed data has been loaded into your Supabase `projects` and `skills` tables
3. Deploy and test both rezaar.vercel.app and gorudentaiga.vercel.app instances
4. Verify correct names and data appear for each deployment

See `cms/README.md` for CMS setup and data migration instructions.
