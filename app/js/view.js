var extend = require('extend')
var Ractive = require('ractive')

module.exports = function(store, actions, opts, lc) {

	function getData() {
		return {
			pizzas: store.getRankedPizzas()
		}
	}

	return new Ractive({
		oninit: function(){
			this.unsubscribe = store.listen(this.statusChange)
		},
		statusChange: function(){
			console.log('statusChange this',this)
			this.set(getData())
			console.log(this.get('pizzas'))
		},
		el: opts.container,
		template: require('tpl/pizzapicker.html'),
		data: extend(getData(),{
			// Templates helpers
			lc:lc,
			formatIngredientsList:function(igs) {
				return igs.map(ig => ig.name).join(', ')
			}
		})
	})

}
