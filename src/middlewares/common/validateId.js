const { check } = require('express-validator');
const errorCodes = require('../../constants/errorCodes');
const { getById } = require('../../services/taskService');

const { INVALID_ENTITY_ID, TASK_NOT_EXISTS } = errorCodes;

const validateId = check('id', INVALID_ENTITY_ID).exists().isMongoId().bail()
	.custom(async (id, { req }) => {
		const task = await getById(id);

		if(!task)
			return Promise.reject(new Error(TASK_NOT_EXISTS));

		req.task = task;
		return Promise.resolve();
	});

module.exports = validateId;
