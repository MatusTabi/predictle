import { addTournamentMatchAction } from '@/backend/matches/action';
import { getTournamentBySlug } from '@/backend/tournament/service';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';

type CreateTournamentMatchPageProps = {
    params: Promise<{ slug: string }>;
};

const CreateTournamentMatchPage = async ({
    params,
}: CreateTournamentMatchPageProps) => {
    const { slug } = await params;
    const tournament = await getTournamentBySlug(slug);

    if (!tournament) {
        notFound();
    }

    const action = addTournamentMatchAction.bind(null, tournament.slug);

    return (
        <main className="flex flex-col flex-1 min-w-0 gap-6 p-8">
            <section className="border border-inverse-on-surface rounded-lg p-8 bg-primary-container">
                <h1 className="text-5xl font-bold text-on-surface">
                    Add Matches
                </h1>
                <p className="mt-4 text-on-surface/70">
                    Add a match to {tournament.title}. It will appear on the
                    tournament prediction page for its scheduled date.
                </p>
            </section>

            <form
                action={action}
                className="border border-inverse-on-surface rounded-lg p-8 flex flex-col gap-5 max-w-2xl"
            >
                <label className="flex flex-col gap-2 font-medium">
                    Home team
                    <input
                        required
                        name="homeTeam"
                        className="h-12 rounded-lg border border-inverse-on-surface bg-surface px-4 text-on-surface"
                        placeholder="Home team"
                    />
                </label>

                <label className="flex flex-col gap-2 font-medium">
                    Away team
                    <input
                        required
                        name="awayTeam"
                        className="h-12 rounded-lg border border-inverse-on-surface bg-surface px-4 text-on-surface"
                        placeholder="Away team"
                    />
                </label>

                <label className="flex flex-col gap-2 font-medium">
                    Start date and time
                    <input
                        required
                        name="startsAt"
                        type="datetime-local"
                        className="h-12 rounded-lg border border-inverse-on-surface bg-surface px-4 text-on-surface"
                    />
                </label>

                <Button className="mt-2 h-12 w-fit px-6 font-semibold text-on-primary">
                    Add match
                </Button>
            </form>
        </main>
    );
};

export default CreateTournamentMatchPage;
