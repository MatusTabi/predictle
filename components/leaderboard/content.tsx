'use client';

import { useState } from 'react';
import LeaderboardTable from '../table/leaderboard/leaderboard';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { TournamentParticipantDTO } from '@/backend/leaderboard/types';

const tabs = [
    { id: 'tournament', label: 'Tournament' },
    { id: 'global', label: 'Global' },
];

type LeaderboardContentProps = {
    participants: TournamentParticipantDTO[];
};

const LeaderboardContent = ({ participants }: LeaderboardContentProps) => {
    const [activeTab, setActiveTab] = useState<'tournament' | 'global'>(
        'tournament',
    );

    return (
        <div className="flex flex-col justify-center flex-1 px-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold">
                    {activeTab === 'tournament'
                        ? 'Tournament Leaderboard - TBA'
                        : 'Global Leaderboard'}
                </h1>
                <div className="flex w-full items-center rounded-md border border-inverse-on-surface p-1 sm:w-auto">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;

                        return (
                            <Button
                                key={tab.id}
                                type="button"
                                size="sm"
                                className={cn(
                                    'flex-1 px-4 py-6 sm:flex-none',
                                    isActive
                                        ? 'text-foreground bg-tertiary-container'
                                        : 'bg-transparent',
                                )}
                                onClick={() =>
                                    setActiveTab(
                                        tab.id as 'tournament' | 'global',
                                    )
                                }
                            >
                                {tab.label}
                            </Button>
                        );
                    })}
                </div>
            </div>
            <LeaderboardTable participants={participants} />
        </div>
    );
};

export default LeaderboardContent;
