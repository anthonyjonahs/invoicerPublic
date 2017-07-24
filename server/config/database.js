import mongoose from 'mongoose'

let database = {
	connect(){
		// Initialize database
		mongoose.connect(process.env.MONGODB_URI)
		const connection = mongoose.connection

		// Event listeners
		connection.on('error', err => console.error(err))
		connection.once('open', () => console.log('Connected to MongoDB'))

		// User native ES6 promises
		mongoose.Promise = global.Promise

		return connection;
	}
}

export default database
