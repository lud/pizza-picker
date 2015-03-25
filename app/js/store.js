
var extend = require('extend')
var Immutable = require('immutable')
var Reflux = require('reflux')
var sortBy = require('helpers/sortby')

var status = require('constants').status

var Pizza = Immutable.Record({price:0, score:0, ingredients:[], name:"", url:'#'})

var DEBUG = !true

module.exports = function(api, opts) {
	return window.store = Reflux.createStore({
		listenables: api,
		init: function(){
			this.ingrs = Immutable.Map(opts.ingredients).map(makeIngredient)
			this.diameters = Immutable.List(computeDiameters(opts.pizzas)).sort()
			console.log('diameters',this.diameters.toJS())
			this.pizzas = Immutable.List(opts.pizzas).map(makePizza)
		},
		onSetYummy: function(key, currentStatus) {
			console.log('onSetYummy',key, currentStatus)
			this.ingrs = this.ingrs.update(key, function(ing){
				ing.status = currentStatus === status.YUMMY ? status.PASS : status.YUMMY
				return ing
			})
			this.trigger()
		},
		onSetYuck: function(key, currentStatus) {
			console.log('onSetYuck',key, currentStatus)
			this.ingrs = this.ingrs.update(key, function(ing){
				ing.status = currentStatus === status.YUCK ? status.PASS : status.YUCK
				return ing
			})
			this.trigger()
		},
		getDiameters: function() {
			return this.diameters.toJS()
		},
		getIngredients: function() {
			return this.ingrs.toList().toJS()
		},
		getIngredient: function(key) {
			return this.ingrs.get(key)
		},
		getStatuses: function(){
			return extend({}, status)
		},
		getPizzas: function(){
			return this.pizzas.toJS()
		},
		calcRankedPizzas: function() {
			DEBUG && console.log("BEFORE CALC", this.pizzas.map(function(p){
				DEBUG && console.log('INGS', p.ingredients)
			}))
			return this.pizzas
				// 1. Compute pizzas score
				.map(this.setScore)
				// 2. Filter out pizzas with score < 0
				.filter(this.scoreFilter)
				// 3. Sort by score desc
				.sort(sortBy(p => p.score ))
				.reverse()
				// 4. Set the real ingredients
				.map(this.setIngredients)
		},
		getRankedPizzas: function() {
			var calculated = this.calcRankedPizzas()
			DEBUG && console.log('calculated',calculated.toJS())
			return calculated.toJS()
		},
		setIngredients: function (pizza) {
			DEBUG && console.log('setIngredients', pizza.ingredients)
			pizza = pizza.set('ingredients', pizza.ingredients.map(this.getIngredient))
			DEBUG && console.log(' -> ', pizza.ingredients)
			return pizza
		},
		setScore: function (pizza) {
			DEBUG && console.log('setScore called')
			var ingrs = this.ingrs
			var sumScore = function(score, key) {
				var ingr = ingrs.get(key, {status: status.PASS}) //@todo remove error skipping
				DEBUG && console.log("score of ", ingr.name, " = ",getScore(ingr.status))
				return score + getScore(ingr.status)
			}
			pizza = pizza.set('score', pizza.ingredients.reduce(sumScore, pizza.score))
			return pizza
		},
		scoreFilter: function(pizza) {
			return pizza.score >= 0
		}
	})
}

function makePizza(term) {
	return new Pizza(term)
}

function makeIngredient(term, key) {
	var defaults = baseIngredient(key)
	if (typeof term === 'string')
		return extend(defaults, {name:term})
	else
		return extend(defaults, term)
}

function baseIngredient(key) {
	return {status:status.PASS, key:key}
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
	for (var k in reg) if (reg.hasOwnProperty(k)) diameters.push(k)
	return Object.keys(reg)
}

var getScore = (function(){
	var scores = {}
	scores[status.YUCK] = -9999
	scores[status.YUMMY] = 1
	scores[status.PASS] = 0
	return function(status) {
		return scores[status]
	}
}())
