import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    Button,
    TextField,
} from '@mui/material';
import './Requests.css'; // Импортируем файл стилей, если хотите

const MyRequests = () => {
    const [requests, setRequests] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Функция для получения заявок текущего пользователя
    const fetchMyRequests = async () => {
        try {
            const token = localStorage.getItem('token'); // Получаем токен из localStorage
            const user_id = localStorage.getItem('user_id'); // Получаем user_id из localStorage

            const response = await fetch(`http://localhost:8080/requests?user_id=${user_id}`, {
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
        fetchMyRequests();
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredRequests = requests.filter(request =>
        request.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.part_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                My Requests
            </Typography>
            <Box mt={2}>
                <TextField
                    label="Search Requests"
                    value={searchQuery}
                    onChange={handleSearch}
                    fullWidth
                />
            </Box>
            {errorMessage && <Typography color="error">{errorMessage}</Typography>}
            <Box mt={2}>
                <Link to="/create-request">
                    <Button variant="contained" color="primary">
                        Create New Request
                    </Button>
                </Link>
            </Box>
            <Box mt={2}>
                {filteredRequests.length === 0 ? (
                    <Typography>No requests found.</Typography>
                ) : (
                    <div className="requests-container">
                        {filteredRequests.map((request, index) => (
                            <Link to={`/request/${request.id}`} key={index} style={{ textDecoration: 'none' }}>
                                <Box className="request-card" p={2} mb={2} border={1} borderColor="grey.300">
                                    <Typography><strong>Category:</strong> {request.category}</Typography>
                                    <Typography><strong>Brand:</strong> {request.brand}</Typography>
                                    <Typography><strong>Model:</strong> {request.model}</Typography>
                                    <Typography><strong>Year:</strong> {request.year}</Typography>
                                    <Typography><strong>Part Name:</strong> {request.part_name}</Typography>
                                    <Typography><strong>Max Price:</strong> {request.max_price} руб.</Typography>
                                    <Typography><strong>Distance:</strong> {request.distance} км</Typography>
                                </Box>
                            </Link>
                        ))}
                    </div>
                )}
            </Box>
        </Container>
    );
};

export default MyRequests;
