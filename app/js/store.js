import {status} from 'constants'
let Reflux = require('reflux')
let sortby = require('helpers/sortby')
let m = require('mithril')
let omap = require('helpers/omap')
let assert = require('helpers/assert')
let ovals = require('helpers/ovals')
let extend = require('extend')
let get = require('helpers/get')


let model = {}

model.make = function(api, opts) {
	let ingredients = omap(opts.ingredients, ingredient)
	let defaultOrder = 0
	let pizzas = opts.pizzas.map(function(def){
		let ingrs = findAllIngredients(ingredients, def.ingredients)
		let def2 = extend({}, def)
		def2.ingredients = findAllIngredients(ingredients, def.ingredients)
		def2.defaultOrder = defaultOrder++
		return pizza(def2)
	})
	let filters = []
	let ingredientsList = ovals(ingredients).sort()
	return Reflux.createStore({
		init: function() {
			this.listenToMany(api)
			this.computePizzas()
			this.trigger()
		},
		ingredients: () => ingredientsList,
		pizzas: function() {
			return pizzas
				// .filter(p => p.visible())

		},
		onToggleYummy: function(ing) {
			ing.toggleYummy()
			this.computePizzas()
			this.trigger()
		},
		onToggleYuck: function(ing) {
			ing.toggleYuck()
			this.computePizzas()
			this.trigger()
		},
		computePizzas: function() {
			let visibleRank = 0
			pizzas.forEach(function(p){
				p.compute()
			})
			pizzas.sort(sortby().desc(p => p.score()).asc('defaultOrder'))
			pizzas.forEach(function(p){
				p.rank(p.visible() ? visibleRank++ : 0)
			})
		}
	})
}

module.exports = model

// pizza model, receives all pizza properties from the user spec, but
// .ingredients are models
let pizza = function(pizza) {
	pizza.wasVisible = m.prop(false)
	pizza.visible = m.prop(true)
	let prevRank = 0
	let curRank = pizza.defaultOrder
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
	pizza.checkVisible = function() {
		pizza.wasVisible(pizza.visible())
		// a pizza is visible if neither of its ingredients have a YUCK status
		return pizza.visible(! pizza.ingredients.some(i => i.status() === status.YUCK))
	}
	pizza.calcScore = function() {
		// Yummy ingredients score 1, others score 0
		return pizza.score(pizza.ingredients
			.map(ing => Number(ing.status() === status.YUMMY))
			.reduce((sum, score) => sum + score))
	}
	pizza.score = m.prop()
	pizza.calcScore()
	pizza.compute = function() {
		pizza.checkVisible()
		pizza.calcScore()
	}
	return pizza
}

let ingredient = function(name) {
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


function findAllIngredients (ingrs, keys) {
	let found = []
	keys.forEach(function(k){
		assert (ingrs[k] !== void 0, "Ingredient '%s' not found", k)
		found.push(ingrs[k])
	})
	return found
}

