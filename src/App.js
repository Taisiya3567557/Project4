import React, { useState, useEffect } from "react";
import './App.css'; // Для стилизации


function App() {
  const [coins, setCoins] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [autoMining, setAutoMining] = useState(0);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [background, setBackground] = useState([]);

  // Цена улучшений
  const [clickUpgradeCost, setClickUpgradeCost] = useState(10);
  const [autoMiningUpgradeCost, setAutoMiningUpgradeCost] = useState(20);
  const [environmentUpgradeCost, setEnvironmentUpgradeCost] = useState(100);

  // Функция для обновления UI
  useEffect(() => {
    document.title = `Монеты: ${coins}`;
  }, [coins]);

  // Добыча монет по клику
  const handleClick = () => {
    setCoins(coins + clickValue);
  };

  // Улучшение клика
  const improveClick = () => {
    if (coins >= clickUpgradeCost) {
      setCoins(coins - clickUpgradeCost);
      setClickValue(clickValue + 1);
      setClickUpgradeCost(Math.floor(clickUpgradeCost * 1.5));
    } else {
      alert("Недостаточно монет!");
    }
  };

  // Улучшение автодобычи
  const improveAutoMining = () => {
    if (coins >= autoMiningUpgradeCost) {
      setCoins(coins - autoMiningUpgradeCost);
      setAutoMining(autoMining + 2);
      setAutoMiningUpgradeCost(Math.floor(autoMiningUpgradeCost * 1.5));
    } else {
      alert("Недостаточно монет!");
    }
  };

  // Улучшение окружения
  const improveEnvironment = () => {
    if (coins >= environmentUpgradeCost) {
      setCoins(coins - environmentUpgradeCost);
      setBackground([...background, 'forest']);  // Добавим элемент окружения
      setEnvironmentUpgradeCost(Math.floor(environmentUpgradeCost * 1.5));
    } else {
      alert("Недостаточно монет!");
    }
  };

  // Автодобыча
  useEffect(() => {
    if (autoMining > 0) {
      const interval = setInterval(() => {
        setCoins((prevCoins) => prevCoins + autoMining);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoMining]);

  return (
    <div style={{ textAlign: "center", padding: "20px", position: 'relative' }}>
      <h1>Кликер с улучшениями</h1>
      <div style={{ position: "absolute", left: "20px", top: "20px", fontSize: "20px" }}>
        Монеты: {coins} <br />
        Автодобыча: {autoMining} монет/сек
      </div>
      <div style={{ position: "absolute", right: "20px", top: "20px" }}>
        <button
          onClick={() => setShowUpgradeDialog(true)}
          style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#ff9800", color: "white", border: "none", cursor: "pointer", borderRadius: "10px" }}
        >
          Улучшения
        </button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleClick}
          style={{ padding: "20px 40px", fontSize: "24px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer", borderRadius: "10px" }}
        >
          Добыть монету
        </button>
      </div>

      {/* Модальное окно для улучшений */}
      {showUpgradeDialog && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={() => setShowUpgradeDialog(false)} style={{ fontSize: '18px', color: 'white', backgroundColor: 'red', padding: '10px' }}>Закрыть</button>
            <h2>Улучшения</h2>
            <button onClick={improveClick} style={{ padding: "10px 20px", backgroundColor: "#ff9800", color: "white", border: "none", cursor: "pointer", borderRadius: "10px", marginTop: "10px" }}>
              Улучшить клик ({clickUpgradeCost} монет)
            </button>
            <button onClick={improveAutoMining} style={{ padding: "10px 20px", backgroundColor: "#ff9800", color: "white", border: "none", cursor: "pointer", borderRadius: "10px", marginTop: "10px" }}>
              Улучшить автодобычу ({autoMiningUpgradeCost} монет)
            </button>
            <button onClick={improveEnvironment} style={{ padding: "10px 20px", backgroundColor: "#ff9800", color: "white", border: "none", cursor: "pointer", borderRadius: "10px", marginTop: "10px" }}>
              Улучшить окружение ({environmentUpgradeCost} монет)
            </button>
          </div>
        </div>
      )}

      {/* Окружение */}
      <div className="background">
        {background.map((item, index) => (
          <img key={index} src={`/${item}.background.png`} alt={item} style={{ width: '100px', position: 'absolute', bottom: `${index * 30}px`, left: `${index * 100}px` }} />
        ))}
      </div>
    </div>
  );
}

export default App;
