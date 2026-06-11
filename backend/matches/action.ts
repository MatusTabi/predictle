'use server';

import { auth } from '@/auth/auth';
import { getTournamentBySlug } from '@/backend/tournament/service';
import { redirect } from 'next/navigation';

import { addTournamentMatch, syncMatchesFromSportsDb } from './service';

export const syncMatches = async () => {
    return await syncMatchesFromSportsDb();
};

export const addTournamentMatchAction = async (
    tournamentSlug: string,
    formData: FormData,
) => {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    }

    const tournament = await getTournamentBySlug(tournamentSlug);

    if (!tournament) {
        throw new Error('Tournament not found');
    }

    await addTournamentMatch({
        tournamentId: tournament.id,
        homeTeam: String(formData.get('homeTeam') ?? ''),
        awayTeam: String(formData.get('awayTeam') ?? ''),
        startsAt: String(formData.get('startsAt') ?? ''),
    });

    redirect(`/tournament/${tournament.slug}/predictions`);
};
