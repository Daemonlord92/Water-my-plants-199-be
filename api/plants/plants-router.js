const router = require('express').Router();
const Plants = require('./plants-model');

router.get('/', async (req, res, next) => {

	try {
		const plantData = await Plants.find();
		res.status(200).json(plantData);
	} catch (err) {
		next(err);
	};
});

router.post('/new-plants', async (req, res, next) => {
	const plantData = req.body;

	try {
		const newPlantData = await Plants.addPlant(plantData);
		res.status(201).json(newPlantData);
	} catch (err) {
		next(err);
	};
});

router.put('/edit-plants/:id', async (req, res, next) => {
	const { id } = req.params;
	const changes = req.body;

	try {
		const changedData = await Plants.updatePlant(id, changes);
		if (changedData) {
			res.status(204).json(changedData);
		} else {
			res.status(404).json({ mes: 'invalid id'});
		};
	} catch (err) {
		next(err)
	};
});

router.delete('/delete-plant/:id', async (req, res, next) => {
	const {id} = req.params;

	try {
		const count = await Plants.deletePlant(id);

		if (count) {
			res.status(200).json(`deleted ${count} records`);
		} else {
			res.status(404).json({ mes: 'invalid id'});
		};
	} catch (err) {
		next(err);
	};
});

module.exports = router;