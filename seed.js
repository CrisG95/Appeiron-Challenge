const User = require('./src/models/User');

const seedUser = [
	{
		name: 'User test',
		email: 'test@example.com',
		password: 'Asdf1234',
		role: 'user'
	},
	{
		name: 'User admin',
		email: 'admin@example.com',
		password: 'Asdf1234',
		role: 'admin'
	}

];

const seedDB = async () => {
	await User.deleteMany({});
	await User.insertMany(seedUser);
};

module.exports = seedDB;
