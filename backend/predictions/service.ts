import { incrementParticipantTotalPredictions } from '../leaderboard/repository';
import { getById } from '../matches/repository';
import { createPrediction } from './repository';
import { PredictionRequestDTO } from './types';

export const submitPrediction = async (prediction: PredictionRequestDTO) => {
    const match = await getById(prediction.matchId);

    if (!match) {
        throw new Error('Match not found');
    }

    const createdPrediction = await createPrediction(prediction);

    await incrementParticipantTotalPredictions(
        prediction.userId,
        match.tournamentId ?? undefined,
    );

    return createdPrediction;
};
