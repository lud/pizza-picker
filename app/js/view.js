var extend = require('extend')
var riot = require('riot')
var _tpl = require('tpl/pizzapicker.tag')

module.exports = function(store, actions, opts, lc) {

	var initOpts = {
		// Templates helpers
		helpers: {
			lc:lc
		},
		actions:actions,
		store:store
	}

	riot.mount(opts.container, initOpts)

}

