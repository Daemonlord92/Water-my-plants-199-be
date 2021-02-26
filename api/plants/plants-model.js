const db = require("../../data/dbConfig");

module.exports = {
	find,
	findById,
	addPlant,
	updatePlant,
	deletePlant
}

async function find() {
	return await db("plants as p")
		.select("p.id", "p.nickname", "p.h20Frequency", "p.species_name", "p.image");
};

async function findById(id) {
	return await db("plants as p")
		.select("p.id", "p.nickname", "p.h20Frequency", "p.species_name", "p.image")
		.where("p.id", id)
		.first();
};

async function addPlant(plantData) {
	const [id] = await db("plants").insert(plantData).returning('id');
	return findById(id);
}

async function updatePlant(changes, id) {
	return await db("plants")
		.where('id', id)
		.update(changes)
		.then(ids => {
			return await db("plants").where("id", id);
		});
};

async function deletePlant(id) {
	return db("plants")
		.where("id", id)
		.del();
};