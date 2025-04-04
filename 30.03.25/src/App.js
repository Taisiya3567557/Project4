import React, { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/books") // Запрос к Flask API
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Ошибка загрузки:", error));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#e91e63", textAlign: "center" }}>📚 Список книг</h1>
      {books.length === 0 ? (
        <p>Загрузка...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {books.map((book, index) => (
            <li
              key={index}
              style={{
                background: "#f5f5f5",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2 style={{ marginBottom: "5px", color: "#333" }}>{book.title}</h2>
              <p><strong>Автор:</strong> {book.author}</p>
              <p><strong>Цена:</strong> {book.price}</p>
              <p><strong>Рейтинг:</strong> {book.rating}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
