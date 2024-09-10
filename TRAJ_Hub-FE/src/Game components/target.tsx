import { useEffect, useState } from "react";
import React from "react";

interface TargetProps {
    onHit: () => void;
    onMiss: () => void;
    isSafe: boolean;
    expirationTime: number;
}

const Target = ({ onHit, onMiss, isSafe, expirationTime }: TargetProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [clicked, setClicked] = useState<boolean>(false);

    useEffect(() => {
        const now = Date.now();
        const remainingTime = expirationTime - now;

        if (remainingTime > 0) {
            const timeout = setTimeout(() => {
                if (!clicked && !isSafe) {
                    console.log("miss detected on hostile target")
                    onMiss();
                }
                setIsVisible(false);
            }, remainingTime);

            return () => clearTimeout(timeout);
        } else {
            setIsVisible(false);
        }
    }, [expirationTime, isSafe, onMiss, clicked]);

    const handleClick = () => {
        if (clicked) return;

        setClicked(true);

        if (isSafe) {
            console.log("hit detected on safe target")
            onMiss();
        } else {
            console.log("hit detected on hostile target")
            onHit();
        }
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div
            onClick={handleClick}
            className={`${
                isSafe ? 'bg-green-500' : 'bg-red-500'
            } rounded-full w-6 h-6 md:w-12 md:h-12 absolute cursor-pointer transition-transform duration-200`}
            style={{
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 80}%`,
            }}
        />
    );
};

export default React.memo(Target);
