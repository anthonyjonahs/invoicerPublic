import dotenv from 'dotenv'
if(process.env.NODE_ENV != 'production') {
	let env = dotenv.config()
	console.log('ENV variables set for local environment.');
}
