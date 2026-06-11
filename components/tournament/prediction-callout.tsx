import Link from 'next/link';
import { CalendarDays } from 'lucide-react';

import { Button } from '../ui/button';

type PredictionCalloutProps = {
    tournamentSlug: string;
};

const PredictionCallout = ({ tournamentSlug }: PredictionCalloutProps) => (
    <div className="border border-inverse-on-surface rounded-lg p-8 bg-primary-container flex flex-col gap-4">
        <div className="rounded-full bg-surface border border-inverse-on-surface w-14 h-14 flex items-center justify-center">
            <CalendarDays className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-on-surface">
            Make your predictions
        </h2>
        <p className="text-on-surface/70">
            Pick a date, browse tournament matches, and submit your score
            predictions before puck drop.
        </p>
        <Button asChild className="mt-auto h-12 font-semibold text-on-primary">
            <Link href={`/tournament/${tournamentSlug}/predictions`}>
                Go to predictions
            </Link>
        </Button>
    </div>
);

export default PredictionCallout;
