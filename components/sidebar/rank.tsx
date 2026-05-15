import { CircleStar } from 'lucide-react';

const Rank = () => (
    <div className="gap-4 flex items-center ps-8">
        <CircleStar />
        <div className="flex flex-col">
            <span className="text-2xl font-semibold">Rank: #1</span>
            <span className="text-sm text-muted-foreground">1000 Points</span>
        </div>
    </div>
);

export default Rank;
