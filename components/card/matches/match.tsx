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
import { MatchDTO } from '@/backend/matches/types';
import LoadingSpinner from '@/components/ui/spinner';

type MatchCardProps = {
    match: MatchDTO;
};

const MatchCard = ({ match }: MatchCardProps) => {
    const [currentMatch, setCurrentMatch] = useState(match);
    const [homePrediction, setHomePrediction] = useState('');
    const [awayPrediction, setAwayPrediction] = useState('');
    const { mutate, isPending } = useSubmitPredictionMutation();

    const canSubmit = () => {
        if (
            currentMatch.predicted ||
            currentMatch.isLive ||
            currentMatch.hasEnded ||
            isPending
        ) {
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

        mutate(
            {
                matchId: currentMatch.id,
                homeScore: Number(homePrediction),
                awayScore: Number(awayPrediction),
            },
            {
                onSuccess: (data) => {
                    if (data?.match) {
                        setCurrentMatch(data.match);
                    } else {
                        setCurrentMatch((prev) => ({
                            ...prev,
                            predicted: true,
                            userPrediction: {
                                homeScore: Number(homePrediction),
                                awayScore: Number(awayPrediction),
                            },
                        }));
                    }
                },
            },
        );
    };

    return (
        <div className="bg-primary-container border-inverse-on-surface border rounded-lg p-4 flex flex-col flex-1 relative">
            <div className="absolute top-0 right-0 flex items-center">
                {currentMatch.isLive ? (
                    <>
                        <LiveMatchTag
                            className={
                                currentMatch.predicted
                                    ? 'rounded-tr-none'
                                    : undefined
                            }
                        />
                        {currentMatch.predicted && (
                            <PredictedMatchTag className="rounded-bl-none" />
                        )}
                    </>
                ) : currentMatch.predicted ? (
                    <PredictedMatchTag />
                ) : currentMatch.hasEnded ? (
                    <FinishedTag />
                ) : (
                    <OpenMatchTag />
                )}
            </div>
            <h1 className="font-semibold text-lg">Group A</h1>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full">
                <span className="justify-self-end text-right">
                    {currentMatch.homeTeam.replace(/ice\s+hockey/i, '')}
                </span>

                <div className="flex gap-2 items-center justify-center h-12">
                    {currentMatch.hasEnded ||
                    currentMatch.isLive ||
                    currentMatch.predicted ? (
                        <div className="h-12 mx-2 flex items-center">
                            <span className="text-4xl font-bold">
                                {currentMatch.isLive || currentMatch.hasEnded
                                    ? (currentMatch.homeScore ?? '0')
                                    : ''}
                            </span>
                            <span className="mx-2">-</span>
                            <span className="text-4xl font-bold">
                                {currentMatch.isLive || currentMatch.hasEnded
                                    ? (currentMatch.awayScore ?? '0')
                                    : ''}
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
                    {currentMatch.awayTeam.replace(/ice\s+hockey/i, '')}
                </span>
            </div>
            <div className="text-sm text-on-surface-variant mb-4 text-center">
                {currentMatch.predicted
                    ? `${currentMatch.userPrediction?.homeScore} - ${currentMatch.userPrediction?.awayScore}`
                    : 'Not predicted'}
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
                Submit Prediction {isPending && <LoadingSpinner />}
            </Button>
        </div>
    );
};

export default MatchCard;
