var path = require('path')

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: ['babel-polyfill','./components/client.js'],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ['env', 'react'],
							plugins: ['react-html-attrs']
						}
					}
				]
			}
		]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	}
}
