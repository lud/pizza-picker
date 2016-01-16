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
		'toggleFilter': fsignal()
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
			pizzaRowHeightPx: 100,
			pizzaRowMarginPx: 5,
		}
	}, opts)
}

// Publish some useful stuff
PizzaPicker.m = require('mithril')
PizzaPicker.fsignal = require('fsignal')

var configs = [
	{
		minWidth: 768,
		data: {
			// anything you want here
			type: 'tablet'
		}
	},
	{
		orientation: 'landscape',
		maxWidth: 768 - 1,
		data: {
			type: 'landscape smartphone'
		}
	},
	{
		maxWidth: 768 - 1,
		data: {
			type: 'smartphone'
		}
	},
	// this one has no constraints, so it matches everytime
	{
		data: {
			type: 'any'
		}
	}
]
var conf = respdata(configs, function(version){
	console.log('version', version.type)
})
window.ccc = conf
console.log(conf.get())

