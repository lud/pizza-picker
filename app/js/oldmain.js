
process.env.APP_DEBUG && console.warn('Pizza Picker runs in debug mode')

var extend = require('extend')
var makeActions = require('actions')

// -- Picker Object -----------------------------------------------------------

var PizzaPicker = {}

// Lang are not stored in the prototype
PizzaPicker.i18n = {}
PizzaPicker.create = function(_opts) {

	var api = makeActions()

	var opts = extend(defaultOpts(), _opts)
	opts.events = extend(defaultEvents(), opts.events)

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
		prices:[],
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
