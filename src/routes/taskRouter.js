const express = require('express');
const createTask = require('../middlewares/tasks/createTask');
const updateTask = require('../middlewares/tasks/updateTask');
const { validateString, validateBoolean, validateId } = require('../middlewares/common/validations');
const { NAME_FIELD, DESCRIPTION_FIELD, COMPLETED_FIELD } = require('../constants/task');
const checkError = require('../middlewares/common/checkError');

const taskRouter = express.Router();

taskRouter.get('/', (req, res) => { res.json('Todo ok'); });

taskRouter.post('/',
	validateString(NAME_FIELD, true),
	validateString(DESCRIPTION_FIELD, false),
	validateBoolean(COMPLETED_FIELD, false),
	checkError,
	createTask
);

taskRouter.put('/:id',
	validateString(NAME_FIELD, false),
	validateString(DESCRIPTION_FIELD, false),
	validateBoolean(COMPLETED_FIELD, false),
	validateId,
	checkError,
	updateTask
);

module.exports = taskRouter;
