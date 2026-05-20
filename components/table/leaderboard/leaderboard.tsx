'use client';

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Trophy } from 'lucide-react';
import { sampleUsers, User } from './types';
import { useReducer, useState } from 'react';
import { cn } from '@/lib/utils';
import { TournamentParticipantDTO } from '@/backend/leaderboard/types';

const columnHelper = createColumnHelper<TournamentParticipantDTO>();

const trophyColors: Record<number, string> = {
    1: 'text-yellow-500',
    2: 'text-gray-400',
    3: 'text-yellow-700',
};

const columns = [
    columnHelper.accessor('rank', {
        header: 'Rank',
        cell: (info) => (
            <div className="flex items-center gap-2 justify-center">
                {info.getValue() <= 3 ? (
                    <Trophy
                        className={cn('w-5 h-5', trophyColors[info.getValue()])}
                    />
                ) : null}
                <span className="font-bold">{info.getValue()}</span>
            </div>
        ),
    }),
    columnHelper.accessor('userName', {
        header: 'Name',
        cell: (info) => (
            <span className="font-semibold">{info.getValue()}</span>
        ),
    }),
    // columnHelper.accessor('avatarUrl', {
    //     header: 'Avatar',
    //     cell: (info) => (
    //         <img
    //             src={info.getValue()}
    //             alt="Avatar"
    //             className="w-8 h-8 rounded-full"
    //         />
    //     ),
    // }),
    columnHelper.accessor('correctWinners', {
        header: 'Correct Winners',
    }),
    columnHelper.accessor('correctScores', {
        header: 'Correct Scores',
    }),
    columnHelper.accessor('totalPredictions', {
        header: 'Total Predictions',
    }),
    columnHelper.accessor('points', {
        header: 'Total Points',
    }),
];

type LeaderboardContentProps = {
    participants: TournamentParticipantDTO[];
};

const LeaderboardTable = ({ participants }: LeaderboardContentProps) => {
    const [data, setData] = useState<TournamentParticipantDTO[]>(() => [
        ...participants,
    ]);
    const rerender = useReducer(() => ({}), {})[1];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return participants.length > 0 ? (
        <table className="w-full border-collapse">
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th
                                key={header.id}
                                className="border-b px-4 py-2 text-left text-sm font-semibold text-foreground"
                            >
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                          header.column.columnDef.header,
                                          header.getContext(),
                                      )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td
                                key={cell.id}
                                className="border-b px-4 py-2 text-sm text-foreground/70"
                            >
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    ) : (
        <div className="flex flex-col items-center justify-center py-10">
            <p className="text-foreground/70">No participants yet.</p>
        </div>
    );
};

export default LeaderboardTable;
