import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

const CreateTournamentCard = () => (
    <div className="border rounded-lg border-inverse-on-surface p-8 flex flex-col justify-center gap-2 w-100 h-64 shrink-0">
        <h1 className="text-2xl font-semibold">Create your own tournament</h1>
        <div className="flex gap-2 items-center">
            <span className="text-on-surface/70 text-sm">
                No tournaments available. Create your own!
            </span>
        </div>
        <Button asChild className="h-12 px-4 font-semibold text-on-primary">
            <Link href="/tournament/create">
                <Plus className="w-5 h-5" />
                Create tournament
            </Link>
        </Button>
    </div>
);

export default CreateTournamentCard;
