import { CircleStar } from 'lucide-react';

const Rank = () => (
    <div className="flex items-center gap-4 lg:ps-8">
        <CircleStar />
        <div className="flex flex-col">
            <span className="text-xl font-semibold sm:text-2xl">Rank: #1</span>
            <span className="text-sm text-muted-foreground">1000 Points</span>
        </div>
    </div>
);

export default Rank;
