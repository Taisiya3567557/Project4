import React, { useEffect, useRef } from 'react';

const AnimatedText = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Размеры канваса
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Текст, который будет двигаться
    const text = 'Таисия';
    const fontSize = 50;
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let dx = 3 * (Math.random() > 0.5 ? 1 : -1); // Случайное движение по оси X
    let dy = 3 * (Math.random() > 0.5 ? 1 : -1); // Случайное движение по оси Y

    const drawText = () => {
      // Заливаем фон
      ctx.fillStyle = '#FF69B4'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Заливка канваса

      // Настройки шрифта и отрисовка текста
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = 'black';
      ctx.fillText(text, x, y);

      // Логика движения текста
      if (x + ctx.measureText(text).width >= canvas.width || x <= 0) {
        dx = -dx; // Меняем направление по оси X
      }
      if (y + fontSize >= canvas.height || y <= fontSize) {
        dy = -dy; // Меняем направление по оси Y
      }

      x += dx;
      y += dy;

      requestAnimationFrame(drawText); // Рекурсивный вызов для анимации
    };

    drawText(); // Начинаем анимацию

    return () => {
      // Очищаем анимацию при размонтировании компонента
      cancelAnimationFrame(drawText);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

const App = () => (
  <div>
    <AnimatedText />
  </div>
);

export default App;