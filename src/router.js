const express = require('express');
const tasksRouter = require('./routes/taskRouter');

const router = express.Router();

router.use('/tasks', tasksRouter);

module.exports = router;
