export type MatchDTO = {
    id: string;
    externalId: string;

    homeTeam: string;
    awayTeam: string;
    homeScore: number | null;
    awayScore: number | null;

    startTime: string;
    date: string;

    hasEnded: boolean;
    predicted: boolean;

    userPrediction?: {
        homeScore: number;
        awayScore: number;
    };
};

export type TournamentMatchPredictionDTO = {
    userId: string;
    userName: string;
    homeScore: number;
    awayScore: number;
};

export type TournamentMatchWithPredictionsDTO = {
    id: string;
    externalId: string;
    homeTeam: string;
    awayTeam: string;
    homeScore: number | null;
    awayScore: number | null;
    startTime: string;
    date: string;
    hasEnded: boolean;
    predictions: TournamentMatchPredictionDTO[];
};

export type TournamentMatchesByDayDTO = {
    date: string;
    matches: TournamentMatchWithPredictionsDTO[];
};
