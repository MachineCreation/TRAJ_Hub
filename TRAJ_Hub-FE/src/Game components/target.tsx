// React

import { useEffect, useState } from "react";

// Game components

// css

interface TargetProps {
    onHit: () => void;
    onMiss: () => void;
    isSafe: boolean;
    speed: number;
}

const Target = ({onHit, onMiss, isSafe, speed}: TargetProps) => {
    const [isVisable, setIsVisable] = useState<boolean>(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisable(false);
            if (!isSafe) {
                onMiss();
            }
        }, (speed - 50));

        return () => clearTimeout(timeout);
    }, [onMiss]);

    const click = () => {
        if (isSafe) {
            onMiss();
        } else {
            onHit();
        }
        setIsVisable(false);
    };

    if (!isVisable) return null;

    return (
        <div
      onClick={click}
      className={`${
        isSafe ? 'bg-green-500' : 'bg-red-500'
      } rounded-full w-6 h-6 md:w-12 md:h-12 absolute cursor-pointer transition-transform duration-200`}
      style={{
        top: `${Math.random() * 80}%`,
        left: `${Math.random() * 80}%`,
      }}
    />
    )
};

export default Target;