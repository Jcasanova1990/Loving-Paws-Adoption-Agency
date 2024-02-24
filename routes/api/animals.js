const express = require('express')
const router = express.Router()
const animalCtrl = require('../../controllers/api/animals')
const userController = require('../../controllers/api/users')

// Index
router.get('/', animalCtrl.index, animalCtrl.jsonAnimals)
// Create
router.post('/', userController.auth, animalCtrl.create, animalCtrl.jsonAnimal)
// Show
router.get('/:id', animalCtrl.show, animalCtrl.jsonAnimal)
// Update
router.put('/:id', userController.auth, animalCtrl.update, animalCtrl.jsonAnimal)
// Delete
router.delete('/:id', userController.auth, animalCtrl.destroy, animalCtrl.jsonAnimal)

module.exports = router