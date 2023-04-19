require('dotenv').config({ path: '.env.test' });

module.exports = {
	testEnvironment: 'node',
	testMatch: ['**/*.test.js'],
	coverageDirectory: 'coverage',
	collectCoverageFrom: ['**/*.js']
};
