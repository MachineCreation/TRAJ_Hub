// React

//Components
import LeaderBoard from "../Game components/leaderboard";
import Header from "../components/header";

// Game components
import Cabnet from "../Game components/Click_arcade";

function Arcade() {
    return (
        <div className="flex flex-col justify-items-center">
            <Header
                name = {"Click Arcade"}
            />
            <Cabnet 
                name={'Click-Arcade-1.0'}
                />
            <LeaderBoard
                name={'Click-Arcade-1.0'}
                />
        </div>
    )
}

export default Arcade;