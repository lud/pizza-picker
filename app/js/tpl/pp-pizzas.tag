var extend = require('extend')
var status = require('constants').status


<pp-pizzas>

	<div class="pizza-picker">
		<p>{ lc.selected_pizzas_count(pizzas.length) }</p>
		<ul>
			<li each={ pizzas }>
				<a href={ url } onclick={ parent.userEvents.clickPizza }>{ name }</a>
				<small>{  parent.formatIngredientsList(ingredients) }</small>
			</li>
		</ul>
	</div>

	<script>

		var self = this

		// defines lc, ...
		extend(this, opts.helpers)
		extend(this, {userEvents: opts.events})

		// listen to the store
		this.on('mount',function(){
			var self = this
			this.unsubscribe = opts.store.listen(function(){
				// on update, we just put in the state the store data
				var data = {
					pizzas: opts.store.getRankedPizzas(),
				}
				self.update(data)
			});
		})

		this.on('unmount', function(){
			this.unsubscribe()
		})

		this.on('update', function() {})

		// Actions events -----------------------------------------------------

		var actions = opts.actions

		// view helpers -------------------------------------------------------

		this.formatIngredientsList = function(igs) {
			return igs.map(ig => ig.name).join(', ')
		}

	</script>

</pp-pizzas>
