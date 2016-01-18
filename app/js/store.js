import {status} from 'constants'
let assert = require('helpers/assert')
let extend = require('extend')
let get = require('helpers/get')
let m = require('mithril')
let omap = require('helpers/omap')
let ovals = require('helpers/ovals')
let fsignal = require('fsignal')
let sortby = require('helpers/sortby')


let model = {}

model.make = function(api, opts) {
	let ingredients = omap(opts.ingredients, Ingredient)
	let defaultOrder = 0
	let pizzas = opts.pizzas.map(function(def, i){
		let def2 = extend({id: i}, def)
		def2.ingredients = findAllIngredients(ingredients, def.ingredients)
		def2.defaultOrder = defaultOrder++
		return Pizza(def2)
	})
	let filters = ovals(opts.filters, function(filter, k) {
		filter.id = k
		return Filter(filter)
	}).sort(sortby('name'))
	let ingredientsList = ovals(ingredients).sort()
	let store = {
		change: fsignal(),
		trigger: function() {
			store.change()
		},
		init: function () {
			omap(api, function(f, k) {
				if(store[k]) {
					f.listen(store[k])
				}
			})
			store.computeAll()
		},
		ingredients: () => ingredientsList,
		pizzas: () => pizzas,
		filters: () => filters,
		toggleYummy: function (ing) {
			ing.toggleYummy()
			store.computeAll()
		},
		toggleYuck: function (ing) {
			console.log('into toggleYuck', arguments)
			console.log('into toggleYuck ing', ing)
			ing.toggleYuck()
			store.computeAll()
		},
		toggleFilter: function (filter) {
			filter.toggle()
			store.computeAll()
		},
		computeAll: function () {
			let visibleRank = 0
			let enabledFilters = filters.filter(f => f.status() === status.ENABLED)
			pizzas.forEach(p => p.compute(enabledFilters))
			pizzas.sort(sortby().desc(p => p.score()).asc('defaultOrder'))
			pizzas.forEach(p => p.rank(p.visible() ? visibleRank++ : 0))
			filters.forEach(f => f.setMatchingPizzas(pizzas))
			store.trigger()
		}
	}
	// store.init()
	return store
}

module.exports = model

// pizza model, receives all pizza properties from the user spec, but
// .ingredients are models
let Pizza = function(data) {
	let pizza = extend({tags:[], url:null, prices:{}, name:'Unnamed pizza'}, data)
	pizza.wasVisible = m.prop(false)
	pizza.visible = m.prop(true)
	let prevRank = 0
	let curRank = 0
	pizza.prevRank = () => prevRank
	pizza.rank = function() {
		if (arguments.length) {
			let newRank = arguments[0]
			prevRank = curRank
			curRank = newRank
			return curRank
		} else {
			return curRank
		}
	}
	pizza.checkVisible = function(filters) {
		pizza.wasVisible(pizza.visible())
		// a pizza is visible if neither of its ingredients have a YUCK status
		return pizza.visible(
			! filters.some(filter => filter.reject(pizza))
			&&
			! pizza.ingredients.some(i => i.status() === status.YUCK)
			)
	}
	pizza.calcScore = function() {
		// Yummy ingredients score 1, others score 0
		return pizza.score(pizza.ingredients
			.map(ing => Number(ing.status() === status.YUMMY))
			.reduce((sum, score) => sum + score))
	}
	pizza.score = m.prop()
	pizza.calcScore()
	pizza.compute = function(filters) {
		pizza.checkVisible(filters)
		pizza.calcScore()
	}
	pizza.tagged = function(tag) {
		return pizza.tags.indexOf(tag) !== -1
	}
	return pizza
}

let Ingredient = function(name) {
	let ing = {
		name: name
	}
	ing.status = m.prop(status.PASS)
	ing.toggleYummy = function(){
		ing.status(ing.status() === status.YUMMY ? status.PASS : status.YUMMY)
	}
	ing.toggleYuck = function(){
		ing.status(ing.status() === status.YUCK ? status.PASS : status.YUCK)
	}
	return ing
}

let Filter = function(data) {
	let filter = extend({}, data)
	filter.status = m.prop(status.DISABLED)
	filter.toggle = function() {
		return filter.status(filter.status() === status.DISABLED ? status.ENABLED : status.DISABLED)
	}
	filter.accept = function(pizza) {
		let passes = filter.fun(pizza)
		return passes
		return filter.fun(pizza)
	}
	filter.reject = function(pizza) {
		return ! filter.accept(pizza)
	}
	let selfPizzas = []
	filter.setMatchingPizzas = function(pizzas) {
		selfPizzas = pizzas.filter(p => filter.accept(p))
	}
	filter.hasHiddenPizzas = function() {
		return selfPizzas.some(function(p){
			return !p.visible()
		})
	}
	filter.matchingPizzas = () => selfPizzas.slice()
	return filter
}

function findAllIngredients (ingrs, keys) {
	let found = []
	keys.forEach(function(k) {
		assert (ingrs[k] !== void 0, "Ingredient '%s' not found", k)
		found.push(ingrs[k])
	})
	return found
}

