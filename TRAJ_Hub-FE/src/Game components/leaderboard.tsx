// React
import { useEffect, useState } from "react";

//types
import { leaderBoard } from "../config/Leaderboard"; 

//variables
import { backend_url } from "../config/variables";

interface LeaderBoardProps {
    name: string;
}

const LeaderBoard = ({name}: LeaderBoardProps) => {
    const [board, setBoard] = useState<leaderBoard[]>([])

    useEffect(() => {
        const getLeaderBoard = async () => {
            try {
                const response = await fetch(`${backend_url}/leaderboard`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        "game": `${name}`
                    })
                });
    
                if (!response.ok) {
                    throw new Error('Failed to fetch member profile');
                };
    
                const data = await response.json();
                setBoard(data);
            } catch (error) {
                console.error('Error fetching Leaderboard', error);
            }
        };
        getLeaderBoard()
    },[]);

    return (
        <div className="relative flex flex-col mx-auto w-11/12 h-[30rem] md:w-9/12 md:aspect-video border border-yellow-700 rounded-2xl bg-black bg-opacity-80">
            <h1 className="text-white border-b-2 border-cyan-600 text-5xl w-full h-fit text-center mx-auto my-2">Top 100</h1>
            <ul className="p-2 w-full h-full overflow-y-auto ">
                {board.sort((prev, cur) => cur.score - prev.score).map((score) =>(
                    <li key={score.id} className="flex flex-col sm:flex-row w-full h-fit p-1 flex-wrap text-center justify-items-center sm:justify-between text-yellow-600 border-b border-dashed border-cyan-600 text-2xl">
                        <p className="sm:border-r-2 sm:w-1/3 border-green-500">{score.initials}</p>
                        <p className="sm:border-r-2 sm:w-1/3 border-green-500">Hits: {score.hit_count}</p>
                        <p className="sm:w-1/3"> Score: {score.score}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default LeaderBoard;