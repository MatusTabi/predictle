import {
    addTournamentMatchAction,
    endTournamentMatchAction,
} from '@/backend/matches/action';
import { getRecentUnendedTournamentMatches } from '@/backend/matches/service';
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

    const recentMatches = await getRecentUnendedTournamentMatches(
        tournament.id,
    );
    const addMatchAction = addTournamentMatchAction.bind(null, tournament.slug);
    const endMatchAction = endTournamentMatchAction.bind(null, tournament.slug);

    return (
        <main className="flex flex-col flex-1 min-w-0 gap-4 p-4 sm:gap-6 sm:p-6 lg:p-8">
            <section className="border border-inverse-on-surface rounded-lg bg-primary-container p-5 sm:p-8">
                <h1 className="text-3xl font-bold text-on-surface sm:text-5xl">
                    Edit Matches
                </h1>
                <p className="mt-4 text-on-surface/70">
                    Add, edit, or remove matches for the tournament. Changes
                    will reflect on the tournament prediction page for users to
                    submit their predictions.
                </p>
            </section>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-6">
                <form
                    action={addMatchAction}
                    className="flex w-full flex-col gap-5 rounded-lg border border-inverse-on-surface p-5 sm:p-8 lg:h-130 lg:w-1/2"
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

                    <Button className="mt-2 h-12 w-full px-6 font-semibold text-on-primary sm:w-fit">
                        Add match
                    </Button>
                </form>
                <section className="flex w-full flex-col rounded-lg border border-inverse-on-surface p-5 text-on-surface/70 sm:p-8 lg:h-130 lg:w-1/2 lg:overflow-hidden">
                    <h2 className="mb-4 text-2xl font-bold text-on-surface">
                        Manage recent matches
                    </h2>
                    <p className="mb-6 text-on-surface/70">
                        Set final scores for matches scheduled before the next 4
                        hours. Submitting a score marks the match as ended.
                    </p>

                    {recentMatches.length === 0 ? (
                        <p className="rounded-lg border border-inverse-on-surface bg-surface p-4 text-on-surface/70">
                            No matches are ready to be ended.
                        </p>
                    ) : (
                        <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pb-4 pr-2 lg:max-h-none lg:flex-1">
                            {recentMatches.map((match) => (
                                <form
                                    key={match.id}
                                    action={endMatchAction}
                                    className="flex min-h-64 flex-col rounded-lg border border-inverse-on-surface bg-primary-container p-4 text-on-surface sm:min-h-40"
                                >
                                    <input
                                        type="hidden"
                                        name="matchId"
                                        value={match.id}
                                    />

                                    <div className="grid w-full grid-cols-1 items-center gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
                                        <span className="min-w-0 text-center font-medium sm:justify-self-end sm:text-right">
                                            {match.homeTeam}
                                        </span>
                                        <div className="flex items-center justify-center sm:mx-2">
                                            <input
                                                required
                                                min={0}
                                                name="homeScore"
                                                className="h-12 w-12 rounded-md bg-surface-container-lowest p-2 text-center text-3xl font-bold sm:w-10 sm:text-4xl"
                                                placeholder="0"
                                            />
                                            <span className="mx-2">-</span>
                                            <input
                                                required
                                                min={0}
                                                name="awayScore"
                                                className="h-12 w-12 rounded-md bg-surface-container-lowest p-2 text-center text-3xl font-bold sm:w-10 sm:text-4xl"
                                                placeholder="0"
                                            />
                                        </div>
                                        <span className="min-w-0 text-center font-medium sm:justify-self-start sm:text-left">
                                            {match.awayTeam}
                                        </span>
                                    </div>

                                    <div className="mb-4 mt-2 text-center text-sm text-on-surface-variant sm:mt-0">
                                        {match.date}{' '}
                                        {match.startTime.slice(0, 5)}
                                    </div>

                                    <Button className="mt-auto h-11 w-full rounded-md border-none bg-tertiary-container text-on-tertiary-container">
                                        End match
                                    </Button>
                                </form>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default CreateTournamentMatchPage;
