const db = require("../../data/dbConfig");

module.exports = {
	addUser,
	find,
	findById,
	findBy
};

async function addUser(user) {
	return await db("users").insert(user);
};

async function editUser(id, changes) {
	return await db("users").where({ id }).update(changes, '*');
};

async function find() {
	return await db("users");
};

async function findBy(filter) {
	return await db("users").where(filter).first();
};

async function findById(id) {
	return await db("users").where({ id }).first();
};