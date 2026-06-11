import { db, tournamentParticipant, users } from '@/db';
import { and, desc, eq, sql } from 'drizzle-orm';
import type { TournamentTableRow } from './types';

export const incrementParticipantTotalPredictions = async (
    userId: string,
    tournamentId?: string,
) => {
    const where = tournamentId
        ? and(
              eq(tournamentParticipant.userId, userId),
              eq(tournamentParticipant.tournamentId, tournamentId),
          )
        : eq(tournamentParticipant.userId, userId);

    await db
        .update(tournamentParticipant)
        .set({
            totalPredictions: sql`${tournamentParticipant.totalPredictions} + 1`,
        })
        .where(where);
};
