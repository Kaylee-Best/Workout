import React from "react";
import { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  useEffect(() => {
    let interval;
    if (start) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!start) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [start]);
  return (
    <div className="timer">
      <div className="numbers">
        <h1>Duration</h1>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div className="buttons">
        <button onClick={() => setStart(true)}>Start</button>
        <button onClick={() => 
          {setStart(false)
          setTime(0)
          }}>Reset</button>     
      </div>
    </div>
  );
};
export default Timer;