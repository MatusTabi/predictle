'use server';

import { syncMatchesFromSportsDb } from './service';

const getMatches = async () => {
    return syncMatchesFromSportsDb();
};

export { getMatches };
