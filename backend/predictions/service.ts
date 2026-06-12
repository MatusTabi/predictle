import { incrementParticipantTotalPredictions } from '../leaderboard/repository';
import { getById } from '../matches/repository';
import {
    createPrediction,
    getPredictionByUserAndMatch,
    updatePrediction,
} from './repository';
import { PredictionRequestDTO } from './types';

export const submitPrediction = async (prediction: PredictionRequestDTO) => {
    const match = await getById(prediction.matchId);

    if (!match) {
        throw new Error('Match not found');
    }

    const matchStartDate = new Date(`${match.date}T${match.time}`);

    if (matchStartDate <= new Date()) {
        throw new Error('Match has already started');
    }

    const existingPrediction = await getPredictionByUserAndMatch(
        prediction.userId,
        prediction.matchId,
    );

    const savedPrediction = existingPrediction
        ? await updatePrediction(prediction)
        : await createPrediction(prediction);

    if (!existingPrediction) {
        await incrementParticipantTotalPredictions(
            prediction.userId,
            match.tournamentId ?? undefined,
        );
    }

    return savedPrediction;
};
