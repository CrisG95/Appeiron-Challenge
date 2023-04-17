require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const router = require('./router');

const server = express();

server.use(logger(process.env.LOGGER_LEVEL));

server.use(
	cors({
		exposedHeaders: ['Content-Range', 'X-Content-Range']
	})
);

server.use(express.urlencoded({ limit: '50mb', extended: false })
);

server.use('/api', router);

module.exports = server;
