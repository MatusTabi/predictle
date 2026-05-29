import { CirclePlus, Trophy, UserPlus } from 'lucide-react';
import { Button } from '../ui/button';

const NoActiveGrops = () => (
    <div className="flex flex-col justify-center items-center py-8 flex-1 gap-4">
        <div className="rounded-full h-64 w-64 bg-surface border border-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <Trophy className="w-32 h-32 animate-pulse" />
        </div>
        <h1 className="text-5xl font-bold mt-8 text-on-surface text-center">
            No Active Tournament Predictions
        </h1>
        <p className="py-4">
            Join or create a group to start predicting tournament matches and
            climb the leaderboard.
        </p>
        <div className="flex gap-8 w-full justify-center">
            <div className="bg-primary-container border rounded-lg border-inverse-on-surface p-8 flex flex-col gap-2 w-1/3">
                <div className="flex gap-2 items-center ">
                    <UserPlus className="w-6 h-6" />
                    <h1 className="text-xl font-semibold">Join group</h1>
                </div>
                <p>
                    Enter a 6-digit invite code to join your friends and show
                    off your sports knowledge.
                </p>
                <div className="flex gap-8 px-4 mt-4 items-center justify-center">
                    <input
                        className="bg-surface-container-lowest border-outline w-1/2 h-12 p-2 text-lg font-medium text-center"
                        placeholder="Enter invite code"
                    />
                    <Button className="w-1/3 h-12 p-2 text-on-primary font-semibold">
                        Join group
                    </Button>
                </div>
            </div>
            <div className="bg-tertiary text-on-tertiary border rounded-lg p-8 flex flex-col gap-2 w-1/3 relative overflow-hidden">
                <h1 className="text-xl font-semibold">Create group</h1>
                <p>
                    Start your own tournament and challenge your friends to test
                    your sports knowledge.
                </p>
                <Button className="mt-4 bg-on-tertiary-container text-tertiary w-1/3 h-12 p-2 font-semibold">
                    Create group
                </Button>
                <CirclePlus className="w-32 h-32 absolute -bottom-8 -right-8 opacity-50 rotate-12" />
            </div>
        </div>
    </div>
);

export default NoActiveGrops;
