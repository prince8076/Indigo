// src/components/AdminPage.js
import React, { useState } from 'react';

const AdminPage = () => {
    const [flightData, setFlightData] = useState({
        flight_id: '',
        airline: '',
        status: '',
        departure_gate: '',
        arrival_gate: '',
        scheduled_departure: '',
        scheduled_arrival: '',
        actual_departure: '',
        actual_arrival: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFlightData({
            ...flightData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/flights', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(flightData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            alert('Flight added successfully');
            setFlightData({
                flight_id: '',
                airline: '',
                status: '',
                departure_gate: '',
                arrival_gate: '',
                scheduled_departure: '',
                scheduled_arrival: '',
                actual_departure: '',
                actual_arrival: '',
            });
        } catch (error) {
            console.error('Error adding flight:', error);
            alert('Error adding flight');
        }
    };

    // Inline CSS Styles
    const styles = {
        container: {
            maxWidth: '600px',
            margin: 'auto',
            padding: '20px',
        },
        heading: {
            textAlign: 'center',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
        },
        formGroup: {
            marginBottom: '10px',
        },
        label: {
            marginRight: '10px',
        },
        input: {
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            boxSizing: 'border-box',
        },
        button: {
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            marginTop: '10px',
        },
        buttonHover: {
            backgroundColor: '#45a049',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Add New Flight</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                {Object.keys(flightData).map((key) => (
                    <div key={key} style={styles.formGroup}>
                        <label htmlFor={key} style={styles.label}>
                            {key.replace(/_/g, ' ').toUpperCase()}:
                        </label>
                        <input
                            type={key.includes('date') || key.includes('time') ? 'datetime-local' : 'text'}
                            id={key}
                            name={key}
                            value={flightData[key]}
                            onChange={handleChange}
                            style={styles.input}
                            required={key !== 'actual_departure' && key !== 'actual_arrival'}
                        />
                    </div>
                ))}
                <button type="submit" style={styles.button}>
                    Add Flight
                </button>
            </form>
        </div>
    );
};

export default AdminPage;
