import React, { useState, useEffect } from 'react';

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        user_id: '',
        category: '',
        brand: '',
        model: '',
        year: '',
        part_name: '',
        max_price: '',
        distance: '',
    });

    useEffect(() => {
        // Функция для получения всех заявок
        const fetchRequests = async () => {
            try {
                const response = await fetch('http://localhost:8080/requests', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setRequests(data.requests); // Сохраняем заявки в состоянии
                } else {
                    console.error('Failed to fetch requests');
                }
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchRequests(); // Вызываем функцию при загрузке компонента
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Преобразование значений в числа
        const dataToSend = {
            user_id: parseInt(formData.user_id, 10), // Преобразование в число
            category: formData.category,
            brand: formData.brand,
            model: formData.model,
            year: parseInt(formData.year, 10), // Преобразование в число
            part_name: formData.part_name,
            max_price: parseFloat(formData.max_price), // Преобразование в число с плавающей запятой
            distance: parseInt(formData.distance, 10) // Преобразование в число
        };

        try {
            const response = await fetch('http://localhost:8080/requests/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend), // Отправляем данные
            });

            if (response.ok) {
                alert('Request created successfully!');
                setShowForm(false); // Закрываем форму
                // Перезагрузка заявок после создания новой
                const fetchRequests = await fetch('http://localhost:8080/requests');
                const data = await fetchRequests.json();
                setRequests(data.requests); // Обновляем список заявок
            } else {
                const errorData = await response.json();
                alert(`Failed to create request: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error creating request:', error);
            alert('An error occurred while creating the request.');
        }
    };

    return (
        <div>
            <h2>Requests</h2>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Create New Request'}
            </button>

            {showForm && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>User Id:</label>
                        <input
                            type="number"
                            name="user_id"
                            value={formData.user_id}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
            <ul>
                {requests.length > 0 ? (
                    requests.map((request) => (
                        <li key={request.id}>
                            <strong>Category:</strong> {request.category} <br />
                            <strong>Brand:</strong> {request.brand} <br />
                            <strong>Model:</strong> {request.model} <br />
                            <strong>Part Name:</strong> {request.part_name || 'N/A'} <br />
                            <strong>Year:</strong> {request.year} <br />
                            <strong>Max Price:</strong> {request.max_price} руб. <br />
                            <strong>Distance:</strong> {request.distance} km
                        </li>
                    ))
                ) : (
                    <p>No requests available</p>
                )}
            </ul>
        </div>
    );
};

export default Requests;
