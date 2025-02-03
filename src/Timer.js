import React, { useState, useEffect } from 'react';
function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };
  const handleReset = () => {
    setTime(0);
  };
  return (
    <div style={styles.container}>
      <div style={styles.timer}>
        <h1 style={styles.time}>{formatTime(time)}</h1>
        <div style={styles.buttons}>
          <button onClick={handleStartStop} style={styles.button}>
            {isRunning ? 'Стоп' : 'Старт'}
          </button>
          {time > 0 && (
            <button onClick={handleReset} style={styles.button}>
              Сброс
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  timer: {
    textAlign: 'center',
  },
  time: {
    fontSize: '3rem',
    margin: '20px 0',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    border: '1px solid #333',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
  },
};
export default Timer;

