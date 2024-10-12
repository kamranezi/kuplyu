import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
} from '@mui/material';

const CreateRequest = () => {
    const [formData, setFormData] = useState({
        category: '',
        brand: '',
        model: '',
        year: '',
        part_name: '',
        max_price: '',
        distance: '',
    });
    const [errorMessage] = useState('');
    const navigate = useNavigate();

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
            const user_id = localStorage.getItem('user_id'); // Получаем user_id из localStorage

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
                navigate('/requests'); // Перенаправляем на страницу с заявками
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
        <Container>
            <Typography variant="h4" gutterBottom>
                Создать заявку
            </Typography>
            {errorMessage && <Typography color="error">{errorMessage}</Typography>}
            <form onSubmit={handleSubmit}>
                <Box mt={2}>
                    <TextField
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Box>
                <Box mt={2}>
                    <TextField
                        label="Brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Box>
                <Box mt={2}>
                    <TextField
                        label="Model"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Box>
                <Box mt={2}>
                    <TextField
                        label="Year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        fullWidth
                        type="number"
                        required
                    />
                </Box>
                <Box mt={2}>
                    <TextField
                        label="Part Name"
                        name="part_name"
                        value={formData.part_name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Box>
                <Box mt={2}>
                    <TextField
                        label="Max Price"
                        name="max_price"
                        value={formData.max_price}
                        onChange={handleChange}
                        fullWidth
                        type="number"
                        required
                    />
                </Box>
                <Box mt={2}>
                    <TextField
                        label="Distance"
                        name="distance"
                        value={formData.distance}
                        onChange={handleChange}
                        fullWidth
                        type="number"
                        required
                    />
                </Box>
                <Box mt={2}>
                    <Button type="submit" variant="contained" color="primary">
                        Submit Request
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default CreateRequest;
