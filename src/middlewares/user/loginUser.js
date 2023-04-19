/* eslint-disable import/no-extraneous-dependencies */
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { INVALID_CREDENTIALS } = require('../../constants/errorCodes');

const userService = require('../../services/userService');

const loginUser = async (req, res) => {

	const user = await userService.getUserByEmail({ email: req.body.email });

	if(!user)
		return res.status(StatusCodes.UNAUTHORIZED).json({ error: INVALID_CREDENTIALS });

	if(req.body.password !== user.password)
		return res.status(StatusCodes.UNAUTHORIZED).json({ error: INVALID_CREDENTIALS });

	const token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.KEY_PRELOGIN);

	return res.status(StatusCodes.OK).json({ token });
};

module.exports = loginUser;
