import { db, predictions } from '@/db';
import { PredictionRequestDTO } from './types';

export const createPrediction = async (prediction: PredictionRequestDTO) => {
    return await db.insert(predictions).values({
        userId: prediction.userId,
        matchId: prediction.matchId,
        homeScore: prediction.homeScore,
        awayScore: prediction.awayScore,
    });
};
