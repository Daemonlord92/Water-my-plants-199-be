const db = require('../../data/dbConfig');
const server = require('../server');
const supertest = require('supertest');
const Plant = require('./plant-model');

const validPlant = {
	nickname: 'Bob',
	h20Frequency: 3,
	speciesName: "Cannabis",
	image: 'null'
};

beforeAll(async () => {
	await db.migrate.rollback();
	await db.migrate.latest();
});

beforeEach(async () => {
	await db('users').truncate();
});

afterAll(async () => {
	await db.destory();
});

