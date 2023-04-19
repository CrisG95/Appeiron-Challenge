// eslint-disable-next-line import/no-extraneous-dependencies
const { StatusCodes } = require('http-status-codes');

const taskService = require('../../services/taskService');

const getTasks = async (req, res) => {

	const {
		status, name, description, completed, limit, page
	} = req.query;

	const query = {
		...status && { filter: { completed: status } },
		...description && { sort: { description } },
		...completed && { sort: { completed } },
		...name && { sort: { name } },
		...limit && { limit: Number(limit) },
		...page && { page: Number((page - 1) * limit) }
	};

	const tasks = await taskService.get(query);

	return res.status(StatusCodes.OK).json(tasks);
};

module.exports = getTasks;
