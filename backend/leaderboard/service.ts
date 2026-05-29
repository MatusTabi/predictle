import {
    ensureTournamentParticipation as ensureParticipation,
    getTournamentParticipants as getParticipants,
    incrementParticipantTotalPredictions as incrementTotalPredictions,
} from './repository';
import { TournamentParticipantDTO } from './types';

export const ensureTournamentParticipation = async (
    userId: string,
    userName: string,
    tournamentId: number,
) => {
    return await ensureParticipation(userId, userName, tournamentId);
};

export const getTournamentParticipants = async (
    tournamentId: number,
): Promise<TournamentParticipantDTO[]> => {
    return await getParticipants(tournamentId);
};

export const incrementParticipantTotalPredictions = async (
    userId: string,
    tournamentId: number,
): Promise<void> => {
    return await incrementTotalPredictions(userId, tournamentId);
};
