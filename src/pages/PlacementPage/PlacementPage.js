import React from 'react';
import CreateForm from '../../components/CreateForm/CreateForm'; // Assuming CreateForm component is correctly implemented

const PlacementPage = ({ user, token, createAnimal }) => {
    const handleCreateAnimal = async (animalData) => {
        try {
            const response = await createAnimal(animalData, token);
            // Handle the response as needed
            console.log('Animal created:', response);
        } catch (error) {
            console.error('Error creating animal:', error);
        }
    };

    return (
        <div>
            <h2>Placement Page</h2>
            <p>Welcome, {user && user.name}!</p>
            <CreateForm createAnimal={handleCreateAnimal} token={token} user={user} />
        </div>
    );
};

export default PlacementPage;
