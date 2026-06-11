import { getTournamentMatchesByDate } from '@/backend/matches/service';
import { getTournamentBySlug } from '@/backend/tournament/service';
import TournamentPredictionsContent from '@/components/tournament/tournament-predictions-content';
import { notFound } from 'next/navigation';

type TournamentPredictionsPageProps = {
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

const TournamentPredictionsPage = async ({
    params,
    searchParams,
}: TournamentPredictionsPageProps) => {
    const [{ slug }, { date }] = await Promise.all([params, searchParams]);
    const tournament = await getTournamentBySlug(slug);

    if (!tournament) {
        notFound();
    }

    const selectedDate = date ?? today();
    const matches = await getTournamentMatchesByDate(
        tournament.id,
        selectedDate,
    );

    return (
        <main className="flex flex-col flex-1 min-w-0 gap-6 p-8">
            <section className="border border-inverse-on-surface rounded-lg p-8 bg-primary-container">
                <h1 className="text-5xl font-bold text-on-surface">
                    {tournament.title} Predictions
                </h1>
                <p className="mt-4 text-on-surface/70">
                    Choose a date and submit predictions for tournament matches.
                </p>
            </section>
            <TournamentPredictionsContent
                tournamentSlug={tournament.slug}
                selectedDate={selectedDate}
                matches={matches}
            />
        </main>
    );
};

export default TournamentPredictionsPage;
