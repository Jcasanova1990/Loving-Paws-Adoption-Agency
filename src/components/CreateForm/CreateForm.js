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
        reservedForAdoption: false,
        action: '' // Add the action field
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await props.createAnimal(formData, props.token);
            // cool thing to do once there is a showpage done
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
            {props.user && <h2>Create A New Animal: {props.user.name}</h2>}
            <input placeholder='Name' type="text" name="name" value={formData.name} onChange={handleChange}/>
            <input placeholder='Age' type="number" name="age" value={formData.age} onChange={handleChange}/>
            <input placeholder='Sex' type="text" name="sex" value={formData.sex} onChange={handleChange}/>
            <input placeholder='Species' type="text" name="species" value={formData.species} onChange={handleChange}/>
            <input placeholder='Breed' type="text" name="breed" value={formData.breed} onChange={handleChange}/>
            <input placeholder='Image URL' type="text" name="image" value={formData.image} onChange={handleChange}/>
            <label>
                <input type="checkbox" name="reservedForAdoption" checked={formData.reservedForAdoption} onChange={handleChange}/>
                Reserved for Adoption
            </label>
            <select name="action" value={formData.action} onChange={handleChange}>
                <option value="">Select Action</option>
                <option value="surrender">Surrender</option>
                <option value="adopt">Adopt</option>
            </select>
            <input type="submit" value="Create Animal"/>
        </form>
    );
}
