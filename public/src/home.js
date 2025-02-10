import React, { useState, useEffect, useMemo } from 'react';
import {  Link } from 'react-router-dom';


function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Загружаем данные с API
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://dummyjson.com/products?limit=10000');
      const data = await response.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  // Загружаем настройки из localStorage
  const loadSettings = () => {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    return {
      id: { visible: true, width: 100, backgroundColor: '#ffffff' },
      title: { visible: true, width: 200, backgroundColor: '#ffffff' },
      price: { visible: true, width: 150, backgroundColor: '#ffffff' },
      description: { visible: true, width: 300, backgroundColor: '#ffffff' }
    };
  };

  const [settings, setSettings] = useState(loadSettings);

  // Мемоизация для улучшения производительности
  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    return products.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [currentPage, itemsPerPage, products]);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const translateDescription = (description) => {
    const translations = {
      "This is a product description": "Это описание продукта",
      "A high-quality item": "Высококачественный товар",
      "This item is durable and reliable": "Этот товар прочный и надежный",
    };

    return translations[description] || description;
  };

  return (
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '50px', backgroundColor: '#f4f7fa' }}>
        <h1 style={{ textAlign: 'center', color: '#333' }}>Таблица продуктов</h1>

        {/* Иконка настроек */}
        <Link to="/settings" style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '24px', color: '#1e88e5' }}>
          ⚙️
        </Link>

        {/* Настройка количества элементов на странице */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <label>Элементов на странице: </label>
          <select
            onChange={handleItemsPerPageChange}
            value={itemsPerPage}
            style={{
              padding: '8px 12px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        {/* Таблица с продуктами */}
        <table
          style={{
            margin: '0 auto',
            width: '90%',
            borderCollapse: 'collapse',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#1e88e5', color: '#fff' }}>
              {settings.id.visible && (
                <th style={{ padding: '12px 18px', textAlign: 'center', width: settings.id.width, backgroundColor: settings.id.backgroundColor }}>ID</th>
              )}
              {settings.title.visible && (
                <th style={{ padding: '12px 18px', textAlign: 'center', width: settings.title.width, backgroundColor: settings.title.backgroundColor }}>Название</th>
              )}
              {settings.price.visible && (
                <th style={{ padding: '12px 18px', textAlign: 'center', width: settings.price.width, backgroundColor: settings.price.backgroundColor }}>Цена</th>
              )}
              {settings.description.visible && (
                <th style={{ padding: '12px 18px', textAlign: 'center', width: settings.description.width, backgroundColor: settings.description.backgroundColor }}>Описание</th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr
                key={product.id}
                style={{
                  borderBottom: '1px solid #ddd',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#f1f8ff')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#fff')}
              >
                {settings.id.visible && (
                  <td style={{ padding: '10px 15px', textAlign: 'center' }}>{product.id}</td>
                )}
                {settings.title.visible && (
                  <td style={{ padding: '10px 15px', textAlign: 'center' }}>{product.title}</td>
                )}
                {settings.price.visible && (
                  <td style={{ padding: '10px 15px', textAlign: 'center' }}>{product.price}</td>
                )}
                {settings.description.visible && (
                  <td style={{ padding: '10px 15px', textAlign: 'center' }}>
                    {translateDescription(product.description)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Пагинация */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
              style={{
                margin: '0 5px',
                padding: '10px 15px',
                backgroundColor: currentPage === index + 1 ? '#1e88e5' : '#f4f7fa',
                border: '1px solid #1e88e5',
                borderRadius: '5px',
                color: currentPage === index + 1 ? '#fff' : '#333',
                cursor: currentPage === index + 1 ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#e1f5fe')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = currentPage === index + 1 ? '#1e88e5' : '#f4f7fa')}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      )
      }

      export default Home;


      