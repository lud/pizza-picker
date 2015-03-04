var webpack = require("webpack")
var dotenv = require('dotenv')

console.log("@todo closure compile & test")
console.log("@envify transform webpack")


dotenv.load()
console.log('APP_ENV=', process.env.APP_ENV)

function env(x) {
	return process.env[x]
}

function js (file) {
	return "./app/js/" + file
}

module.exports = {
	entry: js("main.js"),
	output: {
		path: "dist",
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{test: /\.js$/,	loader: 'jsx-loader?insertPragma=React.DOM&harmony'}
		]
	},
	amd: {phoenix: false},
	resolve: {
		modulesDirectories: ['client/js','node_modules']
	},
	externals: {
		gcconf: "var window.GConf",
	},
	devtool: '#eval-source-map',
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(true)
	]
}
