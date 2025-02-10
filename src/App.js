import React, { useState, useEffect, useMemo } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20); // Можно менять количество элементов на странице

  // Загружаем данные с API
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://dummyjson.com/products?limit=10000');
      const data = await response.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  // Мемоизация для улучшения производительности
  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    return products.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [currentPage, itemsPerPage, products]);

  // Пагинация
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // сбросить страницу на первую при изменении количества элементов на странице
  };

  // Функция перевода описания на русский
  const translateDescription = (description) => {
    const translations = {
      "This is a product description": "Это описание продукта",
      "A high-quality item": "Высококачественный товар",
      "This item is durable and reliable": "Этот товар прочный и надежный",
      // Добавьте другие переводы в этот объект
    };

    return translations[description] || description; // Возвращаем переведенное описание или оригинал
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '50px', backgroundColor: '#f4f7fa' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Таблица продуктов</h1>

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
            <th style={{ padding: '12px 18px', textAlign: 'center' }}>ID</th>
            <th style={{ padding: '12px 18px', textAlign: 'center' }}>Название</th>
            <th style={{ padding: '12px 18px', textAlign: 'center' }}>Цена</th>
            <th style={{ padding: '12px 18px', textAlign: 'center' }}>Описание</th>
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
              <td style={{ padding: '10px 15px', textAlign: 'center' }}>{product.id}</td>
              <td style={{ padding: '10px 15px', textAlign: 'center' }}>{product.title}</td> {/* Используем product.title вместо product.name */}
              <td style={{ padding: '10px 15px', textAlign: 'center' }}>{product.price}</td>
              <td style={{ padding: '10px 15px', textAlign: 'center' }}>
                {/* Переводим описание на русский */}
                {translateDescription(product.description)}
              </td>
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
  );
}

export default App;