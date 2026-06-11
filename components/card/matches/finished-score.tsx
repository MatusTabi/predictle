type FinishedScoreProps = {
    homeScore: number | null;
    awayScore: number | null;
};

const FinishedScore = ({ homeScore, awayScore }: FinishedScoreProps) => (
    <>
        <span className="w-10 h-12 p-2 text-4xl font-bold">{homeScore}</span>
        <span className="mx-2">-</span>
        <span className="w-10 h-12 p-2 text-4xl font-bold">{awayScore}</span>
    </>
);

export default FinishedScore;
