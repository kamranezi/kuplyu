// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Requests from './components/Requests';
import Home from './components/Home';
import CreateRequest from './components/CreateRequest';
import CreateOffer from './components/CreateOffer';
import Profile from './components/Profile';
import Offers from './components/Offers';
import MyOffers from './components/MyOffers';
import MyRequests from './components/MyRequests';
import MyDeals from './components/MyDeals';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/create-request" element={<CreateRequest />} />
                <Route path="/create-offer" element={<CreateOffer />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/my-offers" element={<MyOffers />} />
                <Route path="/my-requests" element={<MyRequests />} />
                <Route path="/my-deals" element={<MyDeals />} />
            </Routes>
        </Router>
    );
};

export default App;
