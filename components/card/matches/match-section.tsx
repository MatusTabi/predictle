import { MatchDTO } from '@/backend/matches/types';
import MatchCard from './match';

type MatchSectionProps = {
    match: MatchDTO[];
};

const MatchSection = ({ match }: MatchSectionProps) => (
    <div className="flex flex-col items-baseline mb-4">
        <span className="rounded-2xl bg-primary text-on-primary p-2 mb-4">
            {match[0].startTime.slice(0, 5)}
        </span>
        <div className="gap-4 flex w-full">
            {match.map((m) => (
                <MatchCard key={m.id} match={m} />
            ))}
        </div>
    </div>
);

export default MatchSection;
