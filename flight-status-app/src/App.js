// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlightStatus from './Component/FlightStatus';
import AdminPage from './Component/AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlightStatus />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}
export default App;
