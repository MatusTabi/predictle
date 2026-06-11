type MatchInputProps = {
    homePrediction: string;
    awayPrediction: string;
    setHomePrediction: (value: string) => void;
    setAwayPrediction: (value: string) => void;

    canPredict: boolean;
};

const MatchInput = ({
    homePrediction,
    awayPrediction,
    setHomePrediction,
    setAwayPrediction,
    canPredict,
}: MatchInputProps) =>
    canPredict ? (
        <>
            <input
                className="bg-surface-container-lowest border-outline w-10 h-12 p-2 text-4xl font-bold text-center"
                placeholder="0"
                value={homePrediction}
                onChange={(event) => setHomePrediction(event.target.value)}
                disabled={!canPredict}
            />
            <span className="mx-2">-</span>
            <input
                className="bg-surface-container-lowest border-outline w-10 h-12 p-2 text-4xl font-bold text-center"
                placeholder="0"
                value={awayPrediction}
                onChange={(event) => setAwayPrediction(event.target.value)}
                disabled={!canPredict}
            />
        </>
    ) : (
        <span className="mx-2">-</span>
    );

export default MatchInput;
