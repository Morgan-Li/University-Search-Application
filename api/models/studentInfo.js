const mongoose = require('mongoose')

const studentInfo = new mongoose.Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ collection: 'StudentInfo' }
)

const model = mongoose.model('studentInfoPage', studentInfo)

module.exports = model