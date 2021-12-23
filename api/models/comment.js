const mongoose = require('mongoose')

const comment = new mongoose.Schema(
	{
        UniID: { type: String, required: true },
		username: { type: String, required: true },
		desc: { type: String, required: true },
	},
	{timestamps: true},
	{ collection: 'Comments' }
)

const model = mongoose.model('Comments', comment)

module.exports = model