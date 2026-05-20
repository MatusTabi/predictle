import { ensureTournamentParticipation } from '../leaderboard/repository';
import { getUsernameById } from '../user/repository';
import { createPrediction } from './repository';
import { PredictionRequestDTO } from './types';

export const submitPrediction = async (prediction: PredictionRequestDTO) => {
    const userName = await getUsernameById(prediction.userId);

    if (!userName) {
        throw new Error('User not found');
    }

    const result = await ensureTournamentParticipation(
        prediction.userId,
        userName,
    );

    console.log('ensureTournamentParticipation result: ', result);

    if (result.rows.length === 0) {
        throw new Error('User is not participating in the tournament');
    }

    return await createPrediction(prediction);
};
