// eslint-disable-next-line import/no-extraneous-dependencies
const { StatusCodes } = require('http-status-codes');

const taskService = require('../../services/taskService');

const createTask = async (req, res) => {

	const createdTask = await taskService.create(req.body);

	return res.status(StatusCodes.OK).json(createdTask);
};

module.exports = createTask;
