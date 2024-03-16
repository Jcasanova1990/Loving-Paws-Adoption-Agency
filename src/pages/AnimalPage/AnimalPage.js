import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AnimalPage.module.scss';

function AnimalPage() {
    const navigate = useNavigate();

    const handleCatClick = () => {
        navigate('/cat');
    };

    const handleDogClick = () => {
        navigate('/dog');
    };

    return (
        <div className={styles['animal-page']}>
            <h1>Choose Type of Animal</h1>
            <div className={styles['animal-buttons']}>
                <button onClick={handleCatClick} className={styles['animal-button']}>
                    <img src="/img/catp.png" alt="Cat" />
                    <span>Cat</span>
                </button>
                <button onClick={handleDogClick} className={styles['animal-button']}>
                    <img src="/img/dogp.png" alt="Dog" />
                    <span>Dog</span>
                </button>
            </div>
        </div>
    );
}

export default AnimalPage;
