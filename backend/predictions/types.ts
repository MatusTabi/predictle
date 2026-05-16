export type PredictionRequestDTO = {
    userId: string;
    matchId: string;

    homeScore: number;
    awayScore: number;
};

export type PredictionResponseDTO = {
    id: string;
    userId: string;
    matchId: string;

    homeScore: number;
    awayScore: number;
};
