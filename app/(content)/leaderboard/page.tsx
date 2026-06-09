import { getTournamentParticipants } from '@/backend/leaderboard/service';
import LeaderboardContent from '@/components/leaderboard/content';

const LeaderboardPage = async () => {
    const participants = await getTournamentParticipants();

    return <LeaderboardContent participants={participants} />;
};

export default LeaderboardPage;
