import NoActiveGroups from '@/components/tournament/no-active-tournament';

const TournamentPage = async () => {
    const hasActiveGroups = false;

    return hasActiveGroups ? (
        <div className="flex flex-col flex-1 gap-4">
            <h1 className="text-3xl font-bold my-4">Your groups</h1>
        </div>
    ) : (
        <NoActiveGroups />
    );

    // const matches = await getAllMatches();

    // return <TournamentContent matches={matches} />;
};

export default TournamentPage;
