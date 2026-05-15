import MatchCard from './match';

type MatchSectionProps = {
    time: string;
    isOpen: boolean;
};

const MatchSection = ({ time, isOpen }: MatchSectionProps) => (
    <div className="flex flex-col items-baseline mb-4">
        <span className="rounded-2xl bg-primary text-on-primary p-2 mb-4">
            {time}
        </span>
        <div className="gap-4 flex w-full">
            <MatchCard isOpen={isOpen} />
            <MatchCard isOpen={isOpen} />
        </div>
    </div>
);

export default MatchSection;
