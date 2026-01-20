import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { createSession } from '@/lib/auth';
import { loginSchema } from '@/lib/schemas';
import { rateLimit } from '@/lib/ratelimit';

export async function POST(request: Request) {
    try {
        // 0. Rate Limiting Protection
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        const limiter = rateLimit(ip, 5, 60 * 1000); // 5 attempts per minute

        if (!limiter.success) {
            return NextResponse.json(
                { error: 'Too many login attempts. Please try again in a minute.' },
                { status: 429 }
            );
        }

        const body = await request.json();

        // 1. Validate Input
        const result = loginSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: result.error.issues },
                { status: 400 }
            );
        }

        const { email, password } = result.data;

        // 2. Find User (Allow login by Email)
        const user = await prisma.user.findFirst({
            where: { email }, // Login schema enforces email, so we look up by email
        });

        if (!user || !user.password_hash) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // 3. Verify Password
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // 4. Create Secure Session
        await createSession(user.id.toString(), user.role);

        return NextResponse.json({ success: true, role: user.role });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
