var webpack = require("webpack")
var extend = require("extend")
var dotenv = require('dotenv')

console.log("@todo closure compile & test")


dotenv.load()
console.log('APP_DEBUG=', process.env.APP_DEBUG)

function env(x) {
    return process.env[x]
}

function appfile(file) {
    return "./pickrjs/" + file
}

function pickrConfig(specific) {
    var common = {
        entry: {
            "pizza-picker": appfile("js/picker.js"),
            "pizza-picker-lc_fr": appfile("js/lc/fr.js")
        },
        module: {
            preLoaders: [],
            loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins: ["mjsx"]
                }
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
            ]
        },
        resolve: {
            modulesDirectories: ['pickrjs/js', 'node_modules']
        },
    }
    return extend(common, specific)
}

var configs = {}

configs.pickr_dev = pickrConfig({
    output: {
        path: "dist",
        filename: "[name].js"
    },
    devtool: 'eval-source-map',
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.DedupePlugin()
    ]
})

configs.pickr_prod = pickrConfig({
    output: {
        path: "dist",
        filename: "[name].min.js"
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.optimize.DedupePlugin()
    ]
})

module.exports = [
    configs.pickr_dev,
    configs.pickr_prod,
]
