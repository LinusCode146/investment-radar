import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const SESSION_SECRET = process.env.SESSION_SECRET || 'your-secret-key-change-this-in-production';

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
        }

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            const cookieStore = await cookies();

            // Create a simple session token (in production, use a proper JWT library)
            const sessionToken = Buffer.from(
                JSON.stringify({
                    username,
                    isAdmin: true,
                    timestamp: Date.now()
                })
            ).toString('base64');

            cookieStore.set('session', sessionToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60, // 24 hours
                path: '/',
            });

            return NextResponse.json({ username, isAdmin: true });
        }

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}