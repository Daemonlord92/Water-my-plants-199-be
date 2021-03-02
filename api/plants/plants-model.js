const db = require("../../data/dbConfig");

module.exports = {
	find,
	findByUserId,
	findById,
	addPlant,
	updatePlant,
	deletePlant
}

async function find() {
	return await db("plants as p")
		.select("p.id", "p.nickname", "p.h20Frequency", "p.speciesName", "p.image");
};

async function findByUserId(id) {
	return await db('plants as p')
	.join('users as u', 'u.id', 'p.userId')
	.select("p.id", "p.nickname", "p.h20Frequency", "p.speciesName", "p.image")
	.where('p.userId', id);
}

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