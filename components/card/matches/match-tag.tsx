import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';

type MatchTagProps = {
    className?: string;
};

const LiveMatchTag = ({ className }: MatchTagProps) => (
    <div
        className={cn(
            'flex items-center gap-2 rounded-bl-lg rounded-tr-lg bg-error px-2 py-2 text-xs font-semibold',
            className,
        )}
    >
        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="text-on-error">LIVE</span>
    </div>
);

const PredictedMatchTag = ({ className }: MatchTagProps) => (
    <div
        className={cn(
            'flex items-center gap-2 bg-secondary text-on-secondary rounded-bl-lg rounded-tr-lg px-3 py-2 text-xs font-semibold',
            className,
        )}
    >
        <CircleCheck className="text-on-secondary" size={14} />
        <span className="text-on-secondary">PREDICTED</span>
    </div>
);

const OpenMatchTag = () => (
    <div className="bg-tertiary-container text-on-tertiary-container rounded-bl-lg rounded-tr-lg px-3 py-2 text-xs font-semibold">
        OPEN
    </div>
);

const FinishedTag = ({ className }: MatchTagProps) => (
    <div
        className={cn(
            'bg-secondary text-on-secondary rounded-bl-lg rounded-tr-lg px-3 py-2 text-xs font-semibold',
            className,
        )}
    >
        FINISHED
    </div>
);

export { LiveMatchTag, PredictedMatchTag, OpenMatchTag, FinishedTag };
