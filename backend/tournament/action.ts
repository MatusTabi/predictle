'use server';

import { auth } from '@/auth/auth';
import { redirect } from 'next/navigation';

import {
    createTournament,
    getActiveTournaments,
    getAvailableTournaments,
    joinTournament,
} from './service';
import type { TournamentsResponse } from './types';

export const getTournamentsAction = async (): Promise<TournamentsResponse> => {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    }

    const [activeTournaments, availableTournaments] = await Promise.all([
        getActiveTournaments(session.user.id),
        getAvailableTournaments(session.user.id),
    ]);

    return { activeTournaments, availableTournaments };
};

export const joinTournamentAction = async (tournamentId: string) => {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    }

    if (!tournamentId) {
        throw new Error('Tournament id is required');
    }

    await joinTournament(session.user.id, tournamentId);

    return { success: true };
};

export const createTournamentAction = async (formData: FormData) => {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    }

    const tournament = await createTournament({
        name: String(formData.get('name') ?? ''),
        category: String(formData.get('category') ?? ''),
        startDate: String(formData.get('startDate') ?? ''),
    });

    redirect(`/tournament/${tournament.slug}`);
};
