'use client';

import { useState } from 'react';
import DateNavigator from '../filter/date-navigator';
import { MatchDTO } from '@/backend/matches/types';
import MatchCard from '../card/matches/match';
import TournamentTable from '../table/tournament-table';

type TournamentContentProps = {
    matches: MatchDTO[];
};

const TournamentContent = ({ matches }: TournamentContentProps) => {
    const [date, setDate] = useState<Date>(new Date());
    const filteredMatchesByDate = matches.filter((match) => {
        const matchDate = new Date(match.date);

        return (
            matchDate.getDate() === date.getDate() &&
            matchDate.getMonth() === date.getMonth() &&
            matchDate.getFullYear() === date.getFullYear()
        );
    });

    return (
        <>
            <div className="flex flex-col w-3/5 gap-4">
                <h1 className="text-4xl font-bold">
                    Tournament & Prediction Page
                </h1>
                <div className="flex justify-between">
                    <span className="text-lg">World Hockey Championship</span>
                    <DateNavigator value={date} onChange={setDate} />
                </div>
                <section className="grid-cols-2 grid gap-4">
                    {filteredMatchesByDate.map((match) => (
                        <MatchCard key={match.id} match={match} />
                    ))}
                </section>
            </div>
            <div className="flex flex-col w-1/4 gap-4">
                <TournamentTable />
            </div>
        </>
    );
};

export default TournamentContent;
