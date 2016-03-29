let extend = require('extend')
let formatPrice = require('helpers/format-price')
let fsignal = require('fsignal')
let storeFactory = require('store')
let viewFactory = require('./view.jsx')
let respdata = require('responsive-data')
require('../css/picker.css')

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
		'windowResize': fsignal({async: false}),
		'toggleMenu': fsignal(),
	}
	let store = storeFactory.make(api, opts)
	store.init()
	opts.style = respdata(opts.style, api.windowResize)
	viewFactory.make(api, store, opts)
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
		ingredients:{},
		locale:'en',
		pizzas:[],
		prices:[],
		renderFilters: true,
		renderIngredients: true,
		renderPizzas: true,
		// Styles makes use of responsive-data system
		style: [
			{
				minWidth: 768,
				data: {
					renderImages: true,
					wrapperCssClass: 'pizza-picker',
					pizzaRowHeightPx: 100,
					pizzaRowMarginPx: 5,
				}
			},
			{
				minWidth: 480,
				data: {
					renderImages: true,
					wrapperCssClass: 'pizza-picker picker-swapmenu',
					pizzaRowHeightPx: 100,
					pizzaRowMarginPx: 5,
				}
			},
			// this is the default with no constraint. It is specified last
			// because we select the fist matching constraints and this one has
			// no constraint to match (matches all cases)
			{
				data: {
					renderImages: false,
					wrapperCssClass: 'pizza-picker picker-swapmenu',
					pizzaRowHeightPx: 100,
					pizzaRowMarginPx: 5,
				}
			}
		]
	}, opts)
}

// export the price formatter for the i18n files
PizzaPicker.priceFormatter = formatPrice.formatter
