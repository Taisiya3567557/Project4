import React, { useState } from 'react';
import './App.css';

const App = () => {
  // Состояние для темы
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Функция для переключения темы
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'dark-theme' : 'light-theme'}>
      <div className="container">
        <header>
          <h1>Личный Блог</h1>
          <button onClick={toggleTheme}>
            {isDarkMode ? 'Светлая тема' : 'Тёмная тема'}
          </button>
        </header>

        <section>
          <h2>О нас</h2>
          <p>
            Привет! Это мой личный блог, где я делюсь мыслями, опытом и
            вдохновением. Я люблю изучать новые технологии и делиться ими с вами!
          </p>
          <p>
            В этом блоге я рассказываю о веб-разработке, React, JavaScript и
            других интересных темах. Надеюсь, вам понравится!
          </p>
        </section>

        <footer>
          <p>
            © 2025 Личный блог. Все права защищены.
            <br />
            Свяжитесь со мной через{' '}
            <a href="mailto:email@example.com">email@example.com</a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
