const formatCreatedResponse = (response, addittionalData) => {
	const {
		description, updatedAt, createdAt, _id, id, __v, ...responseFormatted
	} = response;

	return { ...responseFormatted, ...addittionalData };

};

const expectError = (message, field, value) => ({
	errors: [
		{
			type: 'field',
			value,
			msg: message,
			path: field,
			location: 'body'
		}
	]
});

module.exports = { formatCreatedResponse, expectError };
