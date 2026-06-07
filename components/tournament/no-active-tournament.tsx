import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import TournamentCard from './tournament-card';
import NoTournamentComponent from './no-tournament-component';
import ActiveTournamentComponent from './active-tournament-component';
import { Tournament } from '@/backend/tournament/types';
import CreateTournamentCard from './create-tournament-card';

type NoActiveTournamentsProps = {
    tournaments: Tournament[];
    isParticipant?: boolean;
};

const NoActiveTournaments = ({
    tournaments,
    isParticipant,
}: NoActiveTournamentsProps) => (
    <div className="flex flex-col flex-1 min-w-0 gap-4 p-8">
        {isParticipant ? (
            <ActiveTournamentComponent tournaments={tournaments} />
        ) : (
            <NoTournamentComponent />
        )}
        <section className="flex flex-col gap-4 w-full">
            <div className="flex justify-between items-center border-b border-on-surface/70 pb-4">
                <div className="flex flex-col justify-start">
                    <h1 className="text-2xl font-bold text-on-surface">
                        Available Tournaments
                    </h1>
                    <h2 className="text-lg text-on-surface/70">
                        Join an existing tournament or create your own
                    </h2>
                </div>
                <Button className="h-12 px-4 font-semibold text-on-primary">
                    <Plus className="w-5 h-5" />
                    Create tournament
                </Button>
            </div>
        </section>
        <section className="w-full overflow-x-auto max-w-full">
            <div className="flex gap-8 w-max min-w-max">
                {tournaments.length === 0 ? (
                    <CreateTournamentCard />
                ) : (
                    tournaments.map((tournament, index) => (
                        <TournamentCard key={index} tournament={tournament} />
                    ))
                )}
            </div>
        </section>
    </div>
);

export default NoActiveTournaments;
