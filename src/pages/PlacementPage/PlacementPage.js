import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import CreateForm from '../../components/CreateForm/CreateForm'; // Assuming CreateForm component is correctly implemented

const PlacementPage = ({ user, token, createAnimal }) => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleCreateAnimal = async (animalData) => {
        try {
            const response = await createAnimal(animalData, token);
            // Handle the response as needed
            console.log('Animal created:', response);

            // Redirect to home page after form submission using navigate
            navigate('/'); // Replace '/' with the path of your home page
        } catch (error) {
            console.error('Error creating animal:', error);
        }
    };

    return (
        <div>
            <h2>Surrender Form</h2>
            <p>Welcome, {user && user.name}!</p>
            <p>*In order to Surrender an Animal You Must Be SignedUp!</p>
            <p>*One of our representitives will reachout to you for your surrender and provide a shelter located near you to drop off animal!</p>
            <p>*To adopt goto contact us page and email or call us with the animal you want to adopt!</p>
            <CreateForm createAnimal={handleCreateAnimal} token={token} user={user} />
        </div>
    );
};

export default PlacementPage;
