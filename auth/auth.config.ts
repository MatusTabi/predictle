import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';

export const authConfig = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
} satisfies NextAuthConfig;
