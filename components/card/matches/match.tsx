'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    FinishedTag,
    LiveMatchTag,
    OpenMatchTag,
    PredictedMatchTag,
} from './match-tag';
import { cn } from '@/lib/utils';
import { useSubmitPredictionMutation } from '@/backend/predictions/mutation';

type MatchCardProps = {
    matchId: string;
    homeTeam: string;
    awayTeam: string;

    homeScore: number | null;
    awayScore: number | null;

    isLive: boolean;
    predicted: boolean;
    hasEnded?: boolean;
};

const MatchCard = ({
    matchId,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    isLive,
    predicted,
    hasEnded,
}: MatchCardProps) => {
    const [homePrediction, setHomePrediction] = useState('');
    const [awayPrediction, setAwayPrediction] = useState('');
    const [isPredicted, setIsPredicted] = useState(predicted);
    const submitPrediction = useSubmitPredictionMutation();

    const canSubmit = () => {
        if (isPredicted || isLive || hasEnded || submitPrediction.isPending) {
            return false;
        }

        if (homePrediction.trim() === '' || awayPrediction.trim() === '') {
            return false;
        }

        const homeScoreValue = Number(homePrediction);
        const awayScoreValue = Number(awayPrediction);

        return !Number.isNaN(homeScoreValue) && !Number.isNaN(awayScoreValue);
    };

    const handleSubmit = () => {
        if (!canSubmit()) {
            return;
        }

        submitPrediction.mutate(
            {
                matchId,
                homeScore: Number(homePrediction),
                awayScore: Number(awayPrediction),
            },
            {
                onSuccess: () => {
                    setIsPredicted(true);
                },
            },
        );
    };

    return (
        <div className="bg-primary-container border-inverse-on-surface border rounded-lg p-4 flex flex-col flex-1 relative">
            <div className="absolute top-0 right-0 flex items-center">
                {isLive ? (
                    <>
                        <LiveMatchTag
                            className={
                                isPredicted ? 'rounded-tr-none' : undefined
                            }
                        />
                        {isPredicted && (
                            <PredictedMatchTag className="rounded-bl-none" />
                        )}
                    </>
                ) : isPredicted ? (
                    <PredictedMatchTag />
                ) : hasEnded ? (
                    <FinishedTag />
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
                    {hasEnded || isLive || isPredicted ? (
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
                                value={homePrediction}
                                onChange={(event) =>
                                    setHomePrediction(event.target.value)
                                }
                            />
                            <span className="mx-2">-</span>
                            <input
                                className="bg-surface-container-lowest border-outline w-10 h-12 p-2 text-4xl font-bold text-center"
                                placeholder="0"
                                value={awayPrediction}
                                onChange={(event) =>
                                    setAwayPrediction(event.target.value)
                                }
                            />
                        </div>
                    )}
                </div>
                <span className="justify-self-start text-left">
                    {awayTeam.replace(/Ice Hockey/i, '')}
                </span>
            </div>

            <Button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit()}
                className={cn(
                    'mt-auto bg-tertiary-container rounded-md border-none text-on-tertiary-container',
                    !canSubmit() && 'cursor-not-allowed opacity-50',
                )}
            >
                Submit Prediction
            </Button>
        </div>
    );
};

export default MatchCard;
