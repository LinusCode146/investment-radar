import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie?.value) {
            return NextResponse.json({ error: 'No session' }, { status: 401 });
        }

        try {
            const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString());

            // Check if session is still valid (24 hours)
            const sessionAge = Date.now() - sessionData.timestamp;
            const maxAge = 24 * 60 * 60 * 1000; // 24 hours in ms

            if (sessionAge > maxAge) {
                cookieStore.delete('session');
                return NextResponse.json({ error: 'Session expired' }, { status: 401 });
            }

            return NextResponse.json({
                username: sessionData.username,
                isAdmin: sessionData.isAdmin
            });
        } catch (error) {
            console.error('Session parsing error:', error);
            cookieStore.delete('session');
            return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
        }
    } catch (error) {
        console.error('Session check error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}