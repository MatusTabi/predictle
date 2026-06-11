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
