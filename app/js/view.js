var extend = require('extend')
var riot = require('riot')

require('tpl/pp-pizzas.tag')
require('tpl/pp-ingredients.tag')
require('tpl/pp-filters.tag')

module.exports = function(store, actions, opts, lc) {

	var initOpts = {
		// Templates helpers
		helpers: {
			lc:lc
		},
		actions:actions,
		events: opts.events,
		store:store
	}

	// Define options for the possible nested tags
	initOpts["pp-ingredients"] = initOpts
	initOpts["pp-pizzas"] = initOpts
	initOpts["pp-filters"] = initOpts

	console.log('mounting ' + opts.container)
	riot.mount(opts.container, initOpts)

}

