// 'use server';

// import { auth } from '@/auth/auth';
// import { submitPrediction } from './service';
// import { getMatchById } from '@/backend/matches/service';

// export type SubmitPredictionInput = {
//     matchId: string;
//     homeScore: number;
//     awayScore: number;
// };

// export const submitPredictionAction = async (
//     payload: SubmitPredictionInput,
// ) => {
//     const session = await auth();

//     if (!session?.user?.id) {
//         throw new Error('Unauthorized');
//     }

//     await submitPrediction({
//         userId: session.user.id,
//         matchId: payload.matchId,
//         homeScore: payload.homeScore,
//         awayScore: payload.awayScore,
//     });

//     const match = await getMatchById(payload.matchId);

//     return { success: true, match };
// };
