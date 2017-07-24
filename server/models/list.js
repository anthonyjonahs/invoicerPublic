const mongoose = require('mongoose')

const listSchema = mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, required: true }, 		// ID of user who uploaded it.
	name: { type: String, required: true }, 			// List title as speficied when uploaded
	rawUpload: { type: Boolean, required: true, default: true },
	invoices: Array
	},
	{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
)

const List = module.exports = mongoose.model('List', listSchema)
