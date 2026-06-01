import { Award, Medal, Trophy } from 'lucide-react';

const NoTournamentComponent = () => (
    <section className="border border-inverse-on-surface rounded-lg p-8 flex flex-col items-center gap-4 w-full bg-primary-container relative overflow-hidden">
        <div className="rounded-full h-64 w-64 bg-surface border border-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <Trophy className="w-32 h-32 animate-pulse" />
        </div>
        <h1 className="text-5xl font-bold mt-8 text-on-surface text-center">
            You don't have any active tournaments yet
        </h1>
        <p className="py-4">
            Join or create a group to start predicting tournament matches and
            climb the leaderboard.
        </p>
        <Award className="absolute -top-2 right-12 w-64 h-64 opacity-10 -rotate-12" />
        <Medal className="absolute -bottom-8 left-24 w-64 h-64 opacity-10 rotate-12" />
    </section>
);

export default NoTournamentComponent;
