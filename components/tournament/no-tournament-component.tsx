import { Award, Medal, Trophy } from 'lucide-react';

const NoTournamentComponent = () => (
    <section className="relative flex w-full flex-col items-center gap-4 overflow-hidden rounded-lg border border-inverse-on-surface bg-primary-container p-5 sm:p-8">
        <div className="flex h-36 w-36 items-center justify-center rounded-full border border-primary bg-surface shadow-lg shadow-primary/30 sm:h-64 sm:w-64">
            <Trophy className="h-20 w-20 animate-pulse sm:h-32 sm:w-32" />
        </div>
        <h1 className="mt-4 text-center text-3xl font-bold text-on-surface sm:mt-8 sm:text-5xl">
            You don&apos;t have any active tournaments yet
        </h1>
        <p className="py-4 text-center">
            Join or create a group to start predicting tournament matches and
            climb the leaderboard.
        </p>
        <Award className="absolute -top-2 right-2 h-32 w-32 -rotate-12 opacity-10 sm:right-12 sm:h-64 sm:w-64" />
        <Medal className="absolute -bottom-8 left-2 h-32 w-32 rotate-12 opacity-10 sm:left-24 sm:h-64 sm:w-64" />
    </section>
);

export default NoTournamentComponent;
