export type MatchDTO = {
    homeTeam: string;
    awayTeam: string;
    homeScore: string | null;
    awayScore: string | null;
    startTime: string;
    date: string;
    isLive: boolean;
    hasEnded: boolean;
    predicted?: boolean;
};
