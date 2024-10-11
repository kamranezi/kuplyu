// src/components/Offers.js
import React from 'react';
import { Link } from 'react-router-dom';

const Offers = () => {
    return (
        <div>
            <h1>Объявления</h1>
            <div>
                <input type="text" placeholder="Поиск объявлений..." />
                <button>Поиск</button>
            </div>
            <div>
                <Link to="/create-offer">
                    <button>Создать объявление</button>
                </Link>
                <Link to="/my-offers">
                    <button>Мои объявления</button>
                </Link>
            </div>
            {/* Список объявлений */}
        </div>
    );
};

export default Offers;
