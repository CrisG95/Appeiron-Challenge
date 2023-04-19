const express = require('express');
const tasksRouter = require('./routes/taskRouter');
const userRouter = require('./routes/userRouter');

const router = express.Router();

router.use('/tasks', tasksRouter);
router.use('/user', userRouter);

module.exports = router;
