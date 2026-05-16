'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const HomePage = () => (
    <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">
            Welcome to the NHL Prediction App!
        </h1>
        <p className="mb-6">
            This is the home page. Use the navigation to explore the dashboard
            and tournament pages. More stuff will be added here soon.
        </p>
        <form
            onSubmit={(event) => {
                event.preventDefault();
                void signIn('google');
            }}
        >
            <Button type="submit">Sign in with Google</Button>
        </form>
    </div>
);

export default HomePage;
