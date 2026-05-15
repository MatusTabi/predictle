import { getMatches } from '@/backend/matches/action';
import MatchCard from '@/components/card/matches/match';
import DateNavigator from '@/components/filter/date-navigator';
import TournamentTable from '@/components/table/tournament-table';

const TournamentPage = async () => {
    const matches = await getMatches();

    return (
        <>
            <div className="flex flex-col w-3/5 gap-4">
                <h1 className="text-4xl font-bold">
                    Tournament & Prediction Page
                </h1>
                <div className="flex justify-between">
                    <span className="text-lg">World Hockey Championship</span>
                    <DateNavigator />
                </div>
                <section className="grid-cols-2 grid gap-4">
                    {matches.map((match) => (
                        <MatchCard
                            isLive={match.isLive}
                            predicted={!!match.predicted}
                        />
                    ))}
                </section>
            </div>
            <div className="flex flex-col w-1/4 gap-4">
                <TournamentTable />
            </div>
        </>
    );
};

export default TournamentPage;
