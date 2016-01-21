var webpack = require("webpack")
var dotenv = require('dotenv')

console.log("@todo closure compile & test")


dotenv.load()
console.log('APP_DEBUG=', process.env.APP_DEBUG)

function env(x) {
	return process.env[x]
}

function appfile (file) {
	return "./app/" + file
}

module.exports = {
	entry: {
		"pizza-picker": appfile("js/main.js"),
		"pizza-picker-lc_fr": appfile("js/lc/fr.js")
	},
	output: {
		path: "dist",
		filename: "[name].js"
	},
	module: {
		preLoaders: [],
		loaders: [
			{ test: /\.js/, exclude: /node_modules/, loader: 'babel-loader'}
		]
	},
	resolve: {
		modulesDirectories: ['app/js','node_modules']
	},
	externals: {
		gcconf: "var window.GConf",
	},
	devtool: Number(process.env.APP_DEBUG) ? '#eval-source-map' : this.undefined,
	plugins: [
		new webpack.ProvidePlugin({riot: 'riot'}),
		new webpack.optimize.OccurenceOrderPlugin(true),
		new webpack.optimize.UglifyJsPlugin({minimize: true}),
		new webpack.optimize.DedupePlugin()
	]
}
