
var Reflux = require('reflux')
var extend = require('extend')
var tpl = {
	pizzapicker: require('tpl/pizzapicker.tag')
}
var riot = require('riot')
var makeActions = require('actions')
var makeStore = require('store')

// -- Picker Object -----------------------------------------------------------

var PizzaPicker = {}

// Lang are not stored in the prototype
PizzaPicker.i18n = {}
PizzaPicker.create = function(_opts) {

	var api = makeActions()


	var defaultOpts = {
		ingredients:{},
		pizzas:[],
		locale:'en',
		container:'pizzapicker',
	}

	var opts = extend(defaultOpts, _opts)

	var locale = PizzaPicker.i18n[opts.locale]
	if (locale === void 0) throw new Error('Locale '+ opts.locale+' not found')

	var picker = makeStore(api, opts)

	// our exported api is an objet of Reflux actions

	riot.mount(opts.container, {actions: api, store: picker, lc: locale})

	return api
}


// Export the object

window.PizzaPicker = PizzaPicker
