const mongoose = require('mongoose')

const studentInfo = new mongoose.Schema(
	{  //CHANGED UNIQUE TO TRUE FOR USERNAME. MIGHT CAUSE PROBLEMS???
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ collection: 'StudentInfo' }
)

const model = mongoose.model('studentInfoPage', studentInfo)

module.exports = model