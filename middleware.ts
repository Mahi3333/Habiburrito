import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from './lib/auth';

// 1. Specify protected routes
const protectedRoutes = ['/admin', '/dashboard', '/profile'];
const publicRoutes = ['/login', '/signup', '/', '/menu', '/our-story', '/locations'];

export default async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));

    // Also protect API routes for admin
    const isAdminApi = path.startsWith('/api/admin');

    if (isProtectedRoute || isAdminApi) {
        // 3. Decrypt the session from the cookie
        const cookie = req.cookies.get('session')?.value;
        const session = cookie ? await decrypt(cookie) : null;

        // 4. Redirect to /login if the user is not authenticated
        if (!session?.userId) {
            // For API routes, return 401 JSON
            if (isAdminApi) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }

            return NextResponse.redirect(new URL('/login', req.nextUrl));
        }

        // 5. Role-Based Access Control (RBAC)
        // If accessing Admin paths, ensure user is ADMIN
        if ((isAdminApi || path.startsWith('/admin')) && session.role !== 'ADMIN') {
            if (isAdminApi) {
                return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
            }
            // Redirect unauthorized users to home
            return NextResponse.redirect(new URL('/', req.nextUrl));
        }
    }

    // 5. Allow access
    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
