import { TournamentDTO } from '@/backend/tournament/types';
import { Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

type ActiveTournamentComponentProps = {
    tournaments: TournamentDTO[];
};

const ActiveTournamentComponent = ({
    tournaments,
}: ActiveTournamentComponentProps) => (
    <>
        <section className="flex w-full flex-col items-center gap-4">
            <div className="flex justify-between w-full">
                <h1 className="text-2xl font-bold text-on-surface sm:text-3xl">
                    Your Active Tournaments
                </h1>
            </div>
        </section>
        <section className="w-full max-w-full overflow-x-hidden md:overflow-x-auto">
            <div className="flex w-full flex-col gap-4 md:w-max md:min-w-max md:flex-row md:gap-8">
                {tournaments.map((tournament) => (
                    <div
                        key={tournament.id}
                        className="flex min-h-64 w-full flex-col justify-center gap-2 rounded-lg border border-inverse-on-surface p-5 sm:p-8 md:h-64 md:w-120 md:shrink-0"
                    >
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
                        <h1 className="text-2xl font-semibold">
                            {tournament.title}
                        </h1>
                        <div className="flex gap-2 items-center">
                            <Users className="w-5 h-5" />
                            <span className="text-on-surface/70 text-sm">
                                {tournament.players}{' '}
                                {tournament.players === 1
                                    ? 'player'
                                    : 'players'}
                            </span>
                        </div>
                        <Button
                            asChild
                            className="mt-2 h-12 w-full p-2 font-semibold text-on-primary sm:w-1/2"
                        >
                            <Link href={`/tournament/${tournament.slug}`}>
                                Visit tournament
                            </Link>
                        </Button>
                    </div>
                ))}
            </div>
        </section>
    </>
);

export default ActiveTournamentComponent;
