import { cookies } from 'next/headers';

export async function verifyAdminSession(): Promise<boolean> {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie?.value) {
            return false;
        }

        const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString());

        // Check if session is still valid
        const sessionAge = Date.now() - sessionData.timestamp;
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours in ms

        if (sessionAge > maxAge) {
            return false;
        }

        return sessionData.isAdmin === true;
    } catch (error) {
        console.error('Admin session verification error:', error);
        return false;
    }
}