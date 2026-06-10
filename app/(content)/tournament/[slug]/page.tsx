import {
    getTournamentBySlug,
    getTournamentParticipants,
} from '@/backend/tournament/service';
import { Users } from 'lucide-react';
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
            <section className="border border-inverse-on-surface rounded-lg p-8 bg-primary-container">
                <div className="flex flex-wrap gap-2">
                    <span className="self-start bg-surface text-on-surface px-4 py-2 rounded-full border border-inverse-on-surface text-sm font-medium">
                        {tournament.category}
                    </span>
                    <span className="self-start bg-surface text-on-surface px-4 py-2 rounded-full border border-inverse-on-surface text-sm font-medium">
                        {tournament.isLive ? 'Live' : 'Upcoming'}
                    </span>
                </div>
                <h1 className="text-5xl font-bold mt-6 text-on-surface">
                    {tournament.title}
                </h1>
                <div className="flex flex-wrap gap-6 mt-6 text-on-surface/70">
                    <span>Starts {startDate}</span>
                    <span className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        {participants.length}{' '}
                        {participants.length === 1 ? 'player' : 'players'}
                    </span>
                </div>
            </section>

            <section className="border border-inverse-on-surface rounded-lg p-8">
                <h2 className="text-2xl font-bold text-on-surface">
                    Leaderboard
                </h2>
                {participants.length === 0 ? (
                    <p className="mt-4 text-on-surface/70">
                        No participants have joined this tournament yet.
                    </p>
                ) : (
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-on-surface/20">
                                <tr>
                                    <th className="py-3 pr-4">Rank</th>
                                    <th className="py-3 pr-4">Player</th>
                                    <th className="py-3 pr-4">Predictions</th>
                                    <th className="py-3 pr-4">Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {participants.map((participant) => (
                                    <tr
                                        key={participant.id}
                                        className="border-b border-on-surface/10"
                                    >
                                        <td className="py-3 pr-4">
                                            {participant.rank}
                                        </td>
                                        <td className="py-3 pr-4">
                                            {participant.userName}
                                        </td>
                                        <td className="py-3 pr-4">
                                            {participant.totalPredictions ?? 0}
                                        </td>
                                        <td className="py-3 pr-4">
                                            {participant.points ?? 0}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    );
};

export default TournamentDetailPage;
