let extend = require('extend')
let fsignal = require('fsignal')
let storeFactory = require('store')
let viewFactory = require('view')
let respdata = require('responsive-data')

// app
let PizzaPicker = {i18n:{}}
window.PizzaPicker = PizzaPicker
window.m = require('mithril')

PizzaPicker.create = function(_opts) {
	let opts = setDefaultOpts(_opts)
	let api = {
		'toggleYummy': fsignal(),
		'toggleYuck': fsignal(),
		'toggleFilter': fsignal(),
		'windowResize': fsignal()
	}
	let store = storeFactory.make(api, opts)
	opts.style = respdata(opts.style, api.windowResize)
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
		container:'pizzapicker',
		events:{},
		filters:{},
		formatPrice: function(price){
			return price.toLocaleString() + ' €'
		},
		ingredients:{},
		locale:'en',
		pizzas:[],
		prices:[],
		renderFilters: true,
		renderIngredients: true,
		renderPizzas: true,
		// Styles makes use of responsive-data system
		style: [
			// this is the default with no constraint. It is specified last
			// because we select the fist matching constraints and this one has
			// no constraint to match (matches all cases)
			{
				data: {
					pizzaRowHeightPx: 100,
					pizzaRowMarginPx: 5,
				}
			}
		]
	}, opts)
}


