import { sportsDbFetch } from '@/lib/sportsdb/sportdb.client';
import { MatchSchemaResponse } from './schema';
import { auth } from '@/auth/auth';
import {
    create,
    getAll,
    getAllWithUserPrediction,
    getByTournamentAndDateWithUserPrediction,
    getByDateWithUserPrediction,
    getById,
    getByIdWithUserPrediction,
    createTournamentMatch,
    getUnendedByTournamentBefore,
    setTournamentMatchScore,
    getByTournamentWithPredictions,
} from './repository';
import { dbMatchToDtoList, dbMatchWithPredictionToDtoList } from './mapper';
import type {
    TournamentMatchesByDayDTO,
    TournamentMatchWithPredictionsDTO,
} from './types';

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

export const getTournamentMatchesByDate = async (
    tournamentId: string,
    date: string,
) => {
    const session = await auth();

    if (!session?.user?.id) {
        return [];
    }

    const rows = await getByTournamentAndDateWithUserPrediction(
        session.user.id,
        tournamentId,
        date,
    );

    return dbMatchWithPredictionToDtoList(rows);
};

export const getTournamentMatchesWithPredictions = async (
    tournamentId: string,
    date: string,
): Promise<TournamentMatchesByDayDTO[]> => {
    const rows = await getByTournamentWithPredictions(tournamentId, date);
    const matchesById = new Map<string, TournamentMatchWithPredictionsDTO>();

    for (const { match, prediction, user } of rows) {
        const hasScore = match.homeScore !== null && match.awayScore !== null;
        const existingMatch = matchesById.get(match.id);
        const matchDto =
            existingMatch ??
            ({
                id: match.id,
                externalId: match.externalId,
                homeTeam: match.homeTeam,
                awayTeam: match.awayTeam,
                homeScore: match.homeScore,
                awayScore: match.awayScore,
                startTime: match.time,
                date: match.date,
                hasEnded: hasScore,
                predictions: [],
            } satisfies TournamentMatchWithPredictionsDTO);

        if (!existingMatch) {
            matchesById.set(match.id, matchDto);
        }

        if (prediction && user) {
            matchDto.predictions.push({
                userId: user.id,
                userName: user.name || 'Unknown',
                homeScore: prediction.homeScore,
                awayScore: prediction.awayScore,
            });
        }
    }

    const daysByDate = new Map<string, TournamentMatchWithPredictionsDTO[]>();

    for (const match of matchesById.values()) {
        const dayMatches = daysByDate.get(match.date) ?? [];
        dayMatches.push(match);
        daysByDate.set(match.date, dayMatches);
    }

    return Array.from(daysByDate.entries()).map(([date, matches]) => ({
        date,
        matches,
    }));
};

export type CreateTournamentMatchPayload = {
    tournamentId: string;
    homeTeam: string;
    awayTeam: string;
    startsAt: string;
};

export const addTournamentMatch = async ({
    tournamentId,
    homeTeam,
    awayTeam,
    startsAt,
}: CreateTournamentMatchPayload) => {
    const trimmedHomeTeam = homeTeam.trim();
    const trimmedAwayTeam = awayTeam.trim();

    if (!trimmedHomeTeam) {
        throw new Error('Home team is required');
    }

    if (!trimmedAwayTeam) {
        throw new Error('Away team is required');
    }

    if (!startsAt) {
        throw new Error('Start date is required');
    }

    const [date, time] = startsAt.split('T');

    if (!date || !time) {
        throw new Error('Start date is invalid');
    }

    return await createTournamentMatch({
        tournamentId,
        homeTeam: trimmedHomeTeam,
        awayTeam: trimmedAwayTeam,
        date,
        time: time.length === 5 ? `${time}:00` : time.slice(0, 8),
    });
};

const appTimeZone = process.env.APP_TIME_ZONE ?? 'Europe/Bratislava';

const toAppDateAndTime = (date: Date) => {
    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: appTimeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }).formatToParts(date);

    const values = Object.fromEntries(
        parts.map((part) => [part.type, part.value]),
    );

    return {
        date: `${values.year}-${values.month}-${values.day}`,
        time: `${values.hour}:${values.minute}:${values.second}`,
    };
};

export const getRecentUnendedTournamentMatches = async (
    tournamentId: string,
) => {
    const cutoff = new Date(Date.now() - 4 * 60 * 60 * 1000);
    const { date, time } = toAppDateAndTime(cutoff);

    return dbMatchToDtoList(
        await getUnendedByTournamentBefore(tournamentId, date, time),
    );
};

export type EndTournamentMatchPayload = {
    tournamentId: string;
    matchId: string;
    homeScore: number;
    awayScore: number;
};

export const endTournamentMatch = async ({
    tournamentId,
    matchId,
    homeScore,
    awayScore,
}: EndTournamentMatchPayload) => {
    if (!matchId) {
        throw new Error('Match is required');
    }

    if (
        !Number.isInteger(homeScore) ||
        !Number.isInteger(awayScore) ||
        homeScore < 0 ||
        awayScore < 0
    ) {
        throw new Error('Scores must be non-negative whole numbers');
    }

    const match = await setTournamentMatchScore({
        tournamentId,
        matchId,
        homeScore,
        awayScore,
    });

    if (!match) {
        throw new Error('Match not found');
    }

    return match;
};
