//Components
import LeaderBoard from "../Game components/leaderboard";
import Header from "../components/header";
import Cabnet from "../Game components/Click_arcade";

interface ArcadeProps {
  setIsGameActive: (isActive: boolean) => void;
}

function Arcade({ setIsGameActive }: ArcadeProps) {
  return (
    <div className="flex flex-col justify-items-center">
      <Header name="Click Arcade" />
      <Cabnet name="Click-Arcade-1.0" setIsGameActive={setIsGameActive} />
      <LeaderBoard name="Click-Arcade-1.0" />
    </div>
  );
}

export default Arcade;
