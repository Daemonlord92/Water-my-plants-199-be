const db = require('../data/dbConfig');
const server = require('./server');
const supertest = require('supertest');
const User = require('./users-model');

const validUser = { username: 'testuser', password: 'test'};

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

