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
		.select("p.id", "p.nickname", "p.h20Frequency", "p.speciesName", "p.image");
};

async function findById(id) {
	return await db("plants as p")
		.select("p.id", "p.nickname", "p.h20Frequency", "p.speciesName", "p.image")
		.where("p.id", id)
		.first();
};

async function addPlant(plantData) {
	return await db("plants").insert(plantData);
}

async function updatePlant(id, changes) {
	return await db("plants")
		.where('id', id)
		.update(changes, '*');
};

async function deletePlant(id) {
	return db("plants")
		.where("id", id)
		.del();
};