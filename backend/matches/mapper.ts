import { Match } from '@/db';
import { MatchDTO } from './types';

export const dbMatchtoDtoList = (matches: Match[]): MatchDTO[] => {
    return matches.map((match) => {
        const matchDate = new Date(`${match.date}T${match.time}`);

        const now = new Date();

        const hasScore = match.homeScore !== null && match.awayScore !== null;
        const started = matchDate <= now;
        const isLive = started && !hasScore;
        const hasEnded = hasScore;

        return {
            id: match.id,
            externalId: match.externalId,

            homeTeam: match.homeTeam,
            awayTeam: match.awayTeam,

            homeScore: match.homeScore,
            awayScore: match.awayScore,

            startTime: match.time,
            date: match.date,

            isLive,
            hasEnded,
        };
    });
};
