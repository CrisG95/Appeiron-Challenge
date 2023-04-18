require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const router = require('./router');

const server = express();

server.use(logger(process.env.LOGGER_LEVEL));

server.use(
	cors({
		exposedHeaders: ['Content-Range', 'X-Content-Range']
	})
);

server.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

// parse application/json
server.use(bodyParser.json({ limit: '50mb' }));

server.use('/api', router);

module.exports = server;
