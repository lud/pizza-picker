let extend = require('extend')
let Signal = require('min-signal')
let storeFactory = require('store')
let viewFactory = require('view')


// app
let PizzaPicker = {i18n:{}}
window.PizzaPicker = PizzaPicker
window.m = require('mithril')

PizzaPicker.create = function(_opts) {
	let opts = setDefaultOpts(_opts)
	let api = {
		'toggleYummy': new Signal(),
		'toggleYuck': new Signal(),
		'toggleFilter': new Signal()
	}
	let store = storeFactory.make(api, opts)
	viewFactory.make(api, store, opts)
	opts.container.classList.add('pizza-picker') // @todo move this somewhere else ?
	store.init()
	return api
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
		return pizza.tagged(tag) ? ret : !ret
	}
}

function setDefaultOpts (opts) {
	return extend({
		ingredients:{},
		pizzas:[],
		filters:{},
		locale:'en',
		container:'pizzapicker',
		events:{},
		prices:[],
		renderIngredients: true,
		renderPizzas: true,
		renderFilters: true,
		style: {
			pizzaRowHeightPx: 50,
			pizzaRowMarginPx: 5,
		}
	}, opts)
}


