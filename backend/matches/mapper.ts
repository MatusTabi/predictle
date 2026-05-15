import { MatchSchema, MatchType } from './schema';
import { MatchDTO } from './types';

export const mapMatchTypeToMatchDTO = (matches: MatchSchema[]): MatchDTO[] => {
    return matches.map((match) => ({
        homeTeam: match.strHomeTeam,
        awayTeam: match.strAwayTeam,
        homeScore: match.intHomeScore,
        awayScore: match.intAwayScore,
        startTime: match.strTimeLocal,
        isLive:
            new Date(match.strTimeLocal) <= new Date() &&
            (match.intHomeScore === null || match.intAwayScore === null),
    }));
};
