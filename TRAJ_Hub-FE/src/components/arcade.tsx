// React 
import { useEffect, useState } from "react";
import { json } from "react-router-dom";

// Components

const Cabnet = () => {

    const [hitCount, setHitCount] = useState<number>(0);
    const [missCount, setMissCount] = useState<number>(0);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [initials, setInitials] = useState<string>('');
    
    const maxMisses = 3

    const hit = () => {
        setHitCount((prev) => prev + 1);
    };

    const miss = () => {
        setMissCount((prev) => prev + 1);
        if (missCount >= maxMisses) {
            setIsGameOver(true);
        };
    };

    const reset = () => {
        setHitCount(0);
        setMissCount(0);
        setIsGameOver(false);
        setInitials('');
    };

    const saveScore = () => {
        fetch("https://traj-hub.onrender.com/save-score", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "initials": initials,
                "score": score,
                "hit-count": hitCount
            })
        });
        
    };

    useEffect(() => {
        if (isGameOver) return;

        const interval = setInterval(() => {}, 1500);
        return () => clearInterval(interval);
    },[isGameOver]);

    if (isGameOver) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
        <h1 className="text-4xl mb-4">Game Over!</h1>
        <p className="text-2xl mb-6">Your score: {hitCount}</p>
        <input
          type="text"
          value={initials}
          onChange={(e) => setInitials(e.target.value)}
          maxLength={3}
          placeholder="Enter initials"
          className="border border-white p-2 mb-4 w-32 text-center text-black"
        />
        <button
          onClick={saveScore}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Save Score
        </button>
        <button
          onClick={reset}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Play Again
        </button>
      </div>
        )
    }
};

export default Cabnet;