'use client';

import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

import type { MatchDTO } from '@/backend/matches/types';
import Matches from '@/components/card/matches/matches';
import DateNavigator from '@/components/filter/date-navigator';

type TournamentPredictionsContentProps = {
    tournamentSlug: string;
    selectedDate: string;
    matches: MatchDTO[];
};

const toDateParam = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const TournamentPredictionsContent = ({
    tournamentSlug,
    selectedDate,
    matches,
}: TournamentPredictionsContentProps) => {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-4">
            <DateNavigator
                value={new Date(`${selectedDate}T00:00:00`)}
                onChange={(date) => {
                    startTransition(() => {
                        router.push(
                            `/tournament/${tournamentSlug}/predictions?date=${toDateParam(date)}`,
                        );
                    });
                }}
            />
            {matches.length === 0 ? (
                <div className="border border-inverse-on-surface rounded-lg p-8 text-on-surface/70">
                    No matches are scheduled for this tournament on this date.
                </div>
            ) : (
                <Matches matches={matches} />
            )}
        </div>
    );
};

export default TournamentPredictionsContent;
