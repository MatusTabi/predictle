import { Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Tournament } from '@/backend/tournament/types';

type TournamentCardProps = {
    tournament: Tournament;
};

const TournamentCard = ({ tournament }: TournamentCardProps) => {
    return (
        <div className="border rounded-lg border-inverse-on-surface p-8 flex flex-col justify-center gap-2 w-80 h-64 shrink-0">
            <div className="flex gap-2">
                <span className="self-start bg-primary-container text-on-primary-container px-4 py-2 rounded-full border border-inverse-on-surface text-sm font-medium">
                    {tournament.category}
                </span>
                {tournament.isLive ? (
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
            <h1 className="text-2xl font-semibold">{tournament.title}</h1>
            <div className="flex gap-2 items-center">
                <Users className="w-5 h-5" />
                <span className="text-on-surface/70 text-sm">
                    {tournament.players}{' '}
                    {tournament.players === 1 ? 'player' : 'players'}
                </span>
            </div>
            <Button className="mt-2 w-3/4 h-12 p-2 font-semibold text-on-primary">
                Join tournament
            </Button>
        </div>
    );
};

export default TournamentCard;
