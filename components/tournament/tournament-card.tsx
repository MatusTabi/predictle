import { Users } from 'lucide-react';
import { Button } from '../ui/button';

type TournamentCardProps = {
    isLive?: boolean;
};

const TournamentCard = ({ isLive }: TournamentCardProps) => {
    return (
        <div className="border rounded-lg border-inverse-on-surface p-8 flex flex-col justify-baseline gap-2 w-80 h-64 pt-12 shrink-0">
            <div className="flex gap-2">
                <span className="self-start bg-primary-container text-on-primary-container px-4 py-2 rounded-full border border-inverse-on-surface text-sm font-medium">
                    Football
                </span>
                {isLive ? (
                    <span className="self-start bg-primary-container text-on-primary-container px-4 py-2 rounded-full border border-inverse-on-surface text-sm font-medium flex gap-2 items-center">
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        Live
                    </span>
                ) : (
                    <span className="self-start bg-primary-container text-on-primary-container px-4 py-2 rounded-full border border-inverse-on-surface text-sm font-medium">
                        In 6 days
                    </span>
                )}
            </div>
            <h1 className="text-2xl font-semibold">FIFA World Cup 2026</h1>
            <div className="flex gap-2 items-center">
                <Users className="w-5 h-5" />
                <span className="text-on-surface/70 text-sm">4 players</span>
            </div>
            <Button className="mt-auto w-3/4 h-12 p-2 font-semibold text-on-primary">
                Join tournament
            </Button>
        </div>
    );
};

export default TournamentCard;
