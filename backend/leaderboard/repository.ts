import { db, tournamentParticipant } from '@/db';
import { desc, eq, sql } from 'drizzle-orm';

export const ensureTournamentParticipation = async (
    userId: string,
    userName: string,
    tournamentId?: number,
) => {
    const numberOfParticipants = (await getTournamentParticipants()).length;

    return await db
        .insert(tournamentParticipant)
        .values({
            userId: userId,
            userName: userName,
            // tournamentId,
            rank: numberOfParticipants + 1,
        })
        .onConflictDoNothing();
};

export const getTournamentParticipants = async (tournamentId?: number) => {
    return await db
        .select()
        .from(tournamentParticipant)
        // .where(eq(tournamentParticipant.tournamentId, tournamentId))
        .orderBy(desc(tournamentParticipant.points));
};

export const incrementParticipantTotalPredictions = async (
    userId: string,
    tournamentId?: number,
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
