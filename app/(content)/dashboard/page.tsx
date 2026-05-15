import GlobalLeaders from '@/components/card/global-leaders';
import Matches from '@/components/card/matches/matches';
import MyPredictions from '@/components/card/my-predictions';
import NextPuckDrop from '@/components/card/next-puck-drop';
const DashboardPage = () => {
    return (
        <>
            <div className="flex flex-col w-3/5 gap-4">
                <NextPuckDrop />
                <Matches />
            </div>
            <div className="flex flex-col w-1/4 gap-4">
                <MyPredictions />
                <GlobalLeaders />
            </div>
        </>
    );
};

export default DashboardPage;
