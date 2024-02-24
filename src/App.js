import { useState, useEffect } from 'react'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'
import ShowPage from './pages/ShowPage/ShowPage'
import { Route, Routes } from 'react-router-dom'
import styles from './App.module.scss'

export default function App() {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState('')
    const [animals, setAnimals] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [sex, setSex] = useState('');
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [image, setImage] = useState('');
    const [reservedForAdoption, setReservedForAdoption] = useState(false);
    const [userId, setUserId] = useState('');

    const signUp = async (credentials) => {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })
            const data = await response.json()
            setUser(data.user)
            setToken(data.token)
            localStorage.setItem('token')
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchAnimals();
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const fetchAnimals = async () => {
        try {
            const response = await axios.get('/api/animals');
            setAnimals(response.data);
        } catch (error) {
            console.error('Error fetching animals:', error);
        }
    };

    const handleCreateAnimal = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/animals', {
                name, age, sex, species, breed, image, reservedForAdoption, user: userId
            });
            fetchAnimals();
            setName('');
            setAge(0);
            setSex('');
            setSpecies('');
            setBreed('');
            setImage('');
            setReservedForAdoption(false);
            setUserId('');
        } catch (error) {
            console.error('Error creating animal:', error);
        }
    };

    const handleDeleteAnimal = async (id) => {
        try {
            await axios.delete(`/api/animals/${id}`);
            fetchAnimals();
        } catch (error) {
            console.error('Error deleting animal:', error);
        }
    };




    return (
        <div className={styles.App}>
            <Routes>
            <Route path="/" element={<HomePage user={user} token={token} setToken={setToken} />}></Route>
                <Route path="/register" element={<AuthPage setUser={setUser} setToken={setToken} signUp={signUp} />} />
                <Route path="/animal" 
                    animals={animals}
                    name={name}
                    age={age}
                    sex={sex}
                    species={species}
                    breed={breed}
                    image={image}
                    reservedForAdoption={reservedForAdoption}
                    setName={setName}
                    setAge={setAge}
                    setSex={setSex}
                    setSpecies={setSpecies}
                    setBreed={setBreed}
                    setImage={setImage}
                    setReservedForAdoption={setReservedForAdoption}
                    handleCreateAnimal={handleCreateAnimal}
                    handleDeleteAnimal={handleDeleteAnimal}
                    element={<ShowPage user={user} token={token} />} />
            </Routes>
        </div>
    );
}