const db = require('../../data/dbConfig');
const server = require('../server');
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

describe('User Model', () => {

	describe('addUser()', () =>{

		test("/registar, if everything checkout it returns a success message", async () => {
			let res = await supertest(server)
			.post("/api/auth/register.")
			.send(validUser);
			expect(res.statusCode).toBe(201);
		});

		test("/register, if the username already exsits it returns an error", async () => {
			let res = await supertest(server)
			.post("/api/auth/register")
			.send(validUser);
			let res1 = await supertest(server)
			.post("/api/auth/register")
			.send(validUser);
			expect(res1.statusCode).toBe(409);
		});
	});

	describe('loginUser()', () => {
		
	})
})