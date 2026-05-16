import { MatchDTO } from '@/backend/matches/types';
import MainHeader from './main-header';
import MatchSection from './match-section';

type MatchesProps = {
    matches: MatchDTO[];
};

const Matches = ({ matches }: MatchesProps) => {
    const matchesByTime = matches.reduce(
        (acc, match) => {
            const time = match.startTime;
            if (!acc[time]) {
                acc[time] = [];
            }
            acc[time].push(match);
            return acc;
        },
        {} as Record<string, MatchDTO[]>,
    );

    return (
        <div className="flex flex-col">
            <MainHeader />
            {Object.entries(matchesByTime)
                .sort(([timeA], [timeB]) =>
                    timeA.localeCompare(timeB, undefined, { numeric: true }),
                )
                .map(([time, matches]) => (
                    <MatchSection key={time} match={matches} />
                ))}
        </div>
    );
};

export default Matches;
