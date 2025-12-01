import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret_key_change_me');

export async function middleware(request: NextRequest) {
    // Only protect /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            // If it's an API route, return 401
            if (request.nextUrl.pathname.startsWith('/api/admin')) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            // Otherwise redirect to dashboard (which will show login form) or a dedicated login page
            // In this case, the dashboard page itself handles the login form if not authenticated,
            // BUT the prompt says "Route Protection: Implement a middleware... to ensure that only authenticated users can access the /admin/dashboard page."
            // This implies the page itself should be protected or handle the state.
            // However, if I redirect to /admin/dashboard, it loops if I protect /admin/dashboard.
            // Strategy: Allow /admin/dashboard to load, but the API calls it makes will fail.
            // OR: The prompt says "replace... with a functional login form component on the same route".
            // So the middleware should probably verify the token, and if invalid, maybe pass a header or just let the page handle it?
            // Actually, standard middleware protection redirects to /login.
            // But the requirement says "login form component on the same route".
            // So I should NOT redirect away from /admin/dashboard.
            // I should only protect the /api/admin routes strictly.
            // For the page, I can let it load, and the page logic will check if it's authenticated (or the API calls will fail).
            // BUT the prompt says "Implement a middleware... to ensure that only authenticated users can access".
            // This usually means redirect.
            // Let's interpret "login form component on the same route" as:
            // The /admin/dashboard route serves BOTH the login form (if unauth) and the dashboard (if auth).
            // So the middleware should NOT block /admin/dashboard, but it SHOULD block /api/admin/* routes.
            // Let's refine: Middleware protects /api/admin.
            // For /admin/dashboard, we can't easily "block" it if we want to show the login form ON THAT URL.
            // So I will only strictly protect /api/admin in middleware.
            // The page component will handle the UI state.

            if (request.nextUrl.pathname.startsWith('/api/admin')) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            return NextResponse.next();
        }

        try {
            await jwtVerify(token, JWT_SECRET);
            return NextResponse.next();
        } catch (error) {
            if (request.nextUrl.pathname.startsWith('/api/admin')) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            // If token is invalid, we could delete it?
            const response = NextResponse.next();
            response.cookies.delete('admin_token');
            return response;
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/admin/:path*'],
};
