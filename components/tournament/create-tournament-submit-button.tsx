'use client';

import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/spinner';

const CreateTournamentSubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button
            disabled={pending}
            className="mt-2 h-12 w-fit px-6 font-semibold text-on-primary"
        >
            {pending ? 'Creating...' : 'Create tournament'}
            {pending && <LoadingSpinner />}
        </Button>
    );
};

export default CreateTournamentSubmitButton;
