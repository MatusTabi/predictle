export type TournamentDTO = {
    id: string;
    title: string;
    category: string;
    isLive: boolean;
    players: number;
};

export type ActiveTournament = {
    tournament_participant: {
        id: string;
        userId: string;
        tournamentId: string;
        correctWinners: number | null;
        correctScores: number | null;
        totalPredictions: number | null;
        points: number | null;
    } | null;
    tournament: {
        id: string;
        name: string;
        category: string;
        startDate: string;
    };
};
