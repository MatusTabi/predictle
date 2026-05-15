import MatchCard from '@/components/card/matches/match';
import DateNavigator from '@/components/filter/date-navigator';
import TournamentTable from '@/components/table/tournament-table';

const TournamentPage = () => (
    <>
        <div className="flex flex-col w-3/5 gap-4">
            <h1 className="text-4xl font-bold">Tournament & Prediction Page</h1>
            <div className="flex justify-between">
                <span className="text-lg">World Hockey Championship</span>
                <DateNavigator />
            </div>
            <section className="grid-cols-2 grid gap-4">
                <MatchCard isLive={true} predicted={true} />
                <MatchCard isLive={true} predicted={true} />
                <MatchCard isLive={false} predicted={true} />
                <MatchCard isLive={false} predicted={false} />
            </section>
        </div>
        <div className="flex flex-col w-1/4 gap-4">
            <TournamentTable />
        </div>
    </>
);

export default TournamentPage;
