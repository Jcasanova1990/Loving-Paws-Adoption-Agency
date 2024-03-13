import { useState, useEffect } from 'react';
import Animals from '../../components/Animals/Animals';

export default function HomePage(props) {
    const [animals, setAnimals] = useState([]);
    const [showCreate, setShowCreate] = useState(false);

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const data = await props.getAllAnimals();
                setAnimals(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAnimals();
    }, []);

    useEffect(() => {
        if (localStorage.token && !props.token) {
            props.setToken(localStorage.getItem('token'));
            setShowCreate(true);
        }
        if (localStorage.token && localStorage.user && !props.user) {
            props.setUser(JSON.parse(localStorage.getItem('user')));
        }
    }, []);

    return (
        <div>
            <h1>Welcome to Sunny Farms Shelter</h1>
            {animals.length ? (
                <Animals animals={animals} />
            ) : (
                "Sorry, our zookeepers are still busy."
            )}
        </div>
    );
}
