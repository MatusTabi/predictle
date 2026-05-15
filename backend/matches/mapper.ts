import { MatchSchema } from './schema';
import { MatchDTO } from './types';

export const mapMatchTypeToMatchDTO = (matches: MatchSchema[]): MatchDTO[] => {
    return matches.map((match) => ({
        homeTeam: match.strHomeTeam,
        awayTeam: match.strAwayTeam,
        homeScore: match.intHomeScore,
        awayScore: match.intAwayScore,
        startTime: match.strTimeLocal,
        date: match.dateEventLocal,
        isLive:
            new Date(match.dateEventLocal) <= new Date() &&
            (match.intHomeScore === null || match.intAwayScore === null),
        hasEnded:
            new Date(match.dateEventLocal) < new Date() ||
            (match.intHomeScore !== null && match.intAwayScore !== null),
    }));
};
