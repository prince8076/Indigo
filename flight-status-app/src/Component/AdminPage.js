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

    return (
        <div className="admin-page">
            <h1>Add New Flight</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="flight_id">Flight ID:</label>
                    <input
                        type="text"
                        id="flight_id"
                        name="flight_id"
                        value={flightData.flight_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="airline">Airline:</label>
                    <input
                        type="text"
                        id="airline"
                        name="airline"
                        value={flightData.airline}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="status">Status:</label>
                    <input
                        type="text"
                        id="status"
                        name="status"
                        value={flightData.status}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="departure_gate">Departure Gate:</label>
                    <input
                        type="text"
                        id="departure_gate"
                        name="departure_gate"
                        value={flightData.departure_gate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="arrival_gate">Arrival Gate:</label>
                    <input
                        type="text"
                        id="arrival_gate"
                        name="arrival_gate"
                        value={flightData.arrival_gate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="scheduled_departure">Scheduled Departure:</label>
                    <input
                        type="datetime-local"
                        id="scheduled_departure"
                        name="scheduled_departure"
                        value={flightData.scheduled_departure}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="scheduled_arrival">Scheduled Arrival:</label>
                    <input
                        type="datetime-local"
                        id="scheduled_arrival"
                        name="scheduled_arrival"
                        value={flightData.scheduled_arrival}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="actual_departure">Actual Departure:</label>
                    <input
                        type="datetime-local"
                        id="actual_departure"
                        name="actual_departure"
                        value={flightData.actual_departure}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="actual_arrival">Actual Arrival:</label>
                    <input
                        type="datetime-local"
                        id="actual_arrival"
                        name="actual_arrival"
                        value={flightData.actual_arrival}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add Flight</button>
            </form>
        </div>
    );
};

export default AdminPage;
