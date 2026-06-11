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
        <div className="flex flex-col flex-1 min-w-0 gap-4 p-4 sm:p-6 lg:p-8">
            {data.activeTournaments.length > 0 ? (
                <ActiveTournamentComponent
                    tournaments={data.activeTournaments}
                />
            ) : (
                <NoTournamentComponent />
            )}
            <section className="flex w-full flex-col gap-4">
                <div className="flex items-center justify-between gap-4 border-b border-on-surface/70 pb-4">
                    <div className="flex min-w-0 flex-col justify-start">
                        <h1 className="text-2xl font-bold text-on-surface sm:text-3xl">
                            Available Tournaments
                        </h1>
                        <h2 className="text-base text-on-surface/70 sm:text-lg">
                            Join an existing tournament or create your own
                        </h2>
                    </div>
                    <Button
                        asChild
                        className="h-12 w-12 shrink-0 px-0 font-semibold text-on-primary sm:w-auto sm:px-4"
                    >
                        <Link href="/tournament/create">
                            <Plus className="w-5 h-5" />
                            <span className="hidden sm:inline">
                                Create tournament
                            </span>
                        </Link>
                    </Button>
                </div>
            </section>
            <section className="w-full max-w-full overflow-x-hidden md:overflow-x-auto">
                <div className="flex w-full flex-col gap-4 md:w-max md:min-w-max md:flex-row md:gap-8">
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
