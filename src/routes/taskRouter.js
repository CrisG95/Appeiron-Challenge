const express = require('express');
const createTask = require('../middlewares/tasks/createTask');
const updateTask = require('../middlewares/tasks/updateTask');
const getByIdTask = require('../middlewares/tasks/getByIdTask');
const deleteTask = require('../middlewares/tasks/deleteTask');
const getTasks = require('../middlewares/tasks/getTasks');

const {
	validateString, validateBoolean, validateId, validateSort, validateNumber
} = require('../middlewares/common/validations');
const {
	NAME_FIELD, DESCRIPTION_FIELD, COMPLETED_FIELD, LIMIT_FIELD, PAGE_FIELD
} = require('../constants/task');
const checkError = require('../middlewares/common/checkError');

const taskRouter = express.Router();

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

taskRouter.get('/:id',
	validateId,
	checkError,
	getByIdTask
);

taskRouter.delete('/:id',
	validateId,
	checkError,
	deleteTask
);

taskRouter.get('/',
	validateBoolean('status', false),
	validateSort(NAME_FIELD, false),
	validateSort(DESCRIPTION_FIELD, false),
	validateSort(COMPLETED_FIELD, false),
	validateNumber(LIMIT_FIELD, false),
	validateNumber(PAGE_FIELD, false),
	checkError,
	getTasks
);

module.exports = taskRouter;
