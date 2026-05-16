import { getMatchesByDate } from '@/backend/matches/service';
import GlobalLeaders from '@/components/card/global-leaders';
import Matches from '@/components/card/matches/matches';
import MyPredictions from '@/components/card/my-predictions';
import NextPuckDrop from '@/components/card/next-puck-drop';

const DashboardPage = async () => {
    const todayMatches = await getMatchesByDate(
        new Date().toISOString().split('T')[0],
    );

    return (
        <>
            <div className="flex flex-col w-3/5 gap-4">
                <NextPuckDrop />
                <Matches matches={todayMatches} />
            </div>
            <div className="flex flex-col w-1/4 gap-4">
                <MyPredictions />
                <GlobalLeaders />
            </div>
        </>
    );
};

export default DashboardPage;
