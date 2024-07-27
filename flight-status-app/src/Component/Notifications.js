// src/Component/Notifications.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/notifications');
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchNotifications();
    }, []);

    return (
        <div>
            <h1>Flight Notifications</h1>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification.notification_id}>
                        <p>Flight ID: {notification.flight_id}</p>
                        <p>Message: {notification.message}</p>
                        <p>Method: {notification.method}</p>
                        <p>Recipient: {notification.recipient}</p>
                        <p>Timestamp: {new Date(notification.timestamp).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
