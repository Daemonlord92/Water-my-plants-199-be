const server = require('./server');
const supertest = require('supertest');

describe('Server', () => {

	test('if server is working', async () => {
		let res = await supertest(server)
		.get("/");
		expect(res.statusCode).toBe(200);
	});
});