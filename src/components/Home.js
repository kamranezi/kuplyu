// src/components/Home.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Удаляем токен и user_id из localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');

        // Перенаправляем пользователя на страницу входа
        navigate('/login');
    };

    return (
        <div>
            <h1>Главная страница</h1>
            <div>
                <input type="text" placeholder="Поиск..." />
                <button>Поиск</button>
            </div>
            <div>
                <Link to="/create-request">
                    <button>Создать заявку</button>
                </Link>
                <Link to="/create-offer">
                    <button>Создать объявление</button>
                </Link>
                <Link to="/my-deals">
                    <button>Мои сделки</button>
                </Link>
                <Link to="/requests">
                    <button>Заявки</button>
                </Link>
                <Link to="/my-requests">
                    <button>Мои заявки</button>
                </Link>
                <Link to="/my-offers">
                    <button>Мои объявления</button>
                </Link>
                <Link to="/offers">
                    <button>Объявления</button>
                </Link>
                <Link to="/profile">
                    <button>Профиль</button>
                </Link>
                <button onClick={handleLogout}>Выход</button>
            </div>
        </div>
    );
};

export default Home;
