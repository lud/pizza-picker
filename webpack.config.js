var webpack = require("webpack")
var dotenv = require('dotenv')

console.log("@todo closure compile & test")
console.log("@envify transform webpack")


dotenv.load()
console.log('APP_ENV=', process.env.APP_ENV)

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
		preLoaders: [
			{ test: /\.tag$/, exclude: /node_modules/, loader: 'riotjs-loader', query: { type: 'none' } }
		],
		loaders: [
			{ test: /\.js|\.tag$/, exclude: /node_modules/, loader: 'babel-loader'}
		]
	},
	amd: {phoenix: false},
	resolve: {
		modulesDirectories: ['app/js','node_modules']
	},
	externals: {
		gcconf: "var window.GConf",
	},
	devtool: '#eval-source-map',
	plugins: [
    	new webpack.ProvidePlugin({riot: 'riot'}),
		new webpack.optimize.OccurenceOrderPlugin(true),
		new webpack.optimize.UglifyJsPlugin({minimize: true}),
		new webpack.optimize.DedupePlugin()

	]
}
