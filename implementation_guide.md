# SK Traders - Implementation Documentation

This document serves as a comprehensive guide to the architecture, tech stack, and configuration of the SK Traders web application.

## 1. Project Overview
A high-performance, SEO-optimized landing page for SK Traders, featuring a lead generation system and a secure Admin Dashboard for managing customer inquiries.

## 2. Technical Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS (Utility-first, brand-aligned)
- **Icons**: Lucide React
- **Backend-as-a-Service**: Supabase (PostgreSQL, Auth, Real-time)
- **Deployment**: Vercel (Recommended)

## 3. Project Structure
```text
sk-traders/
├── src/
│   ├── app/                    # Next.js App Router routes
│   │   ├── admin/              # Admin-specific routes
│   │   │   ├── dashboard/      # Lead Management UI
│   │   │   └── login/          # Secure Admin Login
│   │   ├── globals.css         # Brand colors and Global styles
│   │   ├── layout.tsx          # Root layout with font configuration
│   │   └── page.tsx            # Main Landing Page assembly
│   ├── components/
│   │   └── sections/           # Modular page sections
│   │       ├── ContactForm.tsx # Supabase-integrated lead form
│   │       ├── Header.tsx      # Navigation and CTAs
│   │       ├── Hero.tsx        # Value proposition and CTA
│   │       ├── ProductGallery.tsx # Feature-rich tile catalog
│   │       └── SpecialOffers.tsx  # Dynamic discount banner
│   └── lib/
│       └── supabase.ts         # Supabase client singleton
├── .env.local.example          # Environment variable template
└── middleware.ts               # Next.js Route Protection logic
```

## 4. Key Features

### Public Landing Page
- **SEO & Performance**: Server-side rendering (SSR) for fast loads and better search rankings.
- **Brand Identity**: Consistent use of *Mustard Yellow* (`#E1AD01`) and *Charcoal Grey* (`#333333`).
- **Interactive Forms**: Client-side validation with real-time feedback.

### Admin Dashboard
- **Authentication**: Managed via Supabase Auth (Email/Password).
- **Route Protection**: Middleware ensures `/admin` paths are only accessible to authenticated users.
- **Lead Management**: 
  - Real-time fetching from `leads` table.
  - Status updates: `new`, `contacted`, `closed`.
  - Responsive table layout with mobile-first design.

## 5. Configuration & Setup

### Environment Variables (`.env.local`)
Create a `.env.local` file with the following:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Database Schema (Supabase SQL)
Run this SQL script in the Supabase SQL Editor:
```sql
-- Create Leads Table
create table leads (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  customer_name text not null,
  phone text not null,
  location text not null,
  message text,
  status text default 'new' check (status in ('new', 'contacted', 'closed'))
);

-- Enable Row Level Security (RLS)
alter table leads enable row level security;

-- Policies
-- 1. Allow public to insert leads
create policy "Allow public insert" on leads for insert with check (true);

-- 2. Allow only authenticated admins to view/update leads
create policy "Allow admin select" on leads for select using (auth.role() = 'authenticated');
create policy "Allow admin update" on leads for update using (auth.role() = 'authenticated');
```

## 6. Maintenance & Future Reference
- **Adding Products**: Update the `products` array in `src/components/sections/ProductGallery.tsx`.
- **Changing Colors**: Modify the `--primary` and `--secondary` variables in `src/app/globals.css`.
- **Exporting Leads**: The Dashboard includes a placeholder for CSV export logic that can be expanded using `json-2-csv`.

---
*Documented on: 2026-03-07*
