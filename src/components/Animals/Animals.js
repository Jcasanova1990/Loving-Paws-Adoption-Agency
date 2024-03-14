import React, { useEffect, useState } from 'react';

const Animals = ({ getAllAnimals }) => {
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const data = await getAllAnimals();
                setAnimals(data);
            } catch (error) {
                console.error('Error fetching animals:', error);
            }
        };
        fetchAnimals();
    }, [getAllAnimals]);

    return (
        <div>
            <h2>All Animals</h2>
            <ul>
                {animals.map(animal => (
                    <li key={animal._id}>
                        <div>{animal.name}</div>
                        <div>{animal.age}</div>
                        <div>{animal.sex}</div>
                        {/* Add other attributes as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Animals;
