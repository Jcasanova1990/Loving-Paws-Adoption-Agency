const Animal = require('../../models/animal');

module.exports = {
    create,
    index,
    show,
    update,
    destroy,
    jsonAnimals,
    jsonAnimal
};

// View Controllers

function jsonAnimal(req, res) {
    res.json(res.locals.data.animal);
}

function jsonAnimals(req, res) {
    res.json(res.locals.data.animals);
}

// CRUD Operations

async function create(req, res, next) {
    try {
        req.body.user = req.user._id;
        const animal = await Animal.create(req.body);
        req.user.animals.addToSet(animal);
        await req.user.save();
        res.locals.data.animal = animal;
        next();
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

async function index(_, res, next) {
    try {
        const animals = await Animal.find({});
        res.locals.data.animals = animals;
        next();
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

async function show(req, res, next) {
    try {
        const animal = await Animal.findById(req.params.id);
        res.locals.data.animal = animal;
        next();
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

async function update(req, res, next) {
    try {
        const animal = await Animal.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true }
        );
        res.locals.data.animal = animal;
        next();
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

async function destroy(req, res, next) {
    try {
        const animal = await Animal.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });
        req.user.animals.pull(animal);
        await req.user.save();
        res.locals.data.animal = animal;
        next();
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
