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
import MatchInput from './input';
import FinishedScore from './finished-score';

type MatchCardProps = {
    match: MatchDTO;
};

const getMatchStartDate = (match: MatchDTO) => {
    return new Date(`${match.date}T${match.startTime}`);
};

const liveWindowMs = 2 * 60 * 60 * 1000;

const MatchCard = ({ match }: MatchCardProps) => {
    const [currentMatch, setCurrentMatch] = useState(match);
    const [isEditing, setIsEditing] = useState(!match.predicted);
    const [homePrediction, setHomePrediction] = useState(
        match.userPrediction?.homeScore.toString() ?? '',
    );
    const [awayPrediction, setAwayPrediction] = useState(
        match.userPrediction?.awayScore.toString() ?? '',
    );
    const { mutate, isPending } = useSubmitPredictionMutation();

    const now = new Date();
    const matchStartDate = getMatchStartDate(currentMatch);
    const hasStarted = now >= matchStartDate;
    const isLive =
        hasStarted && now < new Date(matchStartDate.getTime() + liveWindowMs);
    const shouldShowFinishedTag = currentMatch.hasEnded || (hasStarted && !isLive);
    const predictionsClosed = hasStarted || currentMatch.hasEnded;
    const canEdit = currentMatch.predicted && !hasStarted && !currentMatch.hasEnded;

    const canSubmit = () => {
        if (
            !isEditing ||
            hasStarted ||
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
                    setIsEditing(false);

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
        <div className="bg-primary-container border-inverse-on-surface border rounded-lg px-4 pt-12 pb-4 flex flex-col flex-1 relative">
            <div className="absolute top-0 right-0 flex items-center">
                {isLive ? (
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
                ) : shouldShowFinishedTag ? (
                    <>
                        <FinishedTag
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
                ) : (
                    <OpenMatchTag />
                )}
            </div>
            {/* <h1 className="font-semibold text-lg">Group A</h1> */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full">
                <span className="justify-self-end text-right">
                    {currentMatch.homeTeam}
                </span>
                <div className="mx-2 flex items-center">
                    {currentMatch.hasEnded ? (
                        <FinishedScore
                            homeScore={currentMatch.homeScore}
                            awayScore={currentMatch.awayScore}
                        />
                    ) : (
                        <MatchInput
                            homePrediction={homePrediction}
                            awayPrediction={awayPrediction}
                            setHomePrediction={setHomePrediction}
                            setAwayPrediction={setAwayPrediction}
                            canPredict={isEditing && !hasStarted}
                        />
                    )}
                </div>
                <span className="justify-self-start text-left">
                    {currentMatch.awayTeam}
                </span>
            </div>
            <div className="text-sm text-on-surface-variant mb-4 text-center">
                {currentMatch.predicted
                    ? `${currentMatch.userPrediction?.homeScore} - ${currentMatch.userPrediction?.awayScore}`
                    : 'Not predicted'}
            </div>

            {predictionsClosed ? (
                <Button
                    type="button"
                    disabled
                    className={cn(
                        'mt-auto bg-tertiary-container rounded-md border-none text-on-tertiary-container',
                    )}
                >
                    Predictions closed
                </Button>
            ) : canEdit && !isEditing ? (
                <Button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className={cn(
                        'mt-auto bg-tertiary-container rounded-md border-none text-on-tertiary-container',
                    )}
                >
                    Edit prediction
                </Button>
            ) : (
                <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!canSubmit()}
                    className={cn(
                        'mt-auto bg-tertiary-container rounded-md border-none text-on-tertiary-container',
                    )}
                >
                    {currentMatch.predicted
                        ? 'Save prediction'
                        : 'Submit Prediction'}{' '}
                    {isPending && <LoadingSpinner />}
                </Button>
            )}
        </div>
    );
};

export default MatchCard;
