import { getAllMatches } from '@/backend/matches/service';
import TournamentContent from '@/components/tournament/content';

const TournamentPage = async () => {
    const matches = await getAllMatches();

    return <TournamentContent matches={matches} />;
};

export default TournamentPage;
