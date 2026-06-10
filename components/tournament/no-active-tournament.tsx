'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import TournamentCard from './tournament-card';
import NoTournamentComponent from './no-tournament-component';
import ActiveTournamentComponent from './active-tournament-component';
import CreateTournamentCard from './create-tournament-card';
import { TournamentDTO } from '@/backend/tournament/types';
import { useTournamentsQuery } from '@/backend/tournament/query';

type NoActiveTournamentsProps = {
    activeTournaments: TournamentDTO[];
    availableTournaments: TournamentDTO[];
};

const NoActiveTournaments = ({
    activeTournaments,
    availableTournaments,
}: NoActiveTournamentsProps) => {
    const { data } = useTournamentsQuery({
        activeTournaments,
        availableTournaments,
    });

    return (
        <div className="flex flex-col flex-1 min-w-0 gap-4 p-8">
            {data.activeTournaments.length > 0 ? (
                <ActiveTournamentComponent
                    tournaments={data.activeTournaments}
                />
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
                    <Button
                        asChild
                        className="h-12 px-4 font-semibold text-on-primary"
                    >
                        <Link href="/tournament/create">
                            <Plus className="w-5 h-5" />
                            Create tournament
                        </Link>
                    </Button>
                </div>
            </section>
            <section className="w-full overflow-x-auto max-w-full">
                <div className="flex gap-8 w-max min-w-max">
                    {data.availableTournaments.length === 0 ? (
                        <CreateTournamentCard />
                    ) : (
                        data.availableTournaments.map((tournament) => (
                            <TournamentCard
                                key={tournament.id}
                                tournament={tournament}
                            />
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default NoActiveTournaments;
