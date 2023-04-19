const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		role: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

User.methods.toJSON = function toJSON() {
	const user = this.toObject({ versionKey: false });
	user.id = user._id;
	return user;
};

module.exports = mongoose.model('User', User);
