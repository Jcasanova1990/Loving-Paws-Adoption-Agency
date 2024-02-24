const { Schema, model } = require('mongoose')

const animalSchema = new Schema({
    name: String,
    age: Number,
    sex: String,
    species: String,
    breed: String,
    image: String,
    reservedForAdoption: Boolean,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = model('Animal', animalSchema)

// one to many relationship