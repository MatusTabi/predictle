import { auth } from '@/auth/auth';
import {
    getActiveTournaments,
    getAvailableTournaments,
} from '@/backend/tournament/service';
import NoActiveTournament from '@/components/tournament/no-active-tournament';

const TournamentPage = async () => {
    const session = await auth();
    const activeTournaments = await getActiveTournaments(
        session?.user?.id ?? '',
    );
    const availableTournaments = await getAvailableTournaments(
        session?.user?.id ?? '',
    );

    return (
        <NoActiveTournament
            activeTournaments={activeTournaments}
            availableTournaments={availableTournaments}
        />
    );

    // const matches = await getAllMatches();

    // return <TournamentContent matches={matches} />;
};

export default TournamentPage;
