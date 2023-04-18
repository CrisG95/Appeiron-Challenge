const { check } = require('express-validator');
const errorCodes = require('../../constants/errorCodes');

const { INVALID_DATA } = errorCodes;

const validateBoolean = (field, isRequired) => {
	let validation = check(field, INVALID_DATA(field));

	if(!isRequired)
		validation = validation.optional();

	validation = validation.isBoolean();

	return validation;
};

module.exports = validateBoolean;
