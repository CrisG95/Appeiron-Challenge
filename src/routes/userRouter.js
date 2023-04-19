const express = require('express');
const loginUser = require('../middlewares/user/loginUser');

const {
	validateString
} = require('../middlewares/common/validations');
const checkError = require('../middlewares/common/checkError');

const userRouter = express.Router();

userRouter.post('/',
	validateString('email', true),
	validateString('password', true),
	checkError,
	loginUser
);

module.exports = userRouter;
