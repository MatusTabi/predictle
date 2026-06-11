import { incrementParticipantTotalPredictions as incrementTotalPredictions } from './repository';

export const incrementParticipantTotalPredictions = async (
    userId: string,
    tournamentId: string,
): Promise<void> => {
    return await incrementTotalPredictions(userId, tournamentId);
};
