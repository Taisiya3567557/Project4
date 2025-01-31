import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import UserDetail from './UserDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/users/:userId" element={<UserDetail />} />
      </Routes>
    </Router>
  );
}

export default App;