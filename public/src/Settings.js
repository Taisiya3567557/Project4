import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const [settings, setSettings] = useState({
    id: { visible: true, width: 100, backgroundColor: '#ffffff' },
    title: { visible: true, width: 200, backgroundColor: '#ffffff' },
    price: { visible: true, width: 150, backgroundColor: '#ffffff' },
    description: { visible: true, width: 300, backgroundColor: '#ffffff' }
  });

  const history = useNavigate();

  useEffect(() => {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleChange = (column, field, value) => {
    // Convert value to number if it's a numeric field (like width)
    const newValue = field === 'width' ? Number(value) : value;
  
    setSettings(prevSettings => ({
      ...prevSettings,
      [column]: { ...prevSettings[column], [field]: newValue }
    }));
  };
  
  const handleSave = () => {
    localStorage.setItem('settings', JSON.stringify(settings));
    history('/'); // Переход на главную страницу после сохранения
  };

  return (
    <div style={{ padding: '50px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Настройки вывода таблицы</h1>
      <div style={{ marginBottom: '30px' }}>
        {Object.keys(settings).map(column => (
          <div key={column} style={{ marginBottom: '20px' }}>
            <h3>{column.toUpperCase()}</h3>
            <label>
              Видимость:
              <input
                type="checkbox"
                checked={settings[column].visible}
                onChange={e => handleChange(column, 'visible', e.target.checked)}
              />
            </label>
            <br />
            <label>
              Ширина:
              <input
                type="number"
                value={settings[column].width}
                onChange={e => handleChange(column, 'width', e.target.value)}
                style={{ marginLeft: '10px' }}
              />
            </label>
            <br />
            <label>
              Фоновый цвет:
              <input
                type="color"
                value={settings[column].backgroundColor}
                onChange={e => handleChange(column, 'backgroundColor', e.target.value)}
                style={{ marginLeft: '10px' }}
              />
            </label>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleSave}
          style={{
            padding: '10px 20px',
            backgroundColor: '#1e88e5',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Сохранить изменения
        </button>
      </div>
    </div>
  );
}

export default Settings;