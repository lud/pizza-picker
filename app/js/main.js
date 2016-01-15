import {status} from 'constants'
let extend = require('extend')

let storeFactory = require('store')
let viewFactory = require('view')
let Reflux = require('reflux')


// app
let PizzaPicker = {i18n:{}}
window.PizzaPicker = PizzaPicker
window.m = require('mithril')

PizzaPicker.create = function(_opts) {
	let opts = setDefaultOpts(_opts)
	let api = Reflux.createActions([
		'toggleYummy', 'toggleYuck'
	])
	let store = storeFactory.make(api, opts)
	let view = viewFactory.make(api, store, opts)
	opts.container.classList.add('pizza-picker') // @todo move this somewhere else ?
	store.trigger()
}

console.log('pp',PizzaPicker)





// -----------------------------------------------------------------------------



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


