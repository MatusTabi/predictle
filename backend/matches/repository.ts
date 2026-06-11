import { db, Match, matches, predictions, Prediction } from '@/db';
import { MatchSchema } from './schema';
import z from 'zod';
import { and, desc, eq, isNull, lt, lte, or, sql } from 'drizzle-orm';

export const create = async (match: MatchSchema | MatchSchema[]) => {
    const parsedMatch = z.array(MatchSchema).or(MatchSchema).parse(match);
    const matchesArray = Array.isArray(parsedMatch)
        ? parsedMatch
        : [parsedMatch];

    const values = matchesArray.map((m) => ({
        externalId: m.idEvent,
        homeTeam: m.strHomeTeam,
        awayTeam: m.strAwayTeam,
        homeScore: m.intHomeScore ? parseInt(m.intHomeScore) : null,
        awayScore: m.intAwayScore ? parseInt(m.intAwayScore) : null,
        time: m.strTimeLocal,
        date: m.dateEventLocal,
    }));

    return await db.transaction(async (tx) => {
        return await tx
            .insert(matches)
            .values(values)
            .onConflictDoUpdate({
                target: matches.externalId,
                set: {
                    time: sql`excluded.time`,
                    date: sql`excluded.date`,
                },
            });
    });
};

export const getAll = async (): Promise<Match[]> => {
    return await db.select().from(matches);
};

export const getById = async (matchId: string): Promise<Match | null> => {
    const rows = await db
        .select()
        .from(matches)
        .where(eq(matches.id, matchId))
        .limit(1);

    return rows[0] ?? null;
};

type MatchWithUserPrediction = {
    match: Match;
    userPrediction: Prediction | null;
};

export const getAllWithUserPrediction = async (
    userId: string,
): Promise<MatchWithUserPrediction[]> => {
    return await db
        .select({ match: matches, userPrediction: predictions })
        .from(matches)
        .leftJoin(
            predictions,
            and(
                eq(predictions.matchId, matches.id),
                eq(predictions.userId, userId),
            ),
        );
};

export const getByDateWithUserPrediction = async (
    userId: string,
    date: string,
): Promise<MatchWithUserPrediction[]> => {
    return await db
        .select({ match: matches, userPrediction: predictions })
        .from(matches)
        .leftJoin(
            predictions,
            and(
                eq(predictions.matchId, matches.id),
                eq(predictions.userId, userId),
            ),
        )
        .where(eq(matches.date, date));
};

export const getByTournamentAndDateWithUserPrediction = async (
    userId: string,
    tournamentId: string,
    date: string,
): Promise<MatchWithUserPrediction[]> => {
    return await db
        .select({ match: matches, userPrediction: predictions })
        .from(matches)
        .leftJoin(
            predictions,
            and(
                eq(predictions.matchId, matches.id),
                eq(predictions.userId, userId),
            ),
        )
        .where(
            and(eq(matches.tournamentId, tournamentId), eq(matches.date, date)),
        );
};

export type CreateTournamentMatchInput = {
    tournamentId: string;
    homeTeam: string;
    awayTeam: string;
    date: string;
    time: string;
};

export const createTournamentMatch = async (
    input: CreateTournamentMatchInput,
): Promise<Match> => {
    const [match] = await db
        .insert(matches)
        .values({
            externalId: crypto.randomUUID(),
            homeTeam: input.homeTeam,
            awayTeam: input.awayTeam,
            homeScore: null,
            awayScore: null,
            date: input.date,
            time: input.time,
            tournamentId: input.tournamentId,
        })
        .returning();

    return match;
};

export const getByIdWithUserPrediction = async (
    userId: string,
    matchId: string,
): Promise<MatchWithUserPrediction | null> => {
    const rows = await db
        .select({ match: matches, userPrediction: predictions })
        .from(matches)
        .leftJoin(
            predictions,
            and(
                eq(predictions.matchId, matches.id),
                eq(predictions.userId, userId),
            ),
        )
        .where(eq(matches.id, matchId))
        .limit(1);

    return rows[0] ?? null;
};

export const getUnendedByTournamentBefore = async (
    tournamentId: string,
    date: string,
    time: string,
): Promise<Match[]> => {
    return await db
        .select()
        .from(matches)
        .where(
            and(
                eq(matches.tournamentId, tournamentId),
                or(
                    lt(matches.date, date),
                    and(eq(matches.date, date), lte(matches.time, time)),
                ),
                or(isNull(matches.homeScore), isNull(matches.awayScore)),
            ),
        )
        .orderBy(desc(matches.date), desc(matches.time));
};

export const setTournamentMatchScore = async ({
    tournamentId,
    matchId,
    homeScore,
    awayScore,
}: {
    tournamentId: string;
    matchId: string;
    homeScore: number;
    awayScore: number;
}): Promise<Match | null> => {
    const [match] = await db
        .update(matches)
        .set({ homeScore, awayScore })
        .where(
            and(eq(matches.id, matchId), eq(matches.tournamentId, tournamentId)),
        )
        .returning();

    return match ?? null;
};
