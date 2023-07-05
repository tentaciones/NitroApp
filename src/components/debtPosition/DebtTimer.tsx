import React, { FC, useEffect, useState } from "react";

interface CountdownProps {
  startTime: number; // Start time in epoch time format
  endTime: number; // End time in epoch time format
}

const Countdown: React.FC<CountdownProps> = ({ startTime, endTime }) => {
  const [remainingTime, setRemainingTime] = useState<number>(0);

  const calculateRemainingTime = () => {
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const remaining = endTime - now;

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

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return <div>{formatTime(remainingTime)}</div>;
};

Countdown;

type Props = {
  startTime: string;
  endTime: string;
};

const DebtTimer: FC<Props> = ({ startTime, endTime }) => {
  return <Countdown startTime={Number(startTime)} endTime={Number(endTime)} />;
};

export default DebtTimer;
