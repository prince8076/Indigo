// src/Component/NotificationForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { messaging } from '../firebase';
import { getToken } from 'firebase/messaging';

const NotificationForm = () => {
    const [flightId, setFlightId] = useState('');
    const [method, setMethod] = useState('');
    const [recipient, setRecipient] = useState('');
    const [token, setToken] = useState('');

    const addNotification = async () => {
        try {
            const timestamp = new Date().toISOString(); // Generate current timestamp
            await axios.post('http://localhost:5000/api/notifications', {
                flight_id: flightId,
                method,
                recipient,
                timestamp,
                token
            });
            alert('Notification added successfully!');
        } catch (error) {
            console.error('Error adding notification:', error);
            alert('Failed to add notification.');
        }
    };

    async function requestPermissions() {
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                // Generate token
                const token = await getToken(messaging, { vapidKey: process.env.REACT_APP_VAPID_KEY });
                setToken(token); // Save token in state
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
        <div style={styles.container}>
            <h1 style={styles.header}>Add Flight Notification</h1>
            <input
                type="text"
                placeholder="Flight ID"
                value={flightId}
                onChange={(e) => setFlightId(e.target.value)}
                style={styles.input}
            />
            <input
                type="text"
                placeholder="Notification Method (Email, SMS, App)"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                style={styles.input}
            />
            <input
                type="text"
                placeholder="Recipient (Email or Phone Number or App ID)"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                style={styles.input}
            />
            <button onClick={addNotification} style={styles.button}>Add Notification</button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        maxWidth: '400px',
        margin: '0 auto',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    header: {
        marginBottom: '20px',
    },
    input: {
        marginBottom: '10px',
        padding: '10px',
        width: '100%',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default NotificationForm;
