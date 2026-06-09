import { Tournament } from '@/db';
import { ActiveTournament, TournamentDTO } from './types';

export const dbTournamentToActiveTournamentDtoList = (
    tournament: ActiveTournament[],
): TournamentDTO[] => {
    return tournament.map((t) => {
        const isLive = new Date(t.tournament.startDate) <= new Date();
        return {
            id: t.tournament.id,
            title: t.tournament.name,
            category: t.tournament.category,
            isLive,
            players: 0, // This should be replaced with the actual number of players in the tournament
        };
    });
};

export const dbTournamentToDtoList = (
    tournaments: Tournament[],
): TournamentDTO[] => {
    return tournaments.map((t) => {
        const isLive = new Date(t.startDate) <= new Date();
        return {
            id: t.id,
            title: t.name,
            category: t.category,
            isLive,
            players: 0, // This should be replaced with the actual number of players in the tournament
        };
    });
};
