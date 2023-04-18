const { validationResult } = require('express-validator');
// eslint-disable-next-line import/no-extraneous-dependencies
const { StatusCodes } = require('http-status-codes');

const runValidation = (req, res, next) => {
	const errors = validationResult(req);
	if(errors.isEmpty())
		return next();
	return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
};

module.exports = runValidation;
