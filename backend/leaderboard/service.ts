import {
    ensureTournamentParticipation as ensureParticipation,
    getTournamentParticipants as getParticipants,
    incrementParticipantTotalPredictions as incrementTotalPredictions,
} from './repository';
import { TournamentParticipantDTO, TournamentTableRow } from './types';

export const ensureTournamentParticipation = async (
    userId: string,
    tournamentId: string,
) => {
    return await ensureParticipation(userId, tournamentId);
};

export const getTournamentParticipants = async (
    tournamentId?: string,
): Promise<TournamentTableRow[]> => {
    return await getParticipants(tournamentId);
};

export const incrementParticipantTotalPredictions = async (
    userId: string,
    tournamentId: string,
): Promise<void> => {
    return await incrementTotalPredictions(userId, tournamentId);
};
