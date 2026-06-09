import { incrementParticipantTotalPredictions } from '../leaderboard/repository';
import { ensureTournamentParticipation } from '../tournament/service';
import { getUsernameById } from '../user/repository';
import { createPrediction } from './repository';
import { PredictionRequestDTO } from './types';

export const submitPrediction = async (prediction: PredictionRequestDTO) => {
    const userName = await getUsernameById(prediction.userId);

    if (!userName) {
        throw new Error('User not found');
    }

    await ensureTournamentParticipation(prediction.userId, userName);
    await incrementParticipantTotalPredictions(prediction.userId);

    return await createPrediction(prediction);
};
