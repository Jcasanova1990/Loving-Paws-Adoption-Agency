import React, { useState } from 'react';
import styles from './CreateForm.module.scss'; // Adjust the path as necessary

export default function CreateForm(props) {
    const [formData, setFormData] = useState({
        name: '',
        age: 0,
        sex: '',
        species: '',
        breed: '',
        zipcode: '',
        image: null,
        adopt: false,
        surrender: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await props.createAnimal(formData, props.token);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : type === 'file' ? e.target.files[0] : value;
        setFormData({ ...formData, [name]: newValue });
    };

    return (
        <form className={styles['create-form']} onSubmit={handleSubmit}>
            {props.user && <h2>Animal Placement: {props.user.name}</h2>}
            <select name="species" value={formData.species} onChange={handleChange}>
                <option value="">Select Species</option>
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
            </select>
            <input placeholder='Name' type="text" name="name" value={formData.name} onChange={handleChange}/>
            <input placeholder='Age' type="number" name="age" value={formData.age} onChange={handleChange}/>
            <input placeholder='Sex' type="text" name="sex" value={formData.sex} onChange={handleChange}/>
            <input placeholder='Breed' type="text" name="breed" value={formData.breed} onChange={handleChange}/>
            <input placeholder='Zip-Code' type="text" name="zipcode" value={formData.zipcode} onChange={handleChange}/>
            <input type="file" name="image" accept="image/*" onChange={handleChange}/>
            {formData.image && <img src={URL.createObjectURL(formData.image)} alt="Chosen" />}
            <label>
                <input type="checkbox" name="adopt" checked={formData.adopt} onChange={handleChange} />
                Adopt
            </label>
            <label>
                <input type="checkbox" name="surrender" checked={formData.surrender} onChange={handleChange} />
                Surrender
            </label>
            <input type="submit" value="Submit"/>
        </form>
    );
}
