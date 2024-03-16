import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import Nav from './components/Nav/Nav';
import AuthPage from './pages/AuthPage/AuthPage';
import HomePage from './pages/HomePage/HomePage';
import AnimalPage from './pages/AnimalPage/AnimalPage';
import PlacementPage from './pages/PlacementPage/PlacementPage';
import ContactUsPage from './pages/ContactUsPage/ContactUsPage';
import CatPage from './pages/CatPage/CatPage'; // Corrected import path for CatPage
import DogPage from './pages/DogPage/DogPage'; // Corrected import path for DogPage

function App() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');

    const signUp = async (credentials) => {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();
            setUser(data.user);
            setToken(data.token);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        } catch (error) {
            console.error(error);
        }
    };

    const login = async (credentials) => {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();
            const tokenData = data.token;
            localStorage.setItem('token', tokenData);
            setToken(tokenData);
            const userData = data.user;
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
        } catch (error) {
            console.error(error);
        }
    };

    const createAnimal = async (animalData, token) => {
        if (!token) {
            return;
        }
        try {
            const response = await fetch('/api/animals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(animalData)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    const getAllAnimals = async () => {
        try {
            const response = await fetch('/api/animals');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    const getIndividualAnimal = async (id) => {
        try {
            const response = await fetch(`/api/animals/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    const updateAnimal = async (newAnimalData, id, token) => {
        if (!token) {
            return;
        }
        try {
            const response = await fetch(`/api/animals/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newAnimalData)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    const deleteAnimal = async (id, token) => {
        if (!token) {
            return;
        }
        try {
            const response = await fetch(`/api/animals/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.App}>
            {/* Logout button */}
            {user && (
                <button onClick={() => {
                    setUser(null);
                    setToken('');
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }}>Logout</button>
            )}

            <Nav />
            <Routes>
                <Route path="/" element={<HomePage
                    user={user}
                    token={token}
                    setToken={setToken}
                    setUser={setUser} />} />

                <Route path="/register" element={<AuthPage
                    setUser={setUser}
                    setToken={setToken}
                    signUp={signUp}
                    login={login} />} />

                <Route path="/animal" element={<AnimalPage
                    user={user} token={token}
                    setToken={setToken}
                    getAllAnimals={getAllAnimals}
                    getIndividualAnimal={getIndividualAnimal}
                    deleteAnimal={deleteAnimal}
                    updateAnimal={updateAnimal} />} />

                <Route path="/cat" element={<CatPage
                getAllAnimals={getAllAnimals}
                getIndividualAnimal={getIndividualAnimal}/>} />

                <Route path="/dog" element={<DogPage 
                getAllAnimals={getAllAnimals}
                getIndividualAnimal={getIndividualAnimal} />} />

                <Route path="/placement" element={<PlacementPage
                    user={user}
                    token={token}
                    setToken={setToken}
                    setUser={setUser}
                    createAnimal={createAnimal} />} />

                <Route path="/contact" element={<ContactUsPage />} />
            </Routes>
        </div>
    );
}

export default App;
