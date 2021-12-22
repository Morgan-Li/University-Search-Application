const mongoose = require('mongoose')

const savedUni = new mongoose.Schema(
	{//CAN OPTIMIZE BY SWAPPING UNIID TYPE WITH OBJECTID TO SAVE 12 BITS (24vs12)
		username: { type: String, required: true},
        Rank: { type: Number },
		Uname: { type: String, required: true},
        Location: { type: String, required: true },
		UniID: {type: String, required: true},
	},
	{ collection: 'savedUni' }
)

const model = mongoose.model('watchlistPage', savedUni)

module.exports = model