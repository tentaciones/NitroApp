import React, { useEffect, useState } from "react";

interface CountdownProps {
  startTime: string; // Start time in epoch time format
  endTime: string; // End time in epoch time format
}

const DebtProgressBar: React.FC<CountdownProps> = ({ startTime, endTime }) => {
  const [remainingTime, setRemainingTime] = useState<number>(0);

  const calculateRemainingTime = () => {
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const remaining = Number(endTime) - now;

    if (remaining <= 0) {
      setRemainingTime(0);
    } else {
      setRemainingTime(remaining);
    }
  };

  useEffect(() => {
    const interval = setInterval(calculateRemainingTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [endTime]);

  const calculateProgress = (): number => {
    const totalTime = Number(endTime) - Number(startTime);
    const elapsed = totalTime - remainingTime;
    return (elapsed / totalTime) * 100;
  };

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <div
        className="h-2  bg-[#12AFA6]  rounded-md -mt-3"
        style={{ width: `${calculateProgress()}%` }}
      ></div>
    </div>
  );
};

export default DebtProgressBar;
