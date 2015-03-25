
var Reflux = require('reflux')
var extend = require('extend')
var makeActions = require('actions')
var makeStore = require('store')
var makeView = require('view')

// -- Picker Object -----------------------------------------------------------

var PizzaPicker = {}

// Lang are not stored in the prototype
PizzaPicker.i18n = {}
PizzaPicker.create = function(_opts) {

	var api = makeActions()

	var opts = extend(defaultOpts(), _opts)
	opts.events = extend(defaultEvents(), opts.events)

	// the app sort pizzas in reverse score, so we reverse them first so they
	// appear on load with order set by the user
	opts.pizzas = [].concat(opts.pizzas).reverse()

	var locale = PizzaPicker.i18n[opts.locale]
	if (locale === void 0) throw new Error('Locale '+ opts.locale+' not found')

	var picker = makeStore(api, opts)

	// initialisation of the view

	var view = makeView(picker, api, opts, locale)
	console.log('view',view)

	// our exported api is an objet of Reflux actions
	//
	picker.trigger()

	return api
}

function defaultOpts () {
	return {
		ingredients:{},
		pizzas:[],
		locale:'en',
		container:'pizzapicker',
		events:{},
		renderIngredients: true,
		renderPizzas: true,
		renderFilters: true
	}
}

function noop() {}

function defaultEvents () {
	return {
		clickPizza: noop
	}
}


// Export the object

window.PizzaPicker = PizzaPicker
