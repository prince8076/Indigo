import React, { useState, useEffect } from 'react';

const AdminPage = () => {
    const [flights, setFlights] = useState([]);
    const [formData, setFormData] = useState({
        flight_id: '',
        airline: '',
        status: '',
        departure_gate: '',
        arrival_gate: '',
        scheduled_departure: '',
        scheduled_arrival: '',
        actual_departure: '',
        actual_arrival: ''
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchFlights();
    }, []);

    const fetchFlights = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/flights');
            const data = await response.json();
            setFlights(data);
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await fetch(`http://localhost:5000/api/flights/${editId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                alert('Flight updated successfully');
            } else {
                await fetch('http://localhost:5000/api/flights', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                alert('Flight added successfully');
            }
            fetchFlights();
            setFormData({
                flight_id: '',
                airline: '',
                status: '',
                departure_gate: '',
                arrival_gate: '',
                scheduled_departure: '',
                scheduled_arrival: '',
                actual_departure: '',
                actual_arrival: ''
            });
            setEditId(null);
        } catch (error) {
            console.error('Error saving flight data:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleEdit = (flight) => {
        setFormData({
            flight_id: flight.flight_id,
            airline: flight.airline,
            status: flight.status,
            departure_gate: flight.departure_gate,
            arrival_gate: flight.arrival_gate,
            scheduled_departure: flight.scheduled_departure,
            scheduled_arrival: flight.scheduled_arrival,
            actual_departure: flight.actual_departure,
            actual_arrival: flight.actual_arrival
        });
        setEditId(flight._id);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/flights/${id}`, {
                method: 'DELETE',
            });
            alert('Flight deleted successfully');
            fetchFlights();
        } catch (error) {
            console.error('Error deleting flight:', error);
        }
    };

    // Inline styles
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9'
    };

    const inputStyle = {
        marginBottom: '10px',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '5px'
    };

    const buttonStyle = {
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px'
    };

    const buttonHoverStyle = {
        backgroundColor: '#45a049'
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px'
    };

    const thStyle = {
        padding: '12px',
        backgroundColor: '#4CAF50',
        color: 'white'
    };

    const tdStyle = {
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'center'
    };

    const editButtonStyle = {
        padding: '5px 10px',
        margin: '0 5px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: '#ffa500',
        color: 'white',
        fontSize: '14px'
    };

    const deleteButtonStyle = {
        padding: '5px 10px',
        margin: '0 5px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: '#f44336',
        color: 'white',
        fontSize: '14px'
    };

    return (
        <div className="admin-page">
            <h1>Admin Page</h1>

            <form onSubmit={handleSubmit} style={formStyle}>
                <h2>{editId ? 'Edit Flight' : 'Add Flight'}</h2>
                <input
                    type="text"
                    name="flight_id"
                    value={formData.flight_id}
                    onChange={handleInputChange}
                    placeholder="Flight ID"
                    style={inputStyle}
                    required
                />
                <input
                    type="text"
                    name="airline"
                    value={formData.airline}
                    onChange={handleInputChange}
                    placeholder="Airline"
                    style={inputStyle}
                    required
                />
                <input
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    placeholder="Status"
                    style={inputStyle}
                    required
                />
                <input
                    type="text"
                    name="departure_gate"
                    value={formData.departure_gate}
                    onChange={handleInputChange}
                    placeholder="Departure Gate"
                    style={inputStyle}
                    required
                />
                <input
                    type="text"
                    name="arrival_gate"
                    value={formData.arrival_gate}
                    onChange={handleInputChange}
                    placeholder="Arrival Gate"
                    style={inputStyle}
                    required
                />
                <input
                    type="datetime-local"
                    name="scheduled_departure"
                    value={formData.scheduled_departure}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                />
                <input
                    type="datetime-local"
                    name="scheduled_arrival"
                    value={formData.scheduled_arrival}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                />
                <input
                    type="datetime-local"
                    name="actual_departure"
                    value={formData.actual_departure}
                    onChange={handleInputChange}
                    style={inputStyle}
                />
                <input
                    type="datetime-local"
                    name="actual_arrival"
                    value={formData.actual_arrival}
                    onChange={handleInputChange}
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle} onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}>
                    {editId ? 'Update Flight' : 'Add Flight'}
                </button>
            </form>

            <div style={{ marginTop: '20px', overflowX: 'auto' }}>
                <h2>Existing Flights</h2>
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
                            <th style={thStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flights.length ? (
                            flights.map((flight) => (
                                <tr key={flight._id}>
                                    <td style={tdStyle}>{flight.flight_id}</td>
                                    <td style={tdStyle}>{flight.airline}</td>
                                    <td style={tdStyle}>{flight.status}</td>
                                    <td style={tdStyle}>{flight.departure_gate}</td>
                                    <td style={tdStyle}>{flight.arrival_gate}</td>
                                    <td style={tdStyle}>{new Date(flight.scheduled_departure).toLocaleString()}</td>
                                    <td style={tdStyle}>{new Date(flight.scheduled_arrival).toLocaleString()}</td>
                                    <td style={tdStyle}>{flight.actual_departure ? new Date(flight.actual_departure).toLocaleString() : 'N/A'}</td>
                                    <td style={tdStyle}>{flight.actual_arrival ? new Date(flight.actual_arrival).toLocaleString() : 'N/A'}</td>
                                    <td style={tdStyle}>
                                        <button style={editButtonStyle} onClick={() => handleEdit(flight)}>Edit</button>
                                        <button style={deleteButtonStyle} onClick={() => handleDelete(flight._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" style={{ textAlign: 'center', padding: '20px' }}>No flights available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPage;
