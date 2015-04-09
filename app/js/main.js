
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

	// our exported api is an objet of Reflux actions
	//
	picker.trigger()

	return api
}

function defaultOpts () {
	return {
		ingredients:{},
		pizzas:[],
		filters:{},
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

PizzaPicker.filter = {
	taggedOnly: function(tag) {
		// keeps only the pizza if it has the tag
		return pizzaHasTagFun(tag, true)
	},
	hideTagged: function(tag) {
		// keeps only the pizza if it has NOT the tag
		return pizzaHasTagFun(tag, false)
	}
}

function pizzaHasTagFun(tag, ret) {
	return function(pizza) {
		var hasTag = pizza.tags.indexOf(tag) !== -1
		// in any way, if the pizza is already not accepted, it will remain false
		return pizza.set('accepted', pizza.accepted && (hasTag ? ret : !ret))
	}
}

// Export the object

window.PizzaPicker = PizzaPicker
