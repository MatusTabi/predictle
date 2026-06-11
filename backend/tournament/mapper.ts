import { Tournament } from '@/db';
import { ActiveTournament, TournamentDetailDTO, TournamentDTO } from './types';

export const dbTournamentToActiveTournamentDtoList = (
    tournament: ActiveTournament[],
    playerCounts: Record<string, number> = {},
): TournamentDTO[] => {
    return tournament.map((t) => {
        const isLive = new Date(t.tournament.startDate) <= new Date();
        return {
            id: t.tournament.id,
            slug: t.tournament.slug,
            title: t.tournament.name,
            category: t.tournament.category,
            isLive,
            players: playerCounts[t.tournament.id] ?? 0,
        };
    });
};

export const dbTournamentToDtoList = (
    tournaments: Tournament[],
    playerCounts: Record<string, number> = {},
): TournamentDTO[] => {
    return tournaments.map((t) => {
        const isLive = new Date(t.startDate) <= new Date();
        return {
            id: t.id,
            slug: t.slug,
            title: t.name,
            category: t.category,
            isLive,
            players: playerCounts[t.id] ?? 0,
        };
    });
};

export const dbTournamentToDetailDto = (
    tournament: Tournament,
    players = 0,
): TournamentDetailDTO => {
    const isLive = new Date(tournament.startDate) <= new Date();

    return {
        id: tournament.id,
        slug: tournament.slug,
        title: tournament.name,
        category: tournament.category,
        isLive,
        players,
        startDate: tournament.startDate,
    };
};
