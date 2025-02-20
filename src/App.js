import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

// Главная страница
const Home = () => (
  <div className="home-container">
    <header className="home-header">
      <h1 className="home-title">Добро пожаловать на главную страницу!</h1>
      <p className="home-description">Мы рады вас видеть! Выберите одну из страниц для дальнейшего путешествия:</p>
    </header>
    <nav className="home-nav">
      <Link to="/about" className="home-link">О нас</Link>
      <Link to="/contacts" className="home-link">Контакты</Link>
      <Link to="/calculator" className="home-link">Калькулятор</Link>
      <Link to="/personal-finance" className="home-link">Личные финансы</Link>
      <Link to="/protected" className="home-link">Защищенная страница</Link>
    </nav>
  </div>
);

// Страница "О нас"
const About = () => (
  <div className="about-container">
    <h1>О нас</h1>
    <p>
      Мы - команда профессионалов, стремящихся предоставить инновационные решения для управления личными финансами. 
      Наша цель - помочь вам эффективно управлять своими доходами, расходами и налогами. Мы предоставляем удобные инструменты и ресурсы, 
      которые помогут вам принимать обоснованные финансовые решения.
    </p>
    <p>
      Мы гордимся тем, что предоставляем высококачественные сервисы для людей, которые хотят улучшить свое финансовое положение и 
      обеспечить свое будущее. Наша команда всегда в поиске лучших решений для достижения этих целей.
    </p>
    <p>
      Присоединяйтесь к нам и станьте частью финансового роста и успеха!
    </p>
  </div>
);

// Страница "Контакты"
const Contacts = () => (
  <div className="contacts-container">
    <h1>Контакты</h1>
    <p>Вы можете связаться с нами через следующие каналы:</p>
    
    <h3>Электронная почта</h3>
    <p>Для общих вопросов и предложений пишите нам на почту: <a href="mailto:angei@example.com">info@example.com</a></p>
    
    <h3>Телефон</h3>
    <p>Вы можете позвонить по номеру: <a href="tel:+1234567890">+7 777 584 69 02</a></p>
    
    <h3>Адрес</h3>
    <p>Наш офис находится по адресу: 1234 Финансовый проспект, Город Уральск, Страна Казахстан</p>
    
    <h3>Форма обратной связи</h3>
    <p>Заполните форму ниже, и мы свяжемся с вами в ближайшее время:</p>
    
    <form>
      <div>
        <label htmlFor="name">Ваше имя:</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div>
        <label htmlFor="email">Ваша электронная почта:</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div>
        <label htmlFor="message">Ваше сообщение:</label>
        <textarea id="message" name="message" rows="4" required></textarea>
      </div>
      <button type="submit">Отправить</button>
    </form>
  </div>
);

// Калькулятор
const Calculator = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [taxRate, setTaxRate] = useState(0);

  const calculateTax = () => {
    return (income - expenses) * (taxRate / 100);
  };

  return (
    <div>
      <h1>Калькулятор финансов</h1>
      <p>Этот калькулятор помогает рассчитать налог, который нужно заплатить, исходя из ваших доходов, расходов и процентной ставки налога.</p>
      
      <div>
        <label>Доход:</label>
        <input
          type="number"
          placeholder="Введите доход"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
      </div>

      <div>
        <label>Расходы:</label>
        <input
          type="number"
          placeholder="Введите расходы"
          value={expenses}
          onChange={(e) => setExpenses(e.target.value)}
        />
      </div>

      <div>
        <label>Процент налога:</label>
        <input
          type="number"
          placeholder="Введите процент налога"
          value={taxRate}
          onChange={(e) => setTaxRate(e.target.value)}
        />
      </div>

      <h2>Результат расчета:</h2>
      <table border="1" style={{ width: "100%", marginTop: "20px", textAlign: "center" }}>
        <thead>
          <tr>
            <th>Доход</th>
            <th>Расходы</th>
            <th>Процент налога</th>
            <th>Налог к уплате</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{income}</td>
            <td>{expenses}</td>
            <td>{taxRate}%</td>
            <td>{calculateTax()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// Защищенная страница
const Protected = () => {
  const [taxRate, setTaxRate] = useState(0);

  const changeTaxRate = () => {
    const password = prompt('Введите пароль для изменения налога:');
    if (password === '010203') {
      const newRate = prompt('Введите новый процент налога:');
      setTaxRate(newRate);
    } else {
      alert('Неверный пароль');
    }
  };

  return (
    <div>
      <h1>Защищенная страница</h1>
      <h2>Текущий процент налога: {taxRate}%</h2>
      <button onClick={changeTaxRate}>Изменить процент налога</button>
    </div>
  );
};

// Личные финансы
const PersonalFinance = () => (
  <div className="personal-finance-container">
    <h1 className="personal-finance-title">Личные финансы</h1>
    <p><strong>Бюджетирование:</strong> Ведение бюджета помогает контролировать расходы и распределять доходы на важные категории. Начните с создания простого бюджета, учитывая ежемесячные доходы и расходы.</p>
    <p><strong>Сбережения:</strong> Регулярное откладывание части дохода на сбережения помогает создавать финансовую подушку безопасности. Это может быть просто часть дохода, которая откладывается на непредвиденные расходы.</p>
    <p><strong>Инвестиции:</strong> Инвестирование может помочь увеличивать капитал. Важно исследовать доступные варианты инвестиций и диверсифицировать портфель для снижения рисков.</p>
    <p><strong>Налоги:</strong> Знание своих налоговых обязательств и возможности налоговых вычетов позволяет эффективно управлять своими финансами и избегать штрафов.</p>
    <p><strong>Пенсионное обеспечение:</strong> Начните откладывать на пенсию как можно раньше. Раннее начало инвестиций в пенсионные фонды или другие инструменты поможет накопить средства для комфортной старости.</p>
  </div>
);

// Страница для входа
const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    const password = prompt('Введите пароль для доступа к защищенной странице:');
    if (password === '010203') {
      navigate('/protected');
    } else {
      alert('Неверный пароль');
    }
  };

  return (
    <div>
      <h1>Вход в защищенную страницу</h1>
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
};

// Основной компонент приложения
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/personal-finance" element={<PersonalFinance />} />
        <Route path="/protected" element={<Protected />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;

// Стиль для всего приложения
const style = `
  body {
    font-family: 'Arial', sans-serif;
    background-color: #e0c4f3; /* светлый фиолетовый фон */
    margin: 0;
    padding: 0;
    color: #333;
  }

  .home-container {
    background: linear-gradient(to right, #9b59b6, #8e44ad); /* фиолетовый градиент */
    padding: 50px 20px;
    text-align: center;
    height: 100vh;
  }

  .home-header {
    color: white;
    margin-bottom: 30px;
  }

  .home-title {
    font-size: 3rem;
    margin: 0;
  }

  .home-description {
    font-size: 1.5rem;
    margin-top: 10px;
  }

  .home-nav {
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }

  .home-link {
    font-size: 1.2rem;
    color: white;
    text-decoration: none;
    padding: 10px 20px;
    background-color: #6c3483; /* фиолетовый цвет кнопки */
    border-radius: 5px;
    transition: background-color 0.3s;
  }

  .home-link:hover {
    background-color: #9b59b6; /* яркий фиолетовый при наведении */
  }

  .about-container, .contacts-container {
    padding: 20px;
    text-align: center;
  }

  h1 {
    text-align: center;
    color: #4a235a; /* темный фиолетовый для заголовков */
  }

  button {
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #6c3483; /* фиолетовый цвет кнопки */
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #9b59b6; /* фиолетовый при наведении */
  }

  form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }

  input, textarea {
    padding: 10px;
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  input[type="submit"] {
    background-color: #9b59b6; /* фиолетовый цвет для кнопки отправки */
    border: none;
    color: white;
  }

  .personal-finance-container {
    background: #f1e4f7; /* светлый фиолетовый фон */
    padding: 40px 20px;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .personal-finance-title {
    color: #9b59b6;
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  .personal-finance-container p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 15px;
    color: #555;
  }

  .personal-finance-container p strong {
    color: #8e44ad;
  }

  .personal-finance-container p:last-child {
    margin-bottom: 0;
  }
`;

const styleTag = document.createElement('style');
styleTag.innerHTML = style;
document.head.appendChild(styleTag);
