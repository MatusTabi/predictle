import { Match, Prediction } from '@/db';
import { MatchDTO } from './types';

export const dbMatchToDtoList = (matches: Match[]): MatchDTO[] => {
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
            predicted: false,
        };
    });
};

type MatchWithUserPrediction = {
    match: Match;
    userPrediction: Prediction | null;
};

export const dbMatchWithPredictionToDtoList = (
    rows: MatchWithUserPrediction[],
): MatchDTO[] => {
    return rows.map(({ match, userPrediction }) => {
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
            predicted: Boolean(userPrediction),
            userPrediction: userPrediction
                ? {
                      homeScore: userPrediction.homeScore,
                      awayScore: userPrediction.awayScore,
                  }
                : undefined,
        };
    });
};
