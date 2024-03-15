import React, { useState } from 'react';
import styles from './CreateForm.module.scss'; // Adjust the path as necessary

export default function CreateForm(props) {
    const [formData, setFormData] = useState({
        name: '',
        age: 0,
        sex: '',
        species: '',
        breed: '',
        image: '',
        action: '' // Add the action field
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await props.createAnimal(formData, props.token);
            // Cool thing to do once there is a showpage done
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    return (
        <form className={styles['create-form']} onSubmit={handleSubmit}>
            {props.user && <h2>Add Animal To The Adoption Pool: {props.user.name}</h2>}
            <input placeholder='Name' type="text" name="name" value={formData.name} onChange={handleChange}/>
            <select name="species" value={formData.species} onChange={handleChange}>
                <option value="">Select Species</option>
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
            </select>
            <input placeholder='Age' type="number" name="age" value={formData.age} onChange={handleChange}/>
            <input placeholder='Sex' type="text" name="sex" value={formData.sex} onChange={handleChange}/>
            <input placeholder='Breed' type="text" name="breed" value={formData.breed} onChange={handleChange}/>
            <input placeholder='Image URL' type="text" name="image" value={formData.image} onChange={handleChange}/>
            <input type="submit" value="Submit"/>
        </form>
    );
}
