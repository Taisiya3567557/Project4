import React, { useState, useEffect, useMemo } from 'react';

const symbols = ['♥', '♦', '♣', '♠', '★', '☆', '■', '□'];

const shuffleCards = () => {
  // Дублируем символы, чтобы было 16 карт
  const cards = [...symbols, ...symbols];
  // Перемешиваем массив
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
};

const MemoryGame = () => {
  const [cards, setCards] = useState(shuffleCards());
  const [flipped, setFlipped] = useState(Array(16).fill(false));
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (selectedIndexes.length === 2) {
      const [firstIndex, secondIndex] = selectedIndexes;
      if (cards[firstIndex] === cards[secondIndex]) {
        // Карты совпали, оставляем их открытыми
        setSelectedIndexes([]);
      } else {
        // Если карты не совпали, закрываем их через секунду
        setTimeout(() => {
          setFlipped(prev => {
            const newFlipped = [...prev];
            newFlipped[firstIndex] = false;
            newFlipped[secondIndex] = false;
            return newFlipped;
          });
          setSelectedIndexes([]);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [selectedIndexes, cards]);

  useEffect(() => {
    // Проверяем победу (если все карты открыты)
    if (flipped.every(state => state)) {
      setWon(true);
    }
  }, [flipped]);

  const handleClick = index => {
    if (flipped[index] || selectedIndexes.length === 2 || won) return;
    
    const newFlipped = [...flipped];
    newFlipped[index] = true;
    setFlipped(newFlipped);

    setSelectedIndexes(prev => [...prev, index]);
  };

  const restartGame = () => {
    setCards(shuffleCards());
    setFlipped(Array(16).fill(false));
    setSelectedIndexes([]);
    setMoves(0);
    setWon(false);
  };

  return (
    <div>
      <h1>Игра на память</h1>
      {won && <div>Вы победили за {moves} ходов!</div>}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={restartGame}>Начать заново</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 100px)', gap: '10px' }}>
        {cards.map((symbol, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: '100px',
              height: '100px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: flipped[index] ? 'white' : 'gray',
              border: '1px solid black',
              cursor: 'pointer',
            }}
          >
            {flipped[index] ? symbol : ''}
          </div>
        ))}
      </div>
      <div>Ходов: {moves}</div>
    </div>
  );
};

export default MemoryGame;
