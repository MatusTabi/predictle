import {
    getAvailableTournaments as availableTournaments,
    getActiveTournaments as activeTournaments,
    ensureTournamentParticipation as ensureParticipation,
    getTournamentParticipants as getParticipants,
} from './repository';
import { TournamentDTO } from './types';
import {
    dbTournamentToActiveTournamentDtoList,
    dbTournamentToDtoList,
} from './mapper';
import { TournamentTableRow } from '../leaderboard/types';

export const getActiveTournaments = async (
    userId: string,
): Promise<TournamentDTO[]> => {
    const tournaments = await activeTournaments(userId);

    return dbTournamentToActiveTournamentDtoList(tournaments);
};

export const getAvailableTournaments = async (
    userId: string,
): Promise<TournamentDTO[]> => {
    const tournaments = await availableTournaments(userId);
    return dbTournamentToDtoList(tournaments);
};

export const getTournamentParticipants = async (
    tournamentId?: string,
): Promise<TournamentTableRow[]> => {
    return await getParticipants(tournamentId);
};

export const joinTournament = async (userId: string, tournamentId: string) => {
    await ensureParticipation(userId, tournamentId);
};
