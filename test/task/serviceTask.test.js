/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const { expect, afterAll, beforeAll } = require('@jest/globals');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const app = require('../../app');
const Task = require('../../src/models/Task');
const User = require('../../src/models/User');
const { formatCreatedResponse, expectError } = require('../utils/task');
const {
	NAME_FIELD, DESCRIPTION_FIELD, COMPLETED_FIELD
} = require('../../src/constants/task');
const { create } = require('../../src/services/taskService');
const { createUser } = require('../../src/services/userService');
const errorCodes = require('../../src/constants/errorCodes');

const { INVALID_DATA } = errorCodes;

const INVALID_FIELD = 32;
const INVALID_ID = '643da19c68fa9d773f0cd2b0';

describe('TEST TASKS', () => {

	// beforeEach(async () => {
	// 	await app.close();
	// });

	describe('POST /tasks', () => {

		let user;
		let userAdmin;

		beforeAll(async () => {
			user = await createUser({ name: 'User test', email: 'test@example.com', password: 'Asdf1234', role: 'user' });
			userAdmin = await createUser({ name: 'User admin', email: 'admin@example.com', password: 'Asdf1234', role: 'admin' });
		});

		it(`Should return ${StatusCodes.OK} and create a new task`, async () => {

			const token = jwt.sign(JSON.parse(JSON.stringify(userAdmin)), process.env.KEY_PRELOGIN);

			const task = {
				[NAME_FIELD]: 'TEST'
			};

			const responseExpected = {
				...task,
				[COMPLETED_FIELD]: false
			};

			const response = await request(app)
				.post('/api/tasks')
				.set('Authorization', `Bearer ${token}`)
				.send(task);

			expect(response.status).toBe(StatusCodes.OK);
			expect(formatCreatedResponse(response.body)).toEqual(responseExpected);
		});

		it(`Should return ${StatusCodes.UNAUTHORIZED} if invalid token`, async () => {

			const token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.KEY_PRELOGIN);

			const task = {
				[NAME_FIELD]: INVALID_FIELD
			};

			const response = await request(app)
				.post('/api/tasks')
				.set('Authorization', `Bearer ${token}`)
				.send(task);

			expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
		});

		it(`Should return ${StatusCodes.UNPROCESSABLE_ENTITY} if invalid name`, async () => {

			const token = jwt.sign(JSON.parse(JSON.stringify(userAdmin)), process.env.KEY_PRELOGIN);

			const task = {
				[NAME_FIELD]: INVALID_FIELD
			};

			const response = await request(app)
				.post('/api/tasks')
				.set('Authorization', `Bearer ${token}`)
				.send(task);

			expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
			expect(response._body).toEqual(expectError(INVALID_DATA(NAME_FIELD), NAME_FIELD, INVALID_FIELD));
		});

		it(`Should return ${StatusCodes.UNPROCESSABLE_ENTITY} if name not send`, async () => {

			const token = jwt.sign(JSON.parse(JSON.stringify(userAdmin)), process.env.KEY_PRELOGIN);

			const task = {
				[DESCRIPTION_FIELD]: 'TEST DESCRIPTION'
			};

			const response = await request(app)
				.post('/api/tasks')
				.set('Authorization', `Bearer ${token}`)
				.send(task);

			expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
			expect(response._body).toEqual(expectError(INVALID_DATA(NAME_FIELD), NAME_FIELD));
		});

		it(`Should return ${StatusCodes.UNPROCESSABLE_ENTITY} if invalid description`, async () => {

			const token = jwt.sign(JSON.parse(JSON.stringify(userAdmin)), process.env.KEY_PRELOGIN);

			const task = {
				[NAME_FIELD]: 'TEST',
				[DESCRIPTION_FIELD]: INVALID_FIELD
			};

			const response = await request(app)
				.post('/api/tasks')
				.set('Authorization', `Bearer ${token}`)
				.send(task);

			expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
			expect(response._body).toEqual(expectError(INVALID_DATA(DESCRIPTION_FIELD), DESCRIPTION_FIELD, INVALID_FIELD));
		});

		it(`Should return ${StatusCodes.UNPROCESSABLE_ENTITY} if invalid completed field`, async () => {

			const token = jwt.sign(JSON.parse(JSON.stringify(userAdmin)), process.env.KEY_PRELOGIN);

			const task = {
				[NAME_FIELD]: 'TEST',
				[COMPLETED_FIELD]: INVALID_FIELD
			};

			const response = await request(app)
				.post('/api/tasks')
				.set('Authorization', `Bearer ${token}`)
				.send(task);

			expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
			expect(response._body).toEqual(expectError(INVALID_DATA(COMPLETED_FIELD), COMPLETED_FIELD, INVALID_FIELD));
		});

		afterAll(async () => {
			await Task.remove({});
			await User.remove({});
		});
	});

	describe('PUT /tasks', () => {

		let task;
		let user;
		let userAdmin;

		beforeAll(async () => {
			user = await createUser({ name: 'User test', email: 'test@example.com', password: 'Asdf1234', role: 'user' });
			userAdmin = await createUser({ name: 'User admin', email: 'admin@example.com', password: 'Asdf1234', role: 'admin' });
		});

		beforeEach(async () => {
			task = await create({ [NAME_FIELD]: 'TEST', [DESCRIPTION_FIELD]: 'TEST DESCRIPTION' });
		});

		it(`Should return ${StatusCodes.OK} and edited a task`, async () => {

			const token = jwt.sign(JSON.parse(JSON.stringify(userAdmin)), process.env.KEY_PRELOGIN);

			const data = {
				[NAME_FIELD]: 'TEST EDITED'
			};

			const responseExpected = {
				...data,
				[COMPLETED_FIELD]: false
			};

			const response = await request(app)
				.put(`/api/tasks/${task._id}`)
				.set('Authorization', `Bearer ${token}`)
				.send(data);

			expect(response.status).toBe(StatusCodes.OK);
			expect(formatCreatedResponse(response.body)).toEqual(responseExpected);
		});

		it(`Should return ${StatusCodes.UNAUTHORIZED} if invalid token`, async () => {

			const token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.KEY_PRELOGIN);

			const data = {
				[NAME_FIELD]: INVALID_FIELD
			};

			const response = await request(app)
				.put(`/api/tasks/${task._id}`)
				.set('Authorization', `Bearer ${token}`)
				.send(data);

			expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
		});

		it(`Should return ${StatusCodes.UNPROCESSABLE_ENTITY} if invalid name`, async () => {

			const token = jwt.sign(JSON.parse(JSON.stringify(userAdmin)), process.env.KEY_PRELOGIN);

			const data = {
				[NAME_FIELD]: INVALID_FIELD
			};

			const response = await request(app)
				.put(`/api/tasks/${task._id}`)
				.set('Authorization', `Bearer ${token}`)
				.send(data);

			expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
			expect(response._body).toEqual(expectError(INVALID_DATA(NAME_FIELD), NAME_FIELD, INVALID_FIELD));
		});

		it(`Should return ${StatusCodes.UNPROCESSABLE_ENTITY} if invalid description`, async () => {

			const token = jwt.sign(JSON.parse(JSON.stringify(userAdmin)), process.env.KEY_PRELOGIN);

			const data = {
				[DESCRIPTION_FIELD]: INVALID_FIELD
			};

			const response = await request(app)
				.put(`/api/tasks/${task._id}`)
				.set('Authorization', `Bearer ${token}`)
				.send(data);

			expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
			expect(response._body).toEqual(expectError(INVALID_DATA(DESCRIPTION_FIELD), DESCRIPTION_FIELD, INVALID_FIELD));
		});

		it(`Should return ${StatusCodes.UNPROCESSABLE_ENTITY} if invalid completed field`, async () => {

			const token = jwt.sign(JSON.parse(JSON.stringify(userAdmin)), process.env.KEY_PRELOGIN);

			const data = {
				[COMPLETED_FIELD]: INVALID_FIELD
			};

			const response = await request(app)
				.put(`/api/tasks/${task._id}`)
				.set('Authorization', `Bearer ${token}`)
				.send(data);

			expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
			expect(response._body).toEqual(expectError(INVALID_DATA(COMPLETED_FIELD), COMPLETED_FIELD, INVALID_FIELD));
		});

		afterAll(async () => {
			await Task.remove({});
		});

	});

	describe('DELETE /tasks', () => {

		let task;

		let user;
		let userAdmin;

		beforeAll(async () => {
			user = await createUser({ name: 'User test', email: 'test@example.com', password: 'Asdf1234', role: 'user' });
			userAdmin = await createUser({ name: 'User admin', email: 'admin@example.com', password: 'Asdf1234', role: 'admin' });
		});

		beforeEach(async () => {
			task = await create({ [NAME_FIELD]: 'TEST', [DESCRIPTION_FIELD]: 'TEST DESCRIPTION' });
		});

		it(`Should return ${StatusCodes.OK} and deleted a task`, async () => {

			const token = jwt.sign(JSON.parse(JSON.stringify(userAdmin)), process.env.KEY_PRELOGIN);

			const data = {
				[NAME_FIELD]: 'TEST'
			};

			const responseExpected = {
				...data,
				[COMPLETED_FIELD]: false
			};

			const response = await request(app)
				.delete(`/api/tasks/${task._id}`)
				.set('Authorization', `Bearer ${token}`)
				.send(data);

			expect(response.status).toBe(StatusCodes.OK);
			expect(formatCreatedResponse(response.body)).toEqual(responseExpected);
		});

		it(`Should return ${StatusCodes.UNAUTHORIZED} if invalid token`, async () => {

			const token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.KEY_PRELOGIN);

			const response = await request(app)
				.delete(`/api/tasks/${task._id}`)
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
		});

		it(`Should return ${StatusCodes.UNPROCESSABLE_ENTITY} if task not exists`, async () => {

			const token = jwt.sign(JSON.parse(JSON.stringify(userAdmin)), process.env.KEY_PRELOGIN);

			const response = await request(app)
				.delete(`/api/tasks/${INVALID_ID}`)
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
		});

		afterAll(async () => {
			await Task.remove({});
		});

	});

	describe('GET BY ID /tasks', () => {

		let task;
		let user;
		let userAdmin;

		beforeAll(async () => {
			user = await createUser({ name: 'User test', email: 'test@example.com', password: 'Asdf1234', role: 'user' });
			userAdmin = await createUser({ name: 'User admin', email: 'admin@example.com', password: 'Asdf1234', role: 'admin' });
		});

		beforeEach(async () => {
			task = await create({ [NAME_FIELD]: 'TEST', [DESCRIPTION_FIELD]: 'TEST DESCRIPTION' });
		});

		it(`Should return ${StatusCodes.OK} if found the task`, async () => {

			const token = jwt.sign(JSON.parse(JSON.stringify(userAdmin)), process.env.KEY_PRELOGIN);

			const data = {
				[NAME_FIELD]: 'TEST'
			};

			const responseExpected = {
				...data,
				[COMPLETED_FIELD]: false
			};

			const response = await request(app)
				.get(`/api/tasks/${task._id}`)
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(StatusCodes.OK);
			expect(formatCreatedResponse(response.body)).toEqual(responseExpected);
		});

		it(`Should return ${StatusCodes.UNAUTHORIZED} if invalid token`, async () => {

			const token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.KEY_PRELOGIN);

			const response = await request(app)
				.get(`/api/tasks/${task._id}`)
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
		});

		it(`Should return ${StatusCodes.UNPROCESSABLE_ENTITY} if task not exists`, async () => {

			const token = jwt.sign(JSON.parse(JSON.stringify(userAdmin)), process.env.KEY_PRELOGIN);

			const response = await request(app)
				.get(`/api/tasks/${INVALID_ID}`)
				.set('Authorization', `Bearer ${token}`);

			expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
		});

		afterAll(async () => {
			await Task.remove({});
		});

	});

	describe('GET BY FILTERS /tasks', () => {

		let generalTasks;

		let user;
		let userAdmin;

		beforeAll(async () => {
			user = await createUser({ name: 'User test', email: 'test@example.com', password: 'Asdf1234', role: 'user' });
			userAdmin = await createUser({ name: 'User admin', email: 'admin@example.com', password: 'Asdf1234', role: 'admin' });
			generalTasks = [await create({ [NAME_FIELD]: 'A', [DESCRIPTION_FIELD]: '1 DESCRIPTION', [COMPLETED_FIELD]: true }),
				await create({ [NAME_FIELD]: 'B', [DESCRIPTION_FIELD]: '2 DESCRIPTION' }),
				await create({ [NAME_FIELD]: 'C', [DESCRIPTION_FIELD]: '3 DESCRIPTION' })];
		});

		it(`Should return ${StatusCodes.OK} if task is filtered`, async () => {

			const token = jwt.sign(JSON.parse(JSON.stringify(userAdmin)), process.env.KEY_PRELOGIN);

			const tasksFormatted = generalTasks.map(({
				completed, _id, name, description, createdAt, updatedAt
			}) => ({
				completed, _id, name, description, createdAt: createdAt.toISOString(), updatedAt: updatedAt.toISOString(), id: _id
			}));

			const filterByStatus = tasksFormatted.filter(task => task.completed);

			const response = await request(app)
				.get('/api/tasks/')
				.set('Authorization', `Bearer ${token}`)
				.query({ status: true });

			expect(response.status).toBe(StatusCodes.OK);
			expect(JSON.stringify(response.body)).toBe(JSON.stringify(filterByStatus));
		});

		it(`Should return ${StatusCodes.OK} if task is sorted`, async () => {

			const token = jwt.sign(JSON.parse(JSON.stringify(userAdmin)), process.env.KEY_PRELOGIN);

			const tasksFormatted = generalTasks.map(({
				completed, _id, name, description, createdAt, updatedAt
			}) => ({
				completed, _id, name, description, createdAt: createdAt.toISOString(), updatedAt: updatedAt.toISOString(), id: _id
			}));

			const sortByName = tasksFormatted.sort((a, b) => a.name - b.name);

			const response = await request(app)
				.get('/api/tasks/')
				.set('Authorization', `Bearer ${token}`)
				.query({ name: 'ASC' });

			console.log('🚀 ~ file: serviceTask.test.js:444 ~ it ~ response:', response.body);

			expect(response.status).toBe(StatusCodes.OK);
			expect(JSON.stringify(response.body)).toBe(JSON.stringify(sortByName));
		});

		it(`Should return ${StatusCodes.OK} if task is paginated`, async () => {

			const token = jwt.sign(JSON.parse(JSON.stringify(userAdmin)), process.env.KEY_PRELOGIN);

			const tasksFormatted = generalTasks.map(({
				completed, _id, name, description, createdAt, updatedAt
			}) => ({
				completed, _id, name, description, createdAt: createdAt.toISOString(), updatedAt: updatedAt.toISOString(), id: _id
			}));

			const page = 1;
			const pageSize = 2;
			const startIndex = (page - 1) * pageSize;
			const endIndex = startIndex + pageSize;
			const tasksPerPage = tasksFormatted.slice(startIndex, endIndex);

			const response = await request(app)
				.get('/api/tasks/')
				.set('Authorization', `Bearer ${token}`)
				.query({ limit: 2, page: 1 });

			expect(response.status).toBe(StatusCodes.OK);
			expect(JSON.stringify(response.body)).toBe(JSON.stringify(tasksPerPage));
		});

		it(`Should return ${StatusCodes.UNAUTHORIZED} if invalid token`, async () => {

			const token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.KEY_PRELOGIN);

			const response = await request(app)
				.get('/api/tasks/')
				.set('Authorization', `Bearer ${token}`)
				.query({ name: 'ASC' });

			expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
		});

		it(`Should return ${StatusCodes.UNPROCESSABLE_ENTITY} if field is invalid`, async () => {

			const token = jwt.sign(JSON.parse(JSON.stringify(userAdmin)), process.env.KEY_PRELOGIN);

			const response = await request(app)
				.get('/api/tasks/')
				.set('Authorization', `Bearer ${token}`)
				.query({ name: 'ORDENADO' });

			expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
		});

		afterAll(async () => {
			await Task.remove({});
		});

	});
});
