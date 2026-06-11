import { db, Tournament, tournament, tournamentParticipant, users } from '@/db';
import { eq, inArray, not, desc } from 'drizzle-orm';
import { ActiveTournament } from './types';
import { TournamentTableRow } from '../leaderboard/types';

export const getActiveTournaments = async (
    userId: string,
): Promise<ActiveTournament[]> => {
    return await db
        .select()
        .from(tournament)
        .leftJoin(
            tournamentParticipant,
            eq(tournament.id, tournamentParticipant.tournamentId),
        )
        .where(
            eq(tournamentParticipant.userId, userId),
            // eq(tournament.startDate, sql`${new Date()}`),
        );
};

export const getAvailableTournaments = async (
    userId: string,
): Promise<Tournament[]> => {
    const userTournaments = db
        .select({
            tournamentId: tournamentParticipant.tournamentId,
        })
        .from(tournamentParticipant)
        .where(eq(tournamentParticipant.userId, userId));

    return await db
        .select()
        .from(tournament)
        .where(not(inArray(tournament.id, userTournaments)));
};

export const getTournamentBySlug = async (
    slug: string,
): Promise<Tournament | undefined> => {
    const [result] = await db
        .select()
        .from(tournament)
        .where(eq(tournament.slug, slug))
        .limit(1);

    return result;
};

export type CreateTournamentInput = {
    name: string;
    slug: string;
    category: string;
    startDate: string;
};

export const createTournament = async (
    input: CreateTournamentInput,
): Promise<Tournament> => {
    const [createdTournament] = await db
        .insert(tournament)
        .values(input)
        .returning();

    return createdTournament;
};

export const ensureTournamentParticipation = async (
    userId: string,
    tournamentId: string,
) => {
    return await db
        .insert(tournamentParticipant)
        .values({
            userId: userId,
            tournamentId: tournamentId,
        })
        .onConflictDoNothing();
};

export const getTournamentParticipants = async (
    tournamentId?: string,
): Promise<TournamentTableRow[]> => {
    const query = db
        .select({
            id: tournamentParticipant.id,
            userId: tournamentParticipant.userId,
            correctWinners: tournamentParticipant.correctWinners,
            correctScores: tournamentParticipant.correctScores,
            totalPredictions: tournamentParticipant.totalPredictions,
            points: tournamentParticipant.points,
            userName: users.name,
        })
        .from(tournamentParticipant)
        .innerJoin(users, eq(tournamentParticipant.userId, users.id));

    const results = tournamentId
        ? await query
              .where(eq(tournamentParticipant.tournamentId, tournamentId))
              .orderBy(desc(tournamentParticipant.points))
        : await query.orderBy(desc(tournamentParticipant.points));

    return results.map((row, index) => ({
        ...row,
        rank: index + 1,
        userName: row.userName || 'Unknown',
    }));
};
