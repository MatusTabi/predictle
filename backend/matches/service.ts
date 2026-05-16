import { sportsDbFetch } from '@/lib/sportsdb/sportdb.client';
import { MatchSchemaResponse } from './schema';
import { create, getAll } from './repository';
import { dbMatchtoDtoList } from './mapper';

export const syncMatchesFromSportsDb = async () => {
    const data = await sportsDbFetch(
        `eventsseason.php?id=${process.env.TOURNAMENT_ID}`,
    );

    const parsedData = MatchSchemaResponse.safeParse(data);

    if (!parsedData.success) {
        throw new Error('Failed to parse matches data');
    }

    await create(parsedData.data.events);

    // return mapMatchTypeToMatchDTO(parsedData.data.events);
};

export const getAllMatches = async () => {
    return dbMatchtoDtoList(await getAll());
};
