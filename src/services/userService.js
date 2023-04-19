const User = require('../models/User');

const createUser = data => User.create(data);
const getUserByEmail = email => User.findOne(email);

module.exports = {
	getUserByEmail, createUser
};
