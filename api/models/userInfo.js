const mongoose = require('mongoose')

const userInfo = new mongoose.Schema(
	{  //CHANGED UNIQUE TO TRUE FOR USERNAME. MIGHT CAUSE PROBLEMS???
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		isAdmin: { type: Boolean, default: false },
		isInstitution: { type: Boolean, default: false },
	},
	{ collection: 'UserInfo' }
)

const model = mongoose.model('userInfoPage', userInfo)

module.exports = model