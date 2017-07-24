let webpackDevMiddleware, webpack, webpackConfig, compiler;

if (process.env.NODE_ENV !== 'production') {
	// Import local env variables.
	require('./env')

	// Webpack dev middleware stuff
	webpackDevMiddleware = require("webpack-dev-middleware");
	webpack = require("webpack");
	webpackConfig = require("../webpack.config");
	compiler = webpack(webpackConfig);
}

import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import path from 'path'
import bodyParser from 'body-parser'
import passport from 'passport'
import flash from 'express-flash'
import database from './config/database'
import routes from './routes/routes'
const app = express()
const MongoStore = require('connect-mongo')(session);


// Settings
app.set('views', path.join(__dirname, "../src/views"));
app.set('view engine', 'pug')

// Connect to DB
const mongooseConnection = database.connect()

// Passport auth
require('./config/passport')(passport);

// Session middleware
const expressSessionOptions = {
    secret: 'mySecret',
		cookie: {
			maxAge: 28800000
		},
    store: new MongoStore({ mongooseConnection }),
		resave: true,
    saveUninitialized: true
}

// Webpack devMiddleware
if (process.env.MODE === 'frontEnd') {
	console.log('Using webpackDevMiddleware ...');
	app.use(webpackDevMiddleware(compiler, {
		publicPath: '/'
	}));
}

app.use(express.static(path.join(__dirname, '../dist' )))
app.use('/new/upload', express.static(path.join(__dirname, '../dist' )))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(flash())
app.use(cookieParser())
app.use(session(expressSessionOptions))
app.use(passport.initialize())
app.use(passport.session())
app.use('/', routes)



// Listen on PORT
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
})
