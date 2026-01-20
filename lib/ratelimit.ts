import { NextRequest, NextResponse } from 'next/server';

interface RateLimitStore {
    [ip: string]: {
        count: number;
        lastReset: number;
    };
}

const store: RateLimitStore = {};

// Default: 10 requests per 60 seconds
const WINDOW_SIZE = 60 * 1000;
const MAX_REQUESTS = 10;

// Clean up old entries periodically to prevent memory leak
setInterval(() => {
    const now = Date.now();
    for (const ip in store) {
        if (now - store[ip].lastReset > WINDOW_SIZE) {
            delete store[ip];
        }
    }
}, WINDOW_SIZE);

export function rateLimit(ip: string, limit = MAX_REQUESTS, windowMs = WINDOW_SIZE) {
    const now = Date.now();

    if (!store[ip]) {
        store[ip] = { count: 1, lastReset: now };
        return { success: true };
    }

    const data = store[ip];

    if (now - data.lastReset > windowMs) {
        // Reset window
        data.count = 1;
        data.lastReset = now;
        return { success: true };
    }

    if (data.count >= limit) {
        return { success: false };
    }

    data.count++;
    return { success: true };
}

export function withRateLimit(handler: Function, limit = 5) {
    return async (request: NextRequest) => {
        const ip = request.headers.get('x-forwarded-for') || 'unknown';

        const check = rateLimit(ip, limit);
        if (!check.success) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        return handler(request);
    };
}
