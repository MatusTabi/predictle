import { auth } from '@/auth/auth';
import ModeToggle from './mode-toggle';
import UserProfile from './user';

const Actions = async () => {
    const session = await auth();

    return (
        <div className="flex items-center gap-x-2 sm:gap-x-3">
            <ModeToggle />

            {session?.user ? <UserProfile user={session.user} /> : null}
        </div>
    );
};

export default Actions;
