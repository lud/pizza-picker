var extend = require('extend')
var Ractive = require('ractive')
var status = require('constants').status

module.exports = function(store, actions, opts, lc) {

	function getData() {
		var data = {
			pizzas: store.getRankedPizzas(),
			ingredients: store.getIngredients()
		}
		console.log('getData', data)
		return data
	}

	var ractive = new Ractive({
		oninit: function(){
			this.unsubscribe = store.listen(this.statusChange.bind(this))
		},
		statusChange: function(){
			this.set(getData())
			console.log('pizzas', this.get('pizzas'))
			console.log('ingredients', this.get('ingredients'))
		},
		el: opts.container,
		template: require('tpl/pizzapicker.html'),
		data: extend(getData(),{
			// Templates helpers
			lc:lc,
			formatIngredientsList:function(igs) {
				console.log("igs format",igs)
				return igs.map(ig => ig.name).join(', ')
			},
			statusClass: statusClass
		})
	})
	ractive.on({
		up:function(event) {
			event.original.preventDefault()
			var ingredient = event.context
			actions.setYummy(ingredient.key, ingredient.status)
		},
		down:function(event) {
			event.original.preventDefault()
			var ingredient = event.context
			actions.setYuck(ingredient.key, ingredient.status)
		}
	})
	return ractive
}

var statusClass = (function(){
	var classes = {}
	classes[status.YUCK] = 'yuck'
	classes[status.YUMMY] = 'yummy'
	classes[status.PASS] = 'pass'
	return function(status) {
		console.log('status :',status)
		console.log('classes :',classes)
		return classes[status]
	}
}())
