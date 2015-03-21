
var extend = require('extend')
var Immutable = require('immutable')
var Reflux = require('reflux')
var sortBy = require('helpers/sortby')

var PENALTY = -9999

module.exports = function(api, opts) {


	return  Reflux.createStore({
		listenables: api,
		init: function(){
			this.ingrs = Immutable.Map(opts.ingredients).map(makeIngredient)
			this.diameters = Immutable.List(computeDiameters(opts.pizzas)).sort()
			this.pizzas = Immutable.List(opts.pizzas).map(makePizza)
			this.setRankedPizzas()
		},
		getDiameters: function() {
			return this.diameters.toJS()
		},
		getIngredients: function() {
			return this.ingrs.toJS()
		},
		getIngredient: function(key) {
			return this.ingrs.get(key)
		},
		setRankedPizzas: function() {
			this.ranked = this.pizzas
				// 1. Compute pizzas score
				.map(this.setScore)
				// 2. Filter out pizzas with score < 0
				.filter(this.scoreFilter)
				// 3. Sort by score desc
				.sort(sortBy(p => p.score ))
				// 4. Set the real ingredients
				.map(this.setIngredients)
		},
		getRankedPizzas: function() {
			return this.ranked.toJS()
		},
		setIngredients: function (pizza) {
			pizza.ingredients = pizza.ingredients.map(this.getIngredient)
			return pizza
		},
		setScore: function (pizza) {
			var ingrs = this.ingrs
			var sumScore = function(score, key) {
				var ingr = ingrs.get(key, {yummy:0})
				return score + (ingr.ok ? ingr.yummy : PENALTY)
			}
			pizza.score = pizza.ingredients.reduce(sumScore, pizza.score)
			return pizza
		},
		scoreFilter: function(pizza) {
			return pizza.score >= 0
		}
	})
}

function makePizza(term) {
	return extend(defaultPizza(), term)
}

function defaultPizza() {
	return {price:0, score:0}
}

function makeIngredient(term) {
	var defaults = defaultIngredient()
	if (typeof term === 'string')
		return extend(defaults, {name:term})
	else
		return extend(defaults, term)
}

function defaultIngredient() {
	// ok means that the ingredient is eatable. Set false and the pizzas with
	// this ingredients score PENALTY
	return {yummy: 0, ok:1}
}

function computeDiameters(pizzas) {
	var reg = {}
	pizzas.forEach(function(p){
		if (typeof p.price === 'object') {
			for (var k in p.price) if (p.price.hasOwnProperty(k)) {
				reg[k] = true
			}
		}
	})
	var diameters = []
	for (var k in reg) if (reg.hasOwnProperty(k)) {
		diameters.push(k)
	}
	return diameters
}
