import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Удаляем токен и user_id из localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');

        // Перенаправляем пользователя на страницу входа
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    My App
                </Typography>
                <Link to="/requests" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <Button color="inherit">Requests</Button>
                </Link>
                <Link to="/my-requests" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <Button color="inherit">My Requests</Button>
                </Link>
                <Link to="/create-request" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <Button color="inherit">Create Request</Button>
                </Link>
                <Link to="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                </Link>
                <IconButton color="inherit" onClick={handleLogout}>
                    <ExitToAppIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
