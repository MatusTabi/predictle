export type TournamentParticipantDTO = {
    id: string;

    userId: string;

    correctWinners: number | null;
    correctScores: number | null;
    totalPredictions: number | null;
    points: number | null;
};
