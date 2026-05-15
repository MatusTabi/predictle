export type MatchDTO = {
    homeTeam: string;
    awayTeam: string;
    homeScore: string | null;
    awayScore: string | null;
    startTime: string;
    isLive: boolean;
    predicted?: boolean;
};
