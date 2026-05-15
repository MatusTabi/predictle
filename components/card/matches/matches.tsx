import MainHeader from './main-header';
import MatchSection from './match-section';

const Matches = () => (
    <div className="flex flex-col">
        <MainHeader />
        <MatchSection time="16:20" isOpen={true} />
        <MatchSection time="20:20" isOpen={false} />
    </div>
);

export default Matches;
