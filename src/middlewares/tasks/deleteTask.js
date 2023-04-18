// eslint-disable-next-line import/no-extraneous-dependencies
const { StatusCodes } = require('http-status-codes');

const taskService = require('../../services/taskService');

const deleteTask = async (req, res) => {

	const deletedTask = await taskService.remove(req.task._id);

	return res.status(StatusCodes.OK).json(deletedTask);
};

module.exports = deleteTask;
