import { db, tournamentParticipant, users } from '@/db';
import { desc, eq, sql } from 'drizzle-orm';
import type { TournamentTableRow } from './types';

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
