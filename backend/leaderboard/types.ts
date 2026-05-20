export type TournamentParticipantDTO = {
    id: string;

    userId: string;
    userName: string;

    rank: number;
    correctWinners: number | null;
    correctScores: number | null;
    totalPredictions: number | null;
    points: number | null;
};
