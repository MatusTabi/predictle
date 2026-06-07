import { Tournament } from '@/backend/tournament/types';
import NoActiveTournament from '@/components/tournament/no-active-tournament';

const TournamentPage = async () => {
    const tournaments: Tournament[] = [
        {
            title: 'FIFA World Cup 2026',
            category: 'Football',
            isLive: true,
            players: 4,
        },
        {
            title: 'NBA Playoffs 2024',
            category: 'Basketball',
            isLive: false,
            players: 8,
        },
        {
            title: 'Wimbledon 2024',
            category: 'Tennis',
            isLive: true,
            players: 16,
        },
    ];

    return (
        <NoActiveTournament isParticipant={true} tournaments={tournaments} />
    );

    // const matches = await getAllMatches();

    // return <TournamentContent matches={matches} />;
};

export default TournamentPage;
