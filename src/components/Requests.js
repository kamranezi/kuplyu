import React, { useState, useEffect } from 'react';
import './Requests.css'; // Импортируем файл стилей, если хотите

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [formData, setFormData] = useState({
        category: '',
        brand: '',
        model: '',
        year: '',
        part_name: '',
        max_price: '',
        distance: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [showForm, setShowForm] = useState(false); // Для отображения формы

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверяем, что все поля заполнены
        if (!formData.category || !formData.brand || !formData.model || !formData.year || !formData.part_name || !formData.max_price || !formData.distance) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const token = localStorage.getItem('token'); // Получаем токен из localStorage

            // Извлекаем user_id из токена (предполагаем, что токен содержит эту информацию)
            const payload = JSON.parse(atob(token.split('.')[1]));
            const user_id = payload.user_id;

            // Добавляем user_id в formData
            const requestData = {
                user_id, // Добавляем user_id
                ...formData,
                max_price: Number(formData.max_price), // Приводим к числу
                distance: Number(formData.distance), // Приводим к числу
                year: Number(formData.year), // Приводим к числу
            };

            const response = await fetch('http://localhost:8080/requests/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Передаем токен в заголовках
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                alert('Request created successfully!');
                setShowForm(false); // Закрываем форму после успешного создания
                fetchRequests(); // Обновляем список заявок после создания новой
            } else {
                const data = await response.json();
                alert('Failed to create request: ' + (data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error creating request:', error);
            alert('An error occurred while creating the request.');
        }
    };

    return (
        <div>
            <h2>Requests</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Create New Request'}
            </button>

            {showForm && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Brand:</label>
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Model:</label>
                        <input
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Year:</label>
                        <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Part Name:</label>
                        <input
                            type="text"
                            name="part_name"
                            value={formData.part_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Max Price:</label>
                        <input
                            type="number"
                            name="max_price"
                            value={formData.max_price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Distance:</label>
                        <input
                            type="number"
                            name="distance"
                            value={formData.distance}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Submit Request</button>
                </form>
            )}

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
