import { db, predictions } from '@/db';
import { PredictionRequestDTO } from './types';
import { and, eq } from 'drizzle-orm';

export const createPrediction = async (prediction: PredictionRequestDTO) => {
    return await db.insert(predictions).values({
        userId: prediction.userId,
        matchId: prediction.matchId,
        homeScore: prediction.homeScore,
        awayScore: prediction.awayScore,
    });
};

export const getPredictionByUserAndMatch = async (
    userId: string,
    matchId: string,
) => {
    const [prediction] = await db
        .select()
        .from(predictions)
        .where(
            and(eq(predictions.userId, userId), eq(predictions.matchId, matchId)),
        )
        .limit(1);

    return prediction ?? null;
};

export const updatePrediction = async (prediction: PredictionRequestDTO) => {
    return await db
        .update(predictions)
        .set({
            homeScore: prediction.homeScore,
            awayScore: prediction.awayScore,
        })
        .where(
            and(
                eq(predictions.userId, prediction.userId),
                eq(predictions.matchId, prediction.matchId),
            ),
        );
};
