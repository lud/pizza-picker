var extend = require('extend')
var Immutable = require('immutable')
var Reflux = require('reflux')
var sortBy = require('helpers/sortby')
var k = require('helpers/k')

var status = require('constants').status

var Pizza = Immutable.Record({price:0, score:0, ingredients:[], name:"", url:'#', tags:[]})

var DEBUG = !true

module.exports = function(api, opts) {
	return window.store = Reflux.createStore({
		listenables: api,
		init: function(){
			this.ingrs = oMap(makeIngredient, opts.ingredients)
			this.diameters = computeDiameters(opts.pizzas).sort()
			console.log('diameters',this.diameters)
			this.pizzas = Immutable.List(opts.pizzas).map(makePizza)
			// we store an immutable map because we use the Map.filter on each
			// pizzas calculation to get Enabled filters
			this.filters = Immutable.Map(opts.filters).map(makeFilter)
		},
		onSetYummy: function(key) {
			var currentStatus = this.ingrs[key].status
			var newstatus = currentStatus === status.YUMMY ? status.PASS : status.YUMMY
			this.ingrs[key].status = newstatus
			this.trigger()
		},
		onSetYuck: function(key) {
			var currentStatus = this.ingrs[key].status
			var newstatus = currentStatus === status.YUCK ? status.PASS : status.YUCK
			this.ingrs[key].status = newstatus
			this.trigger()
		},
		onToggleFilter: function(key) {
			var filter = this.filters.get(key)
			if (filter) {
				this.toggleFilter(key)
				this.trigger()
			}
		},
		getDiameters: function() {
			return this.diameters.toJS()
		},
		getIngredients: function() {
			// convert to array
			return Immutable.Map(this.ingrs).toList().toJS()
		},
		getIngredient: function(key) {
			return this.ingrs[key]
		},
		getStatuses: function(){
			return extend({}, status)
		},
		getFilters: function(){
			return this.filters.toJS()
		},
		calcRankedPizzas: function() {
			DEBUG && console.log("BEFORE CALC", this.pizzas.map(function(p){
				DEBUG && console.log('INGS', p.ingredients)
			}))
			var pizzas = this.pizzas
				// 1. Compute pizzas score
				.map(this.setScore)
				// Filter out pizzas with score < 0
				.filter(this.scoreFilter)
			// Apply custom filters, pizzas is the accumulator of the reduction,
			// and the list of filter is iterated
			pizzas = this.getEnabledFilters().reduce((pizzas, f) => pizzas.filter(f.fun), pizzas)
				// Sort by score desc
			pizzas = pizzas.sort(sortBy(p => p.score ))
				// higher scores first : reverse !
				.reverse()
				// Set the real ingredients
				.map(this.setIngredients)
			return pizzas
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
				var ingr = ingrs[key] || {status: status.PASS} //@todo remove error skipping with default value
				DEBUG && console.log("score of ", ingr.name, " = ",getScore(ingr.status))
				return score + getScore(ingr.status)
			}
			pizza = pizza.set('score', pizza.ingredients.reduce(sumScore, pizza.score))
			return pizza
		},
		scoreFilter: function(pizza) {
			return pizza.score >= 0
		},
		getEnabledFilters: function() {
			return this.filters.filter(f => f.active)
		},
		toggleFilter: function (key) {
			this.filters.update(key, function(f){
				f.active = !f.active
				return f
			})
		}
	})
}

function oMap(f,o) {
	return Immutable.Map(o).map(f).toJS()
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

function makeFilter(term, key) {
	var defaults = baseFilter(key)
	if (typeof term === 'function')
		return extend(defaults, {fun:term})
	else
		return extend(defaults, term)
}

function baseFilter(key) {
	return {
		fun: k(true),
		name: ucFirst(key),
		active: false
	}
}

function ucFirst(str) {
	return str.charAt(0).toUpperCase() + str.slice(1)
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
