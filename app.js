const app = require('./src/server');
const connection = require('./src/database/connection');

const { connectToDatabase } = connection;
const { PORT } = process.env;

(async () => {
	await connectToDatabase();

	app.listen(PORT || 3000, async () => {
		// eslint-disable-next-line
		console.log(`App listening on port ${process.env.PORT}!`);
	});
})();

module.exports = app;
