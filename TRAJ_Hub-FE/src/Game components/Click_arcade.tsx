import { useEffect, useState, useRef } from "react";
import Target from "./target";

interface cabnetProps {
  name: string;
  setIsGameActive: (isActive: boolean) => void;
}

const Cabnet = ({name, setIsGameActive}: cabnetProps) => {
    const [hitCount, setHitCount] = useState<number>(0);
    const [missCount, setMissCount] = useState<number>(0);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [initials, setInitials] = useState<string>('');
    const [targetKey, setTargetKey] = useState<number>(0);
    const [isSafe, setIsSafe] = useState<boolean>(false);
    const [speed, setSpeed] = useState<number>(2000);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [start, setStart] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(0);
    const [countingdown, setCountingdown] = useState<boolean>(false);
    const expirationTimeRef = useRef<number>(0);

    const maxMisses = 3;

    const hit = () => {
        setHitCount((prev) => prev + 1);
        setScore((prev) => prev + 1);
        setSpeed((prev) => prev * 0.95);
    };

    const miss = () => {
        setMissCount((prev) => prev + 1);
        if (missCount + 1 >= maxMisses) {
            setIsGameActive(false);
            setIsGameOver(true);
        }
    };

    const reset = () => {
        setHitCount(0);
        setMissCount(0);
        setIsGameOver(false);
        setInitials('');
        setSpeed(2000);
        setIsSafe(false);
    };

    const startGame = () => {
      setIsGameActive(true);
      setCountingdown(true);
      let counter = 3;
      setCountdown(counter);
  
      const interval = setInterval(() => {
          counter--;
          setCountdown(counter);
          if (counter === 0) {
              clearInterval(interval);
              setStart(true);
              setCountingdown(false);
          }
      }, 1000);
    };

    const saveScore = () => {
        fetch("https://traj-hub.onrender.com/save-score", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "game": `${name}`,
                "initials": initials,
                "score": score,
                "hit_count": hitCount
            })
        });
    };

    const renderFrame = (currentTime: number) => {
        const expirationTime = expirationTimeRef.current;
        if (currentTime >= expirationTime) {
            setIsVisible(false);
        }
        requestAnimationFrame(renderFrame);
    };

    useEffect(() => {
        if (isGameOver) return;

        const interval = setInterval(() => {
            setTargetKey((prev) => prev + 1);

            const rand = Math.random() * 10;
            setIsSafe(rand >= 8);

            setIsVisible(true);

            const currentTime = Date.now();
            expirationTimeRef.current = currentTime + (speed - 50);

        }, speed);

        requestAnimationFrame(renderFrame);

        return () => clearInterval(interval);
    }, [isGameOver, speed]);

    if (isGameOver && start) {
        return (
            <div className="flex flex-col items-center justify-center w-11/12 h-[30rem] md:w-9/12 md:h-auto md:aspect-video my-6 border rounded-2xl border-yellow-700 bg-black bg-opacity-80 mx-auto text-white z-40">
                <h1 className=" text-red-600 text-4xl mb-4">Game Over!</h1>
                <p className="text-white text-2xl mb-4">Your score: <span className="text-orange-400">{score}</span></p>
                <p className="text-white text 2xl mb-6">Your hits: <span className="text-green-500">{hitCount}</span></p>
                <input
                    type="text"
                    value={initials}
                    onChange={(e) => setInitials(e.target.value)}
                    maxLength={3}
                    placeholder="Enter initials"
                    className="border border-pink-700 p-2 mb-4 w-32 text-center text-yellow-500 bg-slate-500"
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
        );
    }

    else if (start && !isGameOver)
    {return (
        <div className="relative w-11/12 h-[30rem] md:w-9/12  md:h-auto md:aspect-video my-6 border rounded-2xl border-yellow-700 bg-black bg-opacity-80 mx-auto">
            <div className="absolute top-4 left-4 text-2xl text-orange-700">
                <p>Hits: {hitCount}</p>
                <p>Misses: {missCount}/{maxMisses}</p>
            </div>
            {isVisible && (
                <Target
                    key={targetKey}
                    onHit={hit}
                    onMiss={miss}
                    isSafe={isSafe}
                    expirationTime={expirationTimeRef.current}
                />
            )}
        </div>
    );
  }

  if (!start && countingdown) {
    return (
        <div className="flex flex-col items-center justify-center w-11/12 h-[30rem] md:w-9/12 md:h-auto md:aspect-video my-6 border rounded-2xl border-yellow-700 bg-black bg-opacity-80 mx-auto text-white z-40">
            <h1 className="text-[10vw] mb-4">{countdown}</h1>
        </div>
    );
}

  return (
    <div className="flex flex-col items-center justify-around w-11/12 h-[30rem] md:w-9/12 md:h-auto md:aspect-video my-6 border rounded-2xl border-yellow-700 bg-black bg-opacity-80 mx-auto text-white z-40">
      <h1 className="text-6xl text-center drop-shadow-arcade animate-pulse-shadow text-orange-700 underline decoration-cyan-500">Click Arcade 1.0</h1>
      <button
                    onClick={startGame}
                    className="md:w-1/6 md:aspect-video md:text-[3vw] bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    START
                </button>
    </div>
  )
};

export default Cabnet;
