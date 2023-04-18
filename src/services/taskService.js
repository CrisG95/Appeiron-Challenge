const Task = require('../models/Task');

const create = data => Task.create(data);
const getById = id => Task.findById(id);
const update = (task, data) => task.edit(data);

module.exports = { create, getById, update };
