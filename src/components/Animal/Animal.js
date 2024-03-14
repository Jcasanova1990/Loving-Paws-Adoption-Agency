import React from 'react';

const Animal = ({ animal }) => {
    return (
        <div>
            <h2>{animal.name}</h2>
            <p>Age: {animal.age}</p>
            <p>Sex: {animal.sex}</p>
            <p>Species: {animal.species}</p>
            <p>Breed: {animal.breed}</p>
            <img src={animal.image} alt={animal.name} />
            <p>Reserved for Adoption: {animal.reservedForAdoption ? 'Yes' : 'No'}</p>
            {/* Additional details or actions can be added here */}
        </div>
    );
};

export default Animal;
