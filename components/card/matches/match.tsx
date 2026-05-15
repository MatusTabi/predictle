'use client';

import { Button } from '@/components/ui/button';
import { LiveMatchTag, OpenMatchTag, PredictedMatchTag } from './match-tag';
import { cn } from '@/lib/utils';

type MatchCardProps = {
    homeTeam: string;
    awayTeam: string;

    homeScore: string | null;
    awayScore: string | null;

    isLive: boolean;
    predicted: boolean;
    hasEnded?: boolean;
};

const MatchCard = ({
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    isLive,
    predicted,
    hasEnded,
}: MatchCardProps) => (
    <div className="bg-primary-container border-inverse-on-surface border rounded-lg p-4 flex flex-col flex-1 relative">
        <div className="absolute top-0 right-0 flex items-center">
            {isLive ? (
                <>
                    <LiveMatchTag
                        className={predicted ? 'rounded-tr-none' : undefined}
                    />
                    {predicted && (
                        <PredictedMatchTag className="rounded-bl-none" />
                    )}
                </>
            ) : predicted ? (
                <PredictedMatchTag />
            ) : (
                <OpenMatchTag />
            )}
        </div>
        <h1 className="font-semibold text-lg">Group A</h1>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center my-4 w-full">
            <span className="justify-self-end text-right">
                {homeTeam.replace('Ice Hockey', '')}
            </span>

            <div className="flex gap-2 items-center justify-center h-12">
                {isLive || predicted ? (
                    <div className="h-12 mx-2 flex items-center">
                        <span className="text-4xl font-bold">
                            {homeScore ?? '0'}
                        </span>
                        <span className="mx-2">-</span>
                        <span className="text-4xl font-bold">
                            {awayScore ?? '0'}
                        </span>
                    </div>
                ) : (
                    <div className="mx-2 flex items-center">
                        <input
                            className="bg-surface-container-lowest border-outline w-10 h-12 p-2 text-4xl font-bold text-center"
                            placeholder="0"
                        />
                        <span className="mx-2">-</span>
                        <input
                            className="bg-surface-container-lowest border-outline w-10 h-12 p-2 text-4xl font-bold text-center"
                            placeholder="0"
                        />
                    </div>
                )}
            </div>
            <span className="justify-self-start text-left">
                {awayTeam.replace(/Ice Hockey/i, '')}
            </span>
        </div>

        <Button
            type="submit"
            className={cn(
                'mt-auto bg-tertiary-container rounded-md border-none text-on-tertiary-container',
                (predicted || isLive) && 'cursor-not-allowed opacity-50',
            )}
        >
            Submit Prediction
        </Button>
    </div>
);

export default MatchCard;
