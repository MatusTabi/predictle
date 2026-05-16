import { config as loadEnv } from 'dotenv';
import type { Config } from 'drizzle-kit';

loadEnv({ path: '.env' });

const url = process.env.DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN;

if (!url) {
    throw new Error('Missing DATABASE_URL. Set it in .env');
}

export default {
    schema: './db/schema',
    out: './drizzle',
    dialect: 'turso',
    dbCredentials: {
        url,
        authToken,
    },
} satisfies Config;
