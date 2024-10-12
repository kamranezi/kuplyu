import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        await handleAuth('http://localhost:8080/register', 'Registration successful!', 'Registration failed.');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        await handleAuth('http://localhost:8080/login', null, 'Login failed.');
    };

    const handleAuth = async (url, successMessageText, errorMessageText) => {
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (successMessageText) {
                    setSuccessMessage(successMessageText);
                    setEmail('');
                    setPassword('');
                } else {
                    // Сохраняем токен в localStorage
                    localStorage.setItem('token', data.token);
                    // Извлекаем user_id из токена
                    const payload = JSON.parse(atob(data.token.split('.')[1]));
                    const user_id = payload.user_id;
                    localStorage.setItem('user_id', user_id);
                }

                // Перенаправляем на главную страницу после успешной регистрации или логина
                navigate('/');
            } else {
                setErrorMessage(data.message || errorMessageText);
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    const renderForm = (onSubmit, buttonText) => (
        <form onSubmit={onSubmit}>
            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                {buttonText}
            </Button>
        </form>
    );

    return (
        <Container maxWidth="sm">
            <Box mt={8} mb={4}>
                <Paper elevation={6} style={{ padding: 20 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Welcome to My App
                    </Typography>
                    {errorMessage && <Typography variant="body1" color="error" align="center">{errorMessage}</Typography>}
                    {successMessage && <Typography variant="body1" color="success" align="center">{successMessage}</Typography>}
                    <Box>
                        {renderForm(handleLogin, 'Login')}
                    </Box>
                    <Box mt={2}>
                        <Button variant="contained" color="secondary" fullWidth onClick={() => setShowRegisterForm(!showRegisterForm)}>
                            {showRegisterForm ? 'Hide Register Form' : 'Register'}
                        </Button>
                    </Box>
                    {showRegisterForm && (
                        <Box mt={2}>
                            {renderForm(handleRegister, 'Register')}
                        </Box>
                    )}
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;
