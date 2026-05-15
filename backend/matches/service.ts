import { sportsDbFetch } from '@/lib/sportsdb/sportdb.client';
import { MatchSchemaResponse, MatchType } from './schema';
import { MatchDTO } from './types';
import { mapMatchTypeToMatchDTO } from './mapper';

export const syncMatchesFromSportsDb = async (): Promise<MatchDTO[]> => {
    const data = await sportsDbFetch(
        `eventsseason.php?id=${process.env.TOURNAMENT_ID}`,
    );

    console.log('Fetched matches data:', data);

    const parsedData = MatchSchemaResponse.safeParse(data);

    if (!parsedData.success) {
        console.error('Failed to parse matches data:', parsedData.error);
        throw new Error('Failed to parse matches data');
    }

    return mapMatchTypeToMatchDTO(parsedData.data.events);
};
