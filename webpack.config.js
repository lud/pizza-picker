var webpack = require("webpack")
var extend = require("extend")

function pickrPath(sub) {
    return "./jsapps/pickr" + (sub || '')
}

function editorPath(sub) {
    return "./jsapps/editor" + (sub || '')
}

function commonPath(sub) {
    return "./jsapps/common" + (sub || '')
}

function distPath(sub) {
    return "./priv/static/js/bundle" + (sub || '')
}

function pickrConfig(specific) {
    var common = {
        entry: {
            "pizza-picker": pickrPath("/js/picker.js"),
            "pizza-picker-lc_fr": pickrPath("/js/lc/fr.js")
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
            modulesDirectories: [commonPath('/js'), pickrPath('/js'), 'node_modules']
        },
    }
    return extend(common, specific)
}
function editorConfig(specific) {
    var common = {
        entry: {
            "editor": editorPath("/js/editor.js"),
            "editor-lc_fr": editorPath("/js/lc/fr.js")
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
            modulesDirectories: [commonPath('/js'), editorPath('/js'), 'node_modules']
        },
    }
    return extend(common, specific)
}

var configs = {}

configs.pickr_dev = pickrConfig({
    output: {
        path: distPath(),
        filename: "[name].js"
    },
    devtool: 'eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.DedupePlugin()
    ]
})

configs.pickr_prod = pickrConfig({
    output: {
        path: distPath(),
        filename: "[name].min.js"
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.optimize.DedupePlugin()
    ]
})


configs.editor_dev = editorConfig({
    output: {
        path: distPath(),
        filename: "[name].js"
    },
    devtool: 'eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.DedupePlugin()
    ]
})

module.exports = [
    configs.pickr_dev,
    configs.pickr_prod,
]
