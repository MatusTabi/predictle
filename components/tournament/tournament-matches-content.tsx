'use client';

import type { TournamentTableRow } from '@/backend/leaderboard/types';
import type {
    TournamentMatchesByDayDTO,
    TournamentMatchWithPredictionsDTO,
} from '@/backend/matches/types';
import DateNavigator from '@/components/filter/date-navigator';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

type TournamentMatchesContentProps = {
    tournamentSlug: string;
    selectedDate: string;
    days: TournamentMatchesByDayDTO[];
    participants: TournamentTableRow[];
};

const dateFormatter = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
});

const formatDate = (date: string) => {
    return dateFormatter.format(new Date(`${date}T00:00:00`));
};

const toDateParam = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const hasMatchStarted = (match: TournamentMatchWithPredictionsDTO) => {
    return new Date() >= new Date(`${match.date}T${match.startTime}`);
};

const TournamentMatchesContent = ({
    tournamentSlug,
    selectedDate,
    days,
    participants,
}: TournamentMatchesContentProps) => {
    const router = useRouter();

    if (days.length === 0) {
        return (
            <div className="flex flex-col gap-4">
                <DateNavigator
                    value={new Date(`${selectedDate}T00:00:00`)}
                    onChange={(date) => {
                        startTransition(() => {
                            router.push(
                                `/tournament/${tournamentSlug}/matches?date=${toDateParam(date)}`,
                            );
                        });
                    }}
                />
                <section className="rounded-lg border border-inverse-on-surface p-8 text-on-surface/70">
                    No matches are scheduled for this tournament on this date.
                </section>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <DateNavigator
                value={new Date(`${selectedDate}T00:00:00`)}
                onChange={(date) => {
                    startTransition(() => {
                        router.push(
                            `/tournament/${tournamentSlug}/matches?date=${toDateParam(date)}`,
                        );
                    });
                }}
            />
            {days.map((day) => (
                <section
                    key={day.date}
                    className="rounded-lg border border-inverse-on-surface bg-surface p-5 sm:p-8"
                >
                    <h2 className="text-2xl font-bold text-on-surface">
                        {formatDate(day.date)}
                    </h2>
                    <div className="mt-5 grid gap-4 xl:grid-cols-2">
                        {day.matches.map((match) => (
                            <article
                                key={match.id}
                                className="flex min-w-0 flex-col gap-4"
                            >
                                <div className="flex min-w-0 flex-col rounded-lg border border-inverse-on-surface bg-primary-container p-4">
                                    <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 text-on-surface">
                                        <span className="min-w-0 text-right font-semibold">
                                            {match.homeTeam}
                                        </span>
                                        <span className="text-center text-2xl font-bold text-on-surface">
                                            {match.hasEnded &&
                                            match.homeScore !== null &&
                                            match.awayScore !== null
                                                ? `${match.homeScore} - ${match.awayScore}`
                                                : ':'}
                                        </span>
                                        <span className="min-w-0 font-semibold">
                                            {match.awayTeam}
                                        </span>
                                    </div>
                                    <div className="mt-2 text-center text-sm text-on-surface-variant">
                                        {match.date}{' '}
                                        {match.startTime.slice(0, 5)}
                                    </div>
                                </div>

                                <div className="max-h-60 overflow-y-auto rounded-lg border border-inverse-on-surface bg-surface">
                                    {!hasMatchStarted(match) ? (
                                        <p className="p-4 text-sm text-on-surface/70">
                                            User predictions are hidden until
                                            this match starts.
                                        </p>
                                    ) : participants.length === 0 ? (
                                        <p className="p-4 text-sm text-on-surface/70">
                                            No participants have joined this
                                            tournament yet.
                                        </p>
                                    ) : (
                                        <table className="w-full table-fixed text-left text-sm">
                                            <thead className="border-b border-inverse-on-surface text-on-surface/70">
                                                <tr>
                                                    <th className="w-3/5 px-3 py-3 font-medium sm:px-4">
                                                        User
                                                    </th>
                                                    <th className="w-2/5 px-3 py-3 text-right font-medium sm:px-4">
                                                        Prediction
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {participants.map(
                                                    (participant) => {
                                                        const prediction =
                                                            match.predictions.find(
                                                                (prediction) =>
                                                                    prediction.userId ===
                                                                    participant.userId,
                                                            );

                                                        return (
                                                            <tr
                                                                key={
                                                                    participant.userId
                                                                }
                                                                className="border-b border-inverse-on-surface last:border-b-0"
                                                            >
                                                                <td className="truncate px-3 py-3 font-medium text-on-surface sm:px-4">
                                                                    <span
                                                                        title={
                                                                            participant.userName
                                                                        }
                                                                    >
                                                                        {
                                                                            participant.userName
                                                                        }
                                                                    </span>
                                                                </td>
                                                                <td className="px-3 py-3 text-right font-bold text-on-surface sm:px-4">
                                                                    {prediction
                                                                        ? `${prediction.homeScore} - ${prediction.awayScore}`
                                                                        : '-'}
                                                                </td>
                                                            </tr>
                                                        );
                                                    },
                                                )}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default TournamentMatchesContent;
