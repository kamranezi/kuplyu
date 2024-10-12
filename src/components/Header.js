import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Header = () => {
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
            </Toolbar>
        </AppBar>
    );
};

export default Header;
