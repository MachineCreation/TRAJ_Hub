
// React
import { useEffect, useState, useRef, useCallback } from "react";

//components
import Target from "./target";

//variables
import { backend_url } from "../config/variables";

interface CabnetProps {
  name: string;
  setIsGameActive: (isActive: boolean) => void;
}

const Cabnet: React.FC<CabnetProps> = ({ name, setIsGameActive }) => {

  const [hitCount, setHitCount] = useState(0);
  const [missCount, setMissCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [initials, setInitials] = useState("");
  const [speed, setSpeed] = useState(3000);
  const [isVisible, setIsVisible] = useState(false); 
  const [countdown, setCountdown] = useState(3);
  const [countingDown, setCountingDown] = useState(false);
  const [start, setStart] = useState(false);
  const [targetKey, setTargetKey] = useState(0);
  const [isSafe, setIsSafe] = useState(false);

  const expirationTimeRef = useRef<number>(0);

  const MAX_MISSES = 3;

  const handleHit = useCallback(() => {
    if (speed <= 1000)
        setScore((prev) => prev + 3);
    else if (speed <= 2000) {
        setScore((prev) => prev + 2);
    }
    else {
        setScore((prev) => prev + 1);
    }
    setHitCount((prev) => prev + 1);
    if (speed >= 1000) {
        setSpeed((prev) => prev * 0.98);
    }
  }, []);

  const handleMiss = useCallback(() => {
    setMissCount((prevMissCount) => {
      const newMissCount = prevMissCount + 1;
      if (newMissCount >= MAX_MISSES) {
        setIsGameActive(false);
        setIsGameOver(true);
      }
      return newMissCount;
    });
  }, [setIsGameActive]);

  const handleReset = () => {
    setHitCount(0);
    setMissCount(0);
    setScore(0);
    setIsGameOver(false);
    setInitials("");
    setSpeed(2000);
    setIsSafe(false);
    setStart(false);
    setIsVisible(false);
  };

  const startGame = () => {
    setIsGameActive(true);
    setCountingDown(true);
    setCountdown(3);

    let counter = 3;
    const intervalId = setInterval(() => {
      counter--;
      setCountdown(counter);
      if (counter <= 0) {
        clearInterval(intervalId);
        setCountingDown(false);
        setStart(true);
      }
    }, 1000);
  };

  const saveScore = useCallback(() => {
    fetch(`${backend_url}/save-score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        game: name,
        initials: initials,
        score: score,
        hit_count: hitCount
      })
    }).catch((err) => console.error("Error saving score:", err));
  }, [name, initials, score, hitCount]);


  const renderFrame = useCallback(
    (currentTime: number) => {
      const expirationTime = expirationTimeRef.current;
      if (currentTime >= expirationTime) {
        setIsVisible(false);
      }
      requestAnimationFrame(renderFrame);
    },
    [setIsVisible]
  );

  useEffect(() => {
    if (isGameOver || !start) return;

    const intervalId = setInterval(() => {
      // Increment the target key to re-render new <Target/>
      setTargetKey((prev) => prev + 1);

      // Decide if the new target is safe or not
      setIsSafe(Math.random() * 10 >= 8);

      // Show the target
      setIsVisible(true);

      // Expire in (speed - 50) ms
      const currentTime = Date.now();
      expirationTimeRef.current = currentTime + (speed - 50);
    }, speed);

    // Start rendering frames
    requestAnimationFrame(renderFrame);

    return () => {
      clearInterval(intervalId);
    };
  }, [isGameOver, speed, start, renderFrame]);

  // Game Over Screen
  if (isGameOver && start) {
    return (
      <div className="flex flex-col items-center justify-center w-11/12 h-[30rem] md:w-9/12 md:h-auto md:aspect-video my-6 border rounded-2xl border-yellow-700 bg-black bg-opacity-80 mx-auto text-white z-40">
        <h1 className="text-red-600 text-4xl mb-4">Game Over!</h1>
        <p className="text-white text-2xl mb-4">
          Your score: <span className="text-orange-400">{score}</span>
        </p>
        <p className="text-white text-2xl mb-6">
          Your hits: <span className="text-green-500">{hitCount}</span>
        </p>
        <input
          type="text"
          value={initials}
          onChange={(e) => setInitials(e.target.value)}
          maxLength={3}
          placeholder="Enter initials"
          className="border border-pink-700 p-2 mb-4 w-32 text-center text-yellow-500 bg-slate-500"
        />
        <button
          onClick={() => {
            saveScore();
            setTimeout(() => {
              document.location.reload();
            }, 750);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Save Score
        </button>
        <button
          onClick={handleReset}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Play Again
        </button>
      </div>
    );
  }

  // Active Game Screen
  if (start && !isGameOver) {
    return (
      <div className="relative w-11/12 h-[30rem] md:w-9/12 md:h-auto md:aspect-video my-6 border rounded-2xl border-yellow-700 bg-black bg-opacity-80 mx-auto">
        <div className="absolute top-4 left-4 text-2xl text-orange-700">
          <p>Hits: {hitCount}</p>
          <p>
            Misses: {missCount}/{MAX_MISSES}
          </p>
          <p>Don't click the <span className="text-green-500">Greens</span></p>
        </div>
        {isVisible && (
          <Target
            key={targetKey}
            onHit={handleHit}
            onMiss={handleMiss}
            isSafe={isSafe}
            expirationTime={expirationTimeRef.current}
          />
        )}
      </div>
    );
  }

  // Countdown Screen
  if (countingDown) {
    return (
      <div className="flex flex-col items-center justify-center w-11/12 h-[30rem] md:w-9/12 md:h-auto md:aspect-video my-6 border rounded-2xl border-yellow-700 bg-black bg-opacity-80 mx-auto text-white z-40">
        <h1 className="text-[10vw] mb-4">{countdown}</h1>
        <p className="text-[4vw] text-orange-600">Don't click the <span className="text-green-500">Greens</span></p>
      </div>
    );
  }

  //Default: Not started screen
  return (
    <div className="flex flex-col items-center justify-around w-11/12 h-[30rem] md:w-9/12 md:h-auto md:aspect-video my-6 border rounded-2xl border-yellow-700 bg-black bg-opacity-80 mx-auto text-white z-40">
      <h1 className="text-6xl text-center drop-shadow-arcade animate-pulse-shadow text-orange-700 underline decoration-cyan-500">
        Click Arcade 1.0
      </h1>
      <button
        onClick={startGame}
        className="md:w-1/6 md:aspect-video md:text-[3vw] bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        START
      </button>
    </div>
  );
};

export default Cabnet;
