// src/components/FlightStatus.js
import React, { useState, useEffect } from 'react';

const FlightStatus = () => {
    const [flights, setFlights] = useState([]);

    const fetchFlightData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/flights');
            const data = await response.json();
            setFlights(data);
        } catch (error) {
            console.error('Error fetching flight data:', error);
        }
    };

    useEffect(() => {
        fetchFlightData();

        const ws = new WebSocket('ws://localhost:5000');
        ws.onmessage = (event) => {
            const update = JSON.parse(event.data);
            setFlights((prevFlights) => {
                const updatedFlights = prevFlights.map((flight) =>
                    flight.flight_id === update.flight_id ? { ...flight, ...update } : flight
                );
                return updatedFlights;
            });
        };

        return () => ws.close();
    }, []);

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        margin: '20px 0',
    };

    const thStyle = {
        padding: '12px',
        textAlign: 'left',
        backgroundColor: '#4CAF50',
        color: 'white',
    };

    const tdStyle = {
        padding: '8px',
        textAlign: 'center',
        border: '1px solid #ddd',
    };

    const headingStyle = {
        textAlign: 'center',
        margin: '20px 0',

    };

    return (
        <div className="flight-status">
            <h1 style={headingStyle}>Flight Status</h1>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Flight ID</th>
                        <th style={thStyle}>Airline</th>
                        <th style={thStyle}>Status</th>
                        <th style={thStyle}>Departure Gate</th>
                        <th style={thStyle}>Arrival Gate</th>
                        <th style={thStyle}>Scheduled Departure</th>
                        <th style={thStyle}>Scheduled Arrival</th>
                        <th style={thStyle}>Actual Departure</th>
                        <th style={thStyle}>Actual Arrival</th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map((flight) => (
                        <tr key={flight.flight_id}>
                            <td style={tdStyle}>{flight.flight_id}</td>
                            <td style={tdStyle}>{flight.airline}</td>
                            <td style={tdStyle}>{flight.status}</td>
                            <td style={tdStyle}>{flight.departure_gate}</td>
                            <td style={tdStyle}>{flight.arrival_gate}</td>
                            <td style={tdStyle}>{new Date(flight.scheduled_departure).toLocaleString()}</td>
                            <td style={tdStyle}>{new Date(flight.scheduled_arrival).toLocaleString()}</td>
                            <td style={tdStyle}>{flight.actual_departure ? new Date(flight.actual_departure).toLocaleString() : 'N/A'}</td>
                            <td style={tdStyle}>{flight.actual_arrival ? new Date(flight.actual_arrival).toLocaleString() : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FlightStatus;
