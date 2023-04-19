const Task = require('../models/Task');

const create = data => Task.create(data);
const getById = id => Task.findById(id);
const update = (task, data) => task.edit(data);
const remove = id => Task.findOneAndDelete({ _id: id });
const get = ({ filter, sort, limit, page }) => Task.find(filter).sort(sort).limit(limit).skip(page);

module.exports = {
	create, getById, update, remove, get
};
