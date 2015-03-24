var extend = require('extend')
var status = require('constants').status


<pizzapicker>
	<div class="pizza-picker">

		<ul>
			<li each="{ ingredients }" class={ 'status-' + parent.statusClass(status) }>
				<span>{ name }</span>
				<a href="#" class="up" onclick={ parent.up }>&hearts;</a>
				<a href="#" class="down" onclick={ parent.down }>x</a>
			</li>
		</ul>

		<p>{ lc.selected_pizzas_count(pizzas.length) }</p>

		<ul>
			<li each={ pizzas }>
				<span>{ name }</span>
				<small>{  parent.formatIngredientsList(ingredients) }</small>
			</li>
		</ul>

	</div>


	<script>

		var self = this

		// defines lc, ...
		extend(this, opts.helpers)

		// listen to the store
		this.on('mount',function(){
			var self = this
			this.unsubscribe = opts.store.listen(function(){
				// on update, we just put in the state the store data
				var data = {
					pizzas: opts.store.getRankedPizzas(),
					ingredients: opts.store.getIngredients()
				}
				self.update(data)
			});
		})

		this.on('unmount', function(){
			this.unsubscribe()
		})

		this.on('update', function() {})

		// Actions events -------------------------------------------------------

		var actions = opts.actions

		this.up = function(evt) {
			console.log('called', "this.up")
			evt.preventDefault()
			var ingredient = this
			actions.setYummy(ingredient.key, ingredient.status)
		}

		this.down = function(evt) {
			console.log('called', "this.down")
			evt.preventDefault()
			var ingredient = this
			actions.setYuck(ingredient.key, ingredient.status)
		}

		// view helpers ---------------------------------------------------------

		this.formatIngredientsList = function(igs) {
			return igs.map(ig => ig.name).join(', ')
		}

		this.statusClass = (function(){
			var classes = {}
			classes[status.YUCK] = 'yuck'
			classes[status.YUMMY] = 'yummy'
			classes[status.PASS] = 'pass'
			return function(status) {
				return classes[status]
			}
		}())
	</script>

</pizzapicker>
