var extend = require('extend')
var status = require('constants').status


<pizzapicker>
	<div class="pizza-picker">
		<p>{ lc.selected_pizzas_count(pizzas.length) }</p>

		<ul>
			<li each="{ ingredients }" class={ 'status-' + parent.statusClass(status) }>
				<span>{ name }</span>
				<a href="#" class="up" onclick={ parent.up }>&hearts;</a>
				<a href="#" class="down" onclick={ parent.down }>x</a>
			</li>
		</ul>

		<table>
			<tr each={ pizzas }>
				<td>
					<a href="#">{ name }</a>
					<small>{  parent.formatIngredientsList(ingredients) }</small>
				</td>
			</tr>
		</table>

	</div>


	<script>
		// defines lc, ...
		extend(this, opts.helpers)

		// listen to the store
		this.on('mount',function(){
			// this.unsubscribe = opts.store.listen(this.update);
		})

		this.on('unmount', function(){
			this.unsubscribe()
		})

		this.on('update', function() {
			// on update, we just put in the state the store data
			this.pizzas = opts.store.getRankedPizzas(),
			console.log("this.pizzas",this.pizzas)
			this.ingredients = opts.store.getIngredients()
			console.log('getData this', this)
		})

		// Actions events -------------------------------------------------------

		var actions = opts.actions

		this.log = function(x) {
			console.log('X',x)
			return x
		}

		this.up = function(evt) {
			evt.preventDefault()
			var ingredient = this
			actions.setYummy(ingredient.key, ingredient.status)
		}

		this.down = function(evt) {
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
