'use server';

import { auth } from '@/auth/auth';
import { getTournamentBySlug } from '@/backend/tournament/service';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import {
    addTournamentMatch,
    endTournamentMatch,
    syncMatchesFromSportsDb,
} from './service';

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

    const editPath = `/tournament/${tournament.slug}/matches/edit`;

    revalidatePath(editPath);
    revalidatePath(`/tournament/${tournament.slug}/predictions`);
    redirect(editPath);
};

export const endTournamentMatchAction = async (
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

    await endTournamentMatch({
        tournamentId: tournament.id,
        matchId: String(formData.get('matchId') ?? ''),
        homeScore: Number(formData.get('homeScore')),
        awayScore: Number(formData.get('awayScore')),
    });

    const editPath = `/tournament/${tournament.slug}/matches/edit`;

    revalidatePath(editPath);
    revalidatePath(`/tournament/${tournament.slug}/predictions`);
    redirect(editPath);
};
