import {
    getAvailableTournaments as availableTournaments,
    getActiveTournaments as activeTournaments,
    ensureTournamentParticipation as ensureParticipation,
    getTournamentParticipants as getParticipants,
    getTournamentBySlug as tournamentBySlug,
    createTournament as createTournamentRecord,
    getTournamentParticipantCounts,
} from './repository';
import { TournamentDetailDTO, TournamentDTO } from './types';
import {
    dbTournamentToDetailDto,
    dbTournamentToActiveTournamentDtoList,
    dbTournamentToDtoList,
} from './mapper';
import { TournamentTableRow } from '../leaderboard/types';

export const getActiveTournaments = async (
    userId: string,
): Promise<TournamentDTO[]> => {
    const tournaments = await activeTournaments(userId);
    const playerCounts = await getTournamentParticipantCounts(
        tournaments.map((tournament) => tournament.tournament.id),
    );

    return dbTournamentToActiveTournamentDtoList(tournaments, playerCounts);
};

export const getAvailableTournaments = async (
    userId: string,
): Promise<TournamentDTO[]> => {
    const tournaments = await availableTournaments(userId);
    const playerCounts = await getTournamentParticipantCounts(
        tournaments.map((tournament) => tournament.id),
    );

    return dbTournamentToDtoList(tournaments, playerCounts);
};

export const getTournamentParticipants = async (
    tournamentId?: string,
): Promise<TournamentTableRow[]> => {
    return await getParticipants(tournamentId);
};

export const joinTournament = async (userId: string, tournamentId: string) => {
    await ensureParticipation(userId, tournamentId);
};

export const getTournamentBySlug = async (
    slug: string,
): Promise<TournamentDetailDTO | null> => {
    const tournament = await tournamentBySlug(slug);

    if (!tournament) {
        return null;
    }

    const playerCounts = await getTournamentParticipantCounts([tournament.id]);

    return dbTournamentToDetailDto(tournament, playerCounts[tournament.id] ?? 0);
};

export type CreateTournamentPayload = {
    name: string;
    category: string;
    startDate: string;
};

const createSlug = (value: string) =>
    value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'tournament';

const getUniqueSlug = async (name: string) => {
    const baseSlug = createSlug(name);
    let slug = baseSlug;
    let suffix = 2;

    while (await tournamentBySlug(slug)) {
        slug = `${baseSlug}-${suffix}`;
        suffix += 1;
    }

    return slug;
};

export const createTournament = async ({
    name,
    category,
    startDate,
}: CreateTournamentPayload): Promise<TournamentDetailDTO> => {
    const trimmedName = name.trim();
    const trimmedCategory = category.trim();

    if (!trimmedName) {
        throw new Error('Tournament name is required');
    }

    if (!trimmedCategory) {
        throw new Error('Tournament category is required');
    }

    if (!startDate) {
        throw new Error('Tournament start date is required');
    }

    const tournament = await createTournamentRecord({
        name: trimmedName,
        slug: await getUniqueSlug(trimmedName),
        category: trimmedCategory,
        startDate,
    });

    return dbTournamentToDetailDto(tournament, 0);
};
