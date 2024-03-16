import React, { useState, useEffect } from 'react';

function DogPage() {
    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        // Fetch dog data from the backend
        // Example:
        fetch('/api/animals?type=dog')
            .then(response => response.json())
            .then(data => setDogs(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Dogs</h1>
            {/* Render dog data */}
            {dogs.map(dog => (
                <div key={dog.id}>
                    {/* Render dog information */}
                </div>
            ))}
        </div>
    );
}

export default DogPage;
