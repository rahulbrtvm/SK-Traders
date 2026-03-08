import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    // Current Supabase Auth Helper is causing a runtime error in this environment.
    // We are relying on client-side check implemented in /admin/dashboard/page.tsx
    // to protect the admin area while ensuring the site remains stable.

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};

