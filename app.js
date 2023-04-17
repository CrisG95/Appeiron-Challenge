const app = require('./src/server');

const { PORT } = process.env;

(async () => {
	// await connectToDatabase();

	app.listen(PORT || 3000, async () => {
		console.log(`App listening on port ${process.env.PORT}!`);
	});
})();

module.exports = app;
