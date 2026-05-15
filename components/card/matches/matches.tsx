import MainHeader from './main-header';
import MatchSection from './match-section';

const Matches = () => (
    <div className="flex flex-col">
        <MainHeader />
        <MatchSection time="16:20" isLive={true} />
        <MatchSection time="20:20" isLive={false} />
    </div>
);

export default Matches;
