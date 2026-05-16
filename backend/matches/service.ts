import { sportsDbFetch } from '@/lib/sportsdb/sportdb.client';
import { MatchSchemaResponse } from './schema';
import { auth } from '@/auth/auth';
import {
    create,
    getAll,
    getAllWithUserPrediction,
    getByDateWithUserPrediction,
    getById,
    getByIdWithUserPrediction,
} from './repository';
import { dbMatchToDtoList, dbMatchWithPredictionToDtoList } from './mapper';

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
    const session = await auth();

    if (session?.user?.id) {
        const rows = await getAllWithUserPrediction(session.user.id);
        return dbMatchWithPredictionToDtoList(rows);
    }

    return dbMatchToDtoList(await getAll());
};

export const getMatchesByDate = async (date: string) => {
    const session = await auth();

    if (session?.user?.id) {
        const rows = await getByDateWithUserPrediction(session.user.id, date);
        return dbMatchWithPredictionToDtoList(rows);
    }

    const allMatches = await getAll();
    const filteredMatches = allMatches.filter((match) => match.date === date);
    return dbMatchToDtoList(filteredMatches);
};

export const getMatchById = async (matchId: string) => {
    const session = await auth();

    if (session?.user?.id) {
        const row = await getByIdWithUserPrediction(session.user.id, matchId);
        if (!row) {
            return null;
        }

        return dbMatchWithPredictionToDtoList([row])[0] ?? null;
    }

    const match = await getById(matchId);
    if (!match) {
        return null;
    }

    return dbMatchToDtoList([match])[0] ?? null;
};
