import { db, Tournament, tournament, tournamentParticipant } from '@/db';
import { eq, inArray, not } from 'drizzle-orm';
import { ActiveTournament } from './types';

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
