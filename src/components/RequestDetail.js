import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
} from '@mui/material';

const RequestDetail = () => {
    const { requestId } = useParams();
    const [request, setRequest] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchRequestDetail = async () => {
        try {
            const token = localStorage.getItem('token'); // Получаем токен из localStorage

            const response = await fetch(`http://localhost:8080/requests?request_id=${requestId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Передаем токен в заголовках
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (data.requests.length > 0) {
                    setRequest(data.requests[0]);
                } else {
                    setErrorMessage('Request not found');
                }
            } else {
                setErrorMessage('Failed to fetch request details');
            }
        } catch (error) {
            console.error('Error fetching request details:', error);
            setErrorMessage('An error occurred while fetching request details.');
        }
    };

    useEffect(() => {
        fetchRequestDetail();
    }, [requestId]);

    if (errorMessage) {
        return (
            <Container>
                <Typography color="error">{errorMessage}</Typography>
            </Container>
        );
    }

    if (!request) {
        return (
            <Container>
                <Typography>Loading...</Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Request Details
            </Typography>
            <Box mt={2}>
                <Typography><strong>Category:</strong> {request.category}</Typography>
                <Typography><strong>Brand:</strong> {request.brand}</Typography>
                <Typography><strong>Model:</strong> {request.model}</Typography>
                <Typography><strong>Year:</strong> {request.year}</Typography>
                <Typography><strong>Part Name:</strong> {request.part_name}</Typography>
                <Typography><strong>Max Price:</strong> {request.max_price} руб.</Typography>
                <Typography><strong>Distance:</strong> {request.distance} км</Typography>
            </Box>
        </Container>
    );
};

export default RequestDetail;
