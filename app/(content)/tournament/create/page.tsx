import { createTournamentAction } from '@/backend/tournament/action';
import CreateTournamentSubmitButton from '@/components/tournament/create-tournament-submit-button';

const CreateTournamentPage = () => {
    return (
        <main className="flex flex-col flex-1 min-w-0 gap-6 p-8">
            <section className="border border-inverse-on-surface rounded-lg p-8 bg-primary-container">
                <h1 className="text-5xl font-bold text-on-surface">
                    Create Tournament
                </h1>
                <p className="mt-4 text-on-surface/70">
                    Start a new tournament and invite players to compete on
                    predictions.
                </p>
            </section>

            <form
                action={createTournamentAction}
                className="border border-inverse-on-surface rounded-lg p-8 flex flex-col gap-5 max-w-2xl"
            >
                <label className="flex flex-col gap-2 font-medium">
                    Tournament name
                    <input
                        required
                        name="name"
                        className="h-12 rounded-lg border border-inverse-on-surface bg-surface px-4 text-on-surface"
                        placeholder="Office Playoffs"
                    />
                </label>

                <label className="flex flex-col gap-2 font-medium">
                    Category
                    <input
                        required
                        name="category"
                        className="h-12 rounded-lg border border-inverse-on-surface bg-surface px-4 text-on-surface"
                        placeholder="Hockey"
                    />
                </label>

                <label className="flex flex-col gap-2 font-medium">
                    Start date
                    <input
                        required
                        name="startDate"
                        type="datetime-local"
                        className="h-12 rounded-lg border border-inverse-on-surface bg-surface px-4 text-on-surface"
                    />
                </label>

                <CreateTournamentSubmitButton />
            </form>
        </main>
    );
};

export default CreateTournamentPage;
