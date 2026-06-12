import { db, matches, predictions, tournamentParticipant } from '@/db';
import { and, eq, isNotNull } from 'drizzle-orm';

type ParticipantStats = {
    correctWinners: number;
    correctScores: number;
    points: number;
};

const emptyStats = (): ParticipantStats => ({
    correctWinners: 0,
    correctScores: 0,
    points: 0,
});

const getMatchResult = (homeScore: number, awayScore: number) => {
    if (homeScore > awayScore) {
        return 'home';
    }

    if (homeScore < awayScore) {
        return 'away';
    }

    return 'draw';
};

export const scoreFinishedTournamentMatches = async () => {
    return await db.transaction(async (tx) => {
        const predictionRows = await tx
            .select({
                userId: predictions.userId,
                homePrediction: predictions.homeScore,
                awayPrediction: predictions.awayScore,
                homeScore: matches.homeScore,
                awayScore: matches.awayScore,
                tournamentId: matches.tournamentId,
            })
            .from(predictions)
            .innerJoin(matches, eq(predictions.matchId, matches.id))
            .where(
                and(
                    isNotNull(matches.tournamentId),
                    isNotNull(matches.homeScore),
                    isNotNull(matches.awayScore),
                ),
            );

        const statsByParticipant = new Map<string, ParticipantStats>();

        for (const row of predictionRows) {
            if (
                row.tournamentId === null ||
                row.homeScore === null ||
                row.awayScore === null
            ) {
                continue;
            }

            const key = `${row.tournamentId}:${row.userId}`;
            const stats = statsByParticipant.get(key) ?? emptyStats();

            if (
                row.homePrediction === row.homeScore &&
                row.awayPrediction === row.awayScore
            ) {
                stats.correctScores += 1;
                stats.points += 3;
            } else if (
                getMatchResult(row.homePrediction, row.awayPrediction) ===
                getMatchResult(row.homeScore, row.awayScore)
            ) {
                stats.correctWinners += 1;
                stats.points += 1;
            }

            statsByParticipant.set(key, stats);
        }

        const participants = await tx.select().from(tournamentParticipant);

        for (const participant of participants) {
            const stats =
                statsByParticipant.get(
                    `${participant.tournamentId}:${participant.userId}`,
                ) ?? emptyStats();

            await tx
                .update(tournamentParticipant)
                .set({
                    correctWinners: stats.correctWinners,
                    correctScores: stats.correctScores,
                    points: stats.points,
                })
                .where(eq(tournamentParticipant.id, participant.id));
        }

        return {
            finishedPredictions: predictionRows.length,
            updatedParticipants: participants.length,
        };
    });
};
