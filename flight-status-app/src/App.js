// src/App.js
import React, { useEffect } from 'react';
import { messaging } from './firebase';
import { getToken } from 'firebase/messaging';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlightStatus from './Component/FlightStatus';
import AdminPage from './Component/AdminPage';

function App() {

  async function requestPermissions() {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // Generate token
        const token = await getToken(messaging, { vapidKey: 'BMIxKdHwQ_MVBIQr9q7-DyoHWyIosl1YvSGfn8fi_o8WKJOTiVqnuo-I9tLJgj-Fs6cLTe5g1q8nZfUZ8CG5VxU' });
        console.log("Token generated:", token);
      } else if (permission === 'denied') {
        alert('Notification permission denied');
      }
    } catch (error) {
      console.error('Error requesting notification permission or generating token:', error);
      alert('Error requesting notification permission or generating token:' + error);
    }
  }

  useEffect(() => {
    // Request user for notifications
    requestPermissions();
  }, []);

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
