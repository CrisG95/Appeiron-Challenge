/* eslint-disable import/no-extraneous-dependencies */
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { USER_NOT_AUTHORIZED, INVALID_TOKEN, NO_TOKEN_PROVIDED } = require('../../constants/errorCodes');

const userService = require('../../services/userService');

const decode = data => {
	try {
		const decoded = jwt.verify(data, process.env.KEY_PRELOGIN);
		return decoded;
	} catch(err) {
		return null;
	}
};

const isAuthorized = async (req, res, next) => {

	if(!req.headers.authorization)
		return res.status(StatusCodes.UNAUTHORIZED).json({ error: NO_TOKEN_PROVIDED });

	const token = req.headers.authorization.replace('Bearer ', '');

	const tokenDecoded = decode(token);

	if(!tokenDecoded)
		return res.status(StatusCodes.UNAUTHORIZED).json({ error: INVALID_TOKEN });

	const user = await userService.getUserByEmail({ email: tokenDecoded.email });

	if(!user || user.role !== 'admin')
		return res.status(StatusCodes.UNAUTHORIZED).json({ error: USER_NOT_AUTHORIZED });

	next();
};

module.exports = isAuthorized;
