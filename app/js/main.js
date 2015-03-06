console.log('Defining PizzaPicker')

var Immutable = require('Immutable')
var extend = require('extend')


// -- Root object -------------------------------------------------------------

function PizzaPicker() {

}

PizzaPicker.prototype.setIngredients = function(kvIngredients) {
	var ingrs = Immutable.Map(kvIngredients)
	ingrs = ingrs.map(v => makeIngredient(v))
	this.ingredients = ingrs
	return this
}

PizzaPicker.prototype.setPizzas = function(pizzasDefs) {
	return this
}

PizzaPicker.prototype.render = function() {
	console.log('@todo rendering')
}


// -- Ingredients -------------------------------------------------------------

function makeIngredient(term) {
	var defaults = defaultIngredient()
	if (typeof term === 'string')
		return extend(defaults, {label:term})
	else
		return extend(defaults, term)
}

function defaultIngredient() {
	return {yum: 0, allowed:true, tags:[]}
}

window.PizzaPicker = PizzaPicker
