const db = require('../../data/dbConfig');
const server = require('../server');
const supertest = require('supertest');
const User = require('./users-model');

const validUser = { username: 'testuser', password: 'test', phone_number: 9072728359};

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

		test("/login, if the Correct user info is put in it log in", async () => {
			let createUser = await supertest(server)
			.post("/api/auth/register")
			.send(validUser);
			const loginUser = await supertest(server)
			.post("/api/auth/login")
			.send(validUser);
			expect(loginUser).toBe(200);
		});

		test("/login, if there no registered info, return error", async () => {
			const res = await supertest(server)
         .post("/api/auth/login")
         .send({
             username: "testuser",
             password: "fakepassword"
         });
        expect(res.statusCode).toBe(401);
		});
	});

	describe("/editUser()", () => {

		test("/edit-user, it will updated the phone number", async () => {
			let createUser = await supertest(server)
			.post("/api/auth/register")
			.send(validUser);
			let updatedUser = await supertest(server)
			.put(`/api/auth/edit-user/${createUser.id}`)
			.send({
				phone_number: 9712293654
			});
			expect(updatedUser.statusCode).toBe(204);
		});
	});
})