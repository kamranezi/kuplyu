import React, { useState, useEffect } from 'react';
import './Requests.css';
import { Link } from 'react-router-dom'; // Импортируем файл стилей, если хотите

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Функция для получения заявок
    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem('token'); // Получаем токен из localStorage
            const response = await fetch('http://localhost:8080/requests', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Передаем токен в заголовках
                },
            });

            if (response.ok) {
                const data = await response.json();
                setRequests(data.requests);
            } else {
                setErrorMessage('Failed to fetch requests');
            }
        } catch (error) {
            console.error('Error fetching requests:', error);
            setErrorMessage('An error occurred while fetching requests.');
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div>
            <h2>Requests</h2>
            <Link to="/my-requests">
                <button>Мои заявки</button>
            </Link>
            <Link to="/create-request">
                <button>Create New Request</button>
            </Link>
            <div>
                <input type="text" placeholder="Поиск заявок..."/>
                <button>Поиск</button>
            </div>
            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}

            <h3>All Requests</h3>
            {requests.length === 0 ? (
                <p>No requests found.</p>
            ) : (
                <div className="requests-container">
                    {requests.map((request, index) => (
                        <div key={index} className="request-card">
                            <p><strong>Category:</strong> {request.category}</p>
                            <p><strong>Brand:</strong> {request.brand}</p>
                            <p><strong>Model:</strong> {request.model}</p>
                            <p><strong>Year:</strong> {request.year}</p>
                            <p><strong>Part Name:</strong> {request.part_name}</p>
                            <p><strong>Max Price:</strong> {request.max_price} руб.</p>
                            <p><strong>Distance:</strong> {request.distance} км</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Requests;
