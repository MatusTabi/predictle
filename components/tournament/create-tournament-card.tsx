import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

const CreateTournamentCard = () => (
    <div className="flex min-h-64 w-full flex-col justify-center gap-2 rounded-lg border border-inverse-on-surface p-5 sm:p-8 md:h-64 md:w-100 md:shrink-0">
        <h1 className="text-2xl font-semibold">Create your own tournament</h1>
        <div className="flex gap-2 items-center">
            <span className="text-on-surface/70 text-sm">
                No tournaments available. Create your own!
            </span>
        </div>
        <Button
            asChild
            className="h-12 w-full px-4 font-semibold text-on-primary sm:w-fit"
        >
            <Link href="/tournament/create">
                <Plus className="w-5 h-5" />
                Create tournament
            </Link>
        </Button>
    </div>
);

export default CreateTournamentCard;
