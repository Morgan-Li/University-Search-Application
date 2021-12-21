const mongoose = require('mongoose')

const comment = new mongoose.Schema(
	{
        UniName: { type: String, required: true },
		username: { type: String, required: true },
		desc: { type: String, required: true },
	},
	{ collection: 'Comments' }
)

const model = mongoose.model('Comments', comment)

module.exports = model