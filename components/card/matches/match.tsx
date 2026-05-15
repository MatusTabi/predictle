'use client';

import { Button } from '@/components/ui/button';
import { LiveMatchTag, OpenMatchTag, PredictedMatchTag } from './match-tag';
import { cn } from '@/lib/utils';

type MatchCardProps = {
    isLive: boolean;
    predicted: boolean;
};

const MatchCard = ({ isLive, predicted }: MatchCardProps) => (
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
        <div className="flex gap-4 items-center justify-center my-4">
            <span>Canada</span>
            <div className="flex gap-2 items-center">
                {isLive || predicted ? (
                    <>
                        <span className="text-4xl font-bold">2</span>-
                        <span className="text-4xl font-bold">1</span>
                    </>
                ) : (
                    <>
                        <input
                            className="bg-surface-container-lowest border-outline w-10 h-14 p-2 text-4xl font-bold text-center"
                            placeholder="0"
                        />
                        -
                        <input
                            className="bg-surface-container-lowest border-outline w-10 h-14 p-2 text-4xl font-bold text-center"
                            placeholder="0"
                        />
                    </>
                )}
            </div>
            <span>Sweden</span>
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
