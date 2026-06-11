import { db, users } from '@/db';
import { eq } from 'drizzle-orm';

export const getUsernameById = async (
    userId: string,
): Promise<string | null> => {
    const user = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .get();
    return user ? user.name : null;
};
