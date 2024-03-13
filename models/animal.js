const { Schema, model } = require('mongoose');

const animalSchema = new Schema({
    name: String,
    age: Number,
    sex: String,
    species: String,
    breed: String,
    image: String,
    reservedForAdoption: Boolean,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    action: String // Add the action field
});

module.exports = model('Animal', animalSchema);
