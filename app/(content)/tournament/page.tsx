import { getMatches } from '@/backend/matches/action';
import TournamentContent from '@/components/tournament/content';

const TournamentPage = async () => {
    const matches = await getMatches();

    return <TournamentContent matches={matches} />;
};

export default TournamentPage;
