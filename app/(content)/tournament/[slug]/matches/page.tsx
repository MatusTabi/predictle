import { getTournamentMatchesWithPredictions } from '@/backend/matches/service';
import {
    getTournamentBySlug,
    getTournamentParticipants,
} from '@/backend/tournament/service';
import TournamentMatchesContent from '@/components/tournament/tournament-matches-content';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type TournamentMatchesPageProps = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ date?: string }>;
};

const today = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const TournamentMatchesPage = async ({
    params,
    searchParams,
}: TournamentMatchesPageProps) => {
    const [{ slug }, { date }] = await Promise.all([params, searchParams]);
    const tournament = await getTournamentBySlug(slug);

    if (!tournament) {
        notFound();
    }

    const selectedDate = date ?? today();
    const [days, participants] = await Promise.all([
        getTournamentMatchesWithPredictions(tournament.id, selectedDate),
        getTournamentParticipants(tournament.id),
    ]);

    return (
        <main className="flex flex-col flex-1 min-w-0 gap-6 p-4 sm:p-6 lg:p-8">
            <section className="relative rounded-lg border border-inverse-on-surface bg-primary-container p-5 sm:p-8">
                <Button
                    asChild
                    className="absolute right-4 top-4 h-12 w-12 px-0 font-semibold text-on-primary sm:w-auto sm:px-4"
                >
                    <Link
                        href={`/tournament/${tournament.slug}/matches/edit`}
                        aria-label="Edit matches"
                        title="Edit matches"
                    >
                        <Pencil className="w-5 h-5" />
                        <span className="hidden sm:inline">Edit matches</span>
                    </Link>
                </Button>
                <span className="inline-flex rounded-full border border-inverse-on-surface bg-surface px-4 py-2 text-sm font-medium text-on-surface">
                    {tournament.category}
                </span>
                <div className="mt-6 pr-0 sm:pr-40">
                    <h1 className="text-3xl font-bold text-on-surface sm:text-5xl">
                        {tournament.title} Matches
                    </h1>
                    <p className="mt-4 max-w-2xl text-on-surface/70">
                        Review every scheduled match by day and compare all
                        submitted user predictions after each match starts.
                    </p>
                </div>
            </section>

            <TournamentMatchesContent
                tournamentSlug={tournament.slug}
                selectedDate={selectedDate}
                days={days}
                participants={participants}
            />
        </main>
    );
};

export default TournamentMatchesPage;
