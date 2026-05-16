export type MatchDTO = {
    id: string;
    externalId: string;
    homeTeam: string;
    awayTeam: string;
    homeScore: number | null;
    awayScore: number | null;
    startTime: string;
    date: string;
    isLive: boolean;
    hasEnded: boolean;
    predicted?: boolean;
};
