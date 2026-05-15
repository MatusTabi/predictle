'use client';

import { Button } from '@/components/ui/button';

type MatchCardProps = {
    isOpen: boolean;
};

const MatchCard = ({ isOpen }: MatchCardProps) => (
    <div className="bg-primary-container border-inverse-on-surface border rounded-lg p-4 flex flex-col flex-1">
        <div className="flex justify-between">
            <h1 className="font-semibold text-lg">Group A</h1>
            {isOpen ? (
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-pulse rounded-full bg-tertiary-container" />
                    <span className="text-tertiary-container">LIVE</span>
                </div>
            ) : (
                <span className="text-sm">SOON</span>
            )}
        </div>
        <div className="flex gap-4 items-center justify-center my-4">
            <span>Canada</span>
            <div className="flex gap-2 items-center">
                <input
                    className="bg-surface-container-lowest border-outline w-10 h-14 p-2 text-4xl font-bold text-center"
                    placeholder="0"
                />
                -
                <input
                    className="bg-surface-container-lowest border-outline w-10 h-14 p-2 text-4xl font-bold text-center"
                    placeholder="0"
                />
            </div>
            <span>Sweden</span>
        </div>
        {isOpen && (
            <Button
                type="submit"
                className="mt-auto bg-tertiary-container rounded-md border-none text-on-tertiary-container"
            >
                Submit Predict
            </Button>
        )}
    </div>
);

export default MatchCard;
