const router = require('express').Router();
const Users = require('./users-model');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/secret.js');

router.post('/register', async (req, res, next) => {
	const data = req.body;

	const hash = bcrypt.hashSync(data.password, 12);
	data.password = hash;

	try {
		const savedData = await Users.addUser(data);
		res.status(201).json(savedData);
	} catch (err) {
		next(err);
	}
});

router.post('/login', async (req, res, next) => {
	let {
		username,
		password
	} = req.body;

	try {
		const user = await Users.findBy({
			username
		});
		if (user && bcrypt.compareSync(password, user.password)) {
			const token = createToken(user);
			res.status(200).json({
				message: `Welcome ${user.username}!`,
				token
			});
		} else {
			res.status(401).json({
				message: 'invalid credentials'
			});
		}
	} catch (err) {
		next(err)
	}
})

// router.put('/edit-user', async (req, res, next) => {
	
// })

function createToken(user) {
  const payload = {
      subject: user.id,
      username: user.username,
  }
  const options = {
      expiresIn: '60 seconds'
  }
  return jwt.sign(payload, jwtSecret, options)
}


module.exports = router;