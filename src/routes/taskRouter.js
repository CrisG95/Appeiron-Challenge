const express = require('express');
const createTask = require('../middlewares/tasks/createTask');
const updateTask = require('../middlewares/tasks/updateTask');
const getByIdTask = require('../middlewares/tasks/getByIdTask');
const deleteTask = require('../middlewares/tasks/deleteTask');
const getTasks = require('../middlewares/tasks/getTasks');
const isAuthorized = require('../middlewares/user/isAuthorized');

const {
	validateString, validateBoolean, validateId, validateSort, validateNumber
} = require('../middlewares/common/validations');
const {
	NAME_FIELD, DESCRIPTION_FIELD, COMPLETED_FIELD, LIMIT_FIELD, PAGE_FIELD
} = require('../constants/task');
const checkError = require('../middlewares/common/checkError');

const taskRouter = express.Router();

taskRouter.post('/',
	isAuthorized,
	validateString(NAME_FIELD, true),
	validateString(DESCRIPTION_FIELD, false),
	validateBoolean(COMPLETED_FIELD, false),
	checkError,
	createTask
);

taskRouter.put('/:id',
	isAuthorized,
	validateString(NAME_FIELD, false),
	validateString(DESCRIPTION_FIELD, false),
	validateBoolean(COMPLETED_FIELD, false),
	validateId,
	checkError,
	updateTask
);

taskRouter.get('/:id',
	isAuthorized,
	validateId,
	checkError,
	getByIdTask
);

taskRouter.delete('/:id',
	isAuthorized,
	validateId,
	checkError,
	deleteTask
);

taskRouter.get('/',
	isAuthorized,
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
