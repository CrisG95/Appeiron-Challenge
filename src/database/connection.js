const mongoose = require('mongoose');
const { isTrue } = require('../utils/typeUtil');

let cachedDB = null;

const connectToDatabase = async () => {
	try {
		const {
			MONGO_CONNECTION_TYPE,
			MONGO_USERNAME,
			MONGO_PASSWORD,
			MONGO_HOST,
			MONGO_PORT,
			MONGO_DATABASE,
			MONGO_SSL
		} = process.env;

		if(cachedDB) {
			const hasAConnection = mongoose.connections.find(
				connection => connection.readyState === 1
			);
			if(hasAConnection) {
				// eslint-disable-next-line
				console.log('Reusing connection');
				return;
			}
		}

		const mongoOptions = {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: 15000,
			ssl: isTrue(MONGO_SSL),
			authSource: 'admin',
			keepAlive: true,
			socketTimeoutMS: 2000000,
			family: 4
		};

		const URI = `${MONGO_CONNECTION_TYPE}://${
			MONGO_USERNAME && `${MONGO_USERNAME}:${MONGO_PASSWORD}@`
		}${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}?retryWrites=true&w=majority`;

		const mongooseInstance = await mongoose.connect(
			URI,
			mongoOptions,
			error => {
				if(error) {
				// eslint-disable-next-line
					console.log(error.toString());
					cachedDB = null;
				}
			}
		);
		// eslint-disable-next-line
		console.log('Connected to database');

		cachedDB = mongooseInstance;

	} catch(error) {
		// eslint-disable-next-line
		console.log(error);
	}
};

module.exports = { connectToDatabase };
