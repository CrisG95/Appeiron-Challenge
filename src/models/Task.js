const mongoose = require('mongoose');

const { Schema } = mongoose;
const { NAME_FIELD, DESCRIPTION_FIELD, COMPLETED_FIELD } = require('../constants/task');

const Task = new Schema(
	{
		[NAME_FIELD]: {
			type: String,
			required: true
		},
		[DESCRIPTION_FIELD]: {
			type: String,
			required: false
		},
		[COMPLETED_FIELD]: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	{ timestamps: true }
);

Task.methods.toJSON = function toJSON() {
	const task = this.toObject({ versionKey: false });
	task.id = task._id;
	return task;
};

Task.methods.edit = async function edit({
	name,
	description,
	completed
}) {
	this.name = name || this.name;
	this.description = description || this.description;
	this.completed = completed || this.completed;

	return this.save();
};

module.exports = mongoose.model('Task', Task);
