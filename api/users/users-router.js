const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const restrict = require('../middleware/restricted');
const Users = require('./users-model');
const {jwtSecret} = require('../config/secret.js');

router.get('/', restrict, async (req, res, next) => {

	try {
		const userData = await Users.find();
		res.status(200).json(userData);
	} catch (err) {
		next(err);
	}
})

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

router.put('/edit-user/:id', restrict, async (req, res, next) => {
	const { id } = req.params;
	const changes = req.body;

	try {
		const changedUserInfo = await Users.editUser(id, changes);
		if (changedUserInfo) {
			res.status(204).json(changedUserInfo);
		} else {
			res.status(404).json({
				mes: 'invalid id'
			});
		} 
	}	catch (err) {
			next(err);
	};
});

function createToken(user) {
  const payload = {
      subject: user.id,
      username: user.username,
  }

  const secret = jwtSecret;

  const options = {
      expiresIn: '2h'
  }
  return jwt.sign(payload, secret, options)
}


module.exports = router;