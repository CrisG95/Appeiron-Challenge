const Task = require('../models/Task');

const create = data => Task.create(data);

module.exports = { create };
