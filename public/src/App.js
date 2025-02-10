import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Settings from './Settings';
import Home from './home'

function App() {
 

  return (
    <Router>
   

      {/* Wrap Routes with the Routes component */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
