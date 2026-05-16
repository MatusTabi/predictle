'use server';

import { syncMatchesFromSportsDb } from './service';

export const syncMatches = async () => {
    return await syncMatchesFromSportsDb();
};
