import {
    getTournamentBySlug,
    getTournamentParticipants,
} from '@/backend/tournament/service';
import PredictionCallout from '@/components/tournament/prediction-callout';
import LeaderboardTable from '@/components/table/leaderboard/leaderboard';
import { Button } from '@/components/ui/button';
import { Pencil, Users } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type TournamentDetailPageProps = {
    params: Promise<{ slug: string }>;
};

const TournamentDetailPage = async ({ params }: TournamentDetailPageProps) => {
    const { slug } = await params;
    const tournament = await getTournamentBySlug(slug);

    if (!tournament) {
        notFound();
    }

    const participants = await getTournamentParticipants(tournament.id);
    const startDate = new Intl.DateTimeFormat('en', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(tournament.startDate));

    return (
        <main className="flex flex-col flex-1 min-w-0 gap-6 p-8">
            <section className="border border-inverse-on-surface rounded-lg p-8 bg-primary-container relative">
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
                <div className="flex flex-wrap gap-2">
                    <span className="self-start bg-surface text-on-surface px-4 py-2 rounded-full border border-inverse-on-surface text-sm font-medium">
                        {tournament.category}
                    </span>
                    <span className="self-start bg-surface text-on-surface px-4 py-2 rounded-full border border-inverse-on-surface text-sm font-medium">
                        {tournament.isLive ? 'Live' : 'Upcoming'}
                    </span>
                </div>
                <div className="mt-6 pr-40">
                    <h1 className="text-5xl font-bold text-on-surface">
                        {tournament.title}
                    </h1>
                </div>
                <div className="flex flex-wrap gap-6 mt-6 text-on-surface/70">
                    <span>Starts {startDate}</span>
                    <span className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        {participants.length}{' '}
                        {participants.length === 1 ? 'player' : 'players'}
                    </span>
                </div>
            </section>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
                <section className="border border-inverse-on-surface rounded-lg p-8 min-w-0 overflow-x-auto">
                    <h2 className="text-2xl font-bold text-on-surface mb-4">
                        Leaderboard
                    </h2>
                    <LeaderboardTable participants={participants} />
                </section>
                <PredictionCallout tournamentSlug={tournament.slug} />
            </div>
        </main>
    );
};

export default TournamentDetailPage;
