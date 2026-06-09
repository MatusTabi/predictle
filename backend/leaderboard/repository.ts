import { db, tournamentParticipant, users } from '@/db';
import { desc, eq, sql } from 'drizzle-orm';
import type { TournamentTableRow } from './types';

export const ensureTournamentParticipation = async (
    userId: string,
    tournamentId: string,
) => {
    const numberOfParticipants = (await getTournamentParticipants()).length;

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
    const results = await db
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
        .innerJoin(users, eq(tournamentParticipant.userId, users.id))
        .orderBy(desc(tournamentParticipant.points));
    // .where(eq(tournamentParticipant.tournamentId, tournamentId))

    return results.map((row, index) => ({
        ...row,
        rank: index + 1,
        userName: row.userName || 'Unknown',
    }));
};

export const incrementParticipantTotalPredictions = async (
    userId: string,
    tournamentId?: string,
) => {
    await db
        .update(tournamentParticipant)
        .set({
            totalPredictions: sql`${tournamentParticipant.totalPredictions} + 1`,
        })
        .where(
            eq(
                tournamentParticipant.userId,
                userId,
            ) /*, eq(tournamentParticipant.tournamentId, tournamentId)*/,
        );
};
