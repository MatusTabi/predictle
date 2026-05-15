import GlobalLeaders from '@/components/card/global-leaders';
import Matches from '@/components/card/matches/matches';
import MyPredictions from '@/components/card/my-predictions';
import NextPuckDrop from '@/components/card/next-puck-drop';
import Sidebar from '@/components/sidebar/sidebar';

const DashboardPage = () => {
    return (
        <div className="flex p-4 gap-16 justify-center">
            <Sidebar />
            <div className="flex flex-col w-2/5 gap-4">
                <NextPuckDrop />
                <Matches />
            </div>
            <div className="flex flex-col w-1/4 gap-4">
                <MyPredictions />
                <GlobalLeaders />
            </div>
        </div>
    );
};

export default DashboardPage;
