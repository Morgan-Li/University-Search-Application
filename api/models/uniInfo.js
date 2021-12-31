const mongoose = require('mongoose')

const uniInfo = new mongoose.Schema(
	{
        Rank: { type: Number },
		Uname: { type: String, required: true, unique: true },
		Prog_Offered: [{ type: String, required: true}],
		Dom_Frgn_Ratio: { type: String},
		PriLang: { type: String, required: true },
        Location: { type: String, required: true },
		FTutition_Range: { type: Number},
        DTutition_Range: { type: Number},
        Website: { type: String},
		Type: {type: String },
	},
	{timestamps: true},
	{ collection: 'UniInfo' }
)

const model = mongoose.model('uniInfoPage', uniInfo)

module.exports = model