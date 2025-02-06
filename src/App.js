import React, { useState, useEffect } from 'react';

function App() {
  const [isGreen, setIsGreen] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [averageTime, setAverageTime] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const [attempts, setAttempts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Функция для начала игры
  const startGame = () => {
    setGameStarted(true);
    setErrorMessage("");
    setIsGreen(false);
    setStartTime(null);
    setReactionTime(null);

    // Генерация случайного времени между 2 и 5 секунд
    const randomDelay = Math.floor(Math.random() * 3000) + 2000;

    setTimeout(() => {
      setIsGreen(true);
      setStartTime(Date.now());
    }, randomDelay);
  };

  // Обработчик нажатия на кнопку
  const handleClick = () => {
    if (!gameStarted) {
      startGame();
      return;
    }

    if (isGreen) {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setAttempts(prevAttempts => [...prevAttempts, time]);
      setAverageTime(getAverageTime([...attempts, time]));
      setGameStarted(false);
    } else {
      setErrorMessage("Слишком рано!");
      setGameStarted(false);
    }
  };

  // Функция для вычисления среднего времени реакции
  const getAverageTime = (attempts) => {
    const total = attempts.reduce((acc, time) => acc + time, 0);
    return (total / attempts.length).toFixed(2);
  };

  useEffect(() => {
    if (attempts.length > 0) {
      setAverageTime(getAverageTime(attempts));
    }
  }, [attempts]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Игра на реакцию</h1>
      <p>Нажмите кнопку как можно быстрее, когда она станет зеленой!</p>
      
      <button
        onClick={handleClick}
        style={{
          backgroundColor: isGreen ? 'green' : 'red',
          color: 'white',
          padding: '20px 40px',
          fontSize: '20px',
          cursor: 'pointer',
        }}
      >
        {gameStarted ? 'Ждите...' : 'Начать игру'}
      </button>
      
      {reactionTime !== null && (
        <div>
          <p>Ваше время реакции: {reactionTime} мс</p>
          {averageTime && <p>Среднее время: {averageTime} мс</p>}
        </div>
      )}

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default App;