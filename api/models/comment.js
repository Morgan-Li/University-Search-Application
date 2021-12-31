const mongoose = require('mongoose')

const comment = new mongoose.Schema(
	{//CAN OPTIMIZE BY SWAPPING UNIID TYPE WITH OBJECTID TO SAVE 12 BITS (24 for string vs 12)
        UniID: { type: String, required: true },
		username: { type: String, required: true },
		desc: { type: String, required: true },
	},
	{timestamps: true},
	{ collection: 'Comments' }
)

const model = mongoose.model('Comments', comment)

module.exports = model