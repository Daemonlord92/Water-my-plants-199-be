const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const restrict = require('./middleware/restricted');

const authRouter = require('./users/users-router');
const plantsRouter = require('./plants/plants-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/plants', restrict, plantsRouter);

server.get('/', (req, res) => {
	res.status(200).json({
		mes:"Hello, the server is running"
	});
});

server.use((err, req, res, next) => {
	err.statusCode = err.statusCode ? err.statusCode : 500;
	res.status(err.statusCode).json({
		mes: err.message,
		stack: err.stack
	});
});

module.exports = server;
