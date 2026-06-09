import { getSession } from 'next-auth/react';
import {
    getAvailableTournaments as availableTournaments,
    getActiveTournaments as activeTournaments,
} from './repository';
import { TournamentDTO } from './types';
import {
    dbTournamentToActiveTournamentDtoList,
    dbTournamentToDtoList,
} from './mapper';

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
