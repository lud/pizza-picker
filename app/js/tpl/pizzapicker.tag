var extend = require('extend')
var status = require('constants').status


<pizzapicker>
	<div class="pizza-picker">

		<ul>
			<li each="{ ingredients }" class={ 'status-' + parent.statusClass(status) }>
				<span>{ name }</span>
				<a href="#" class="yum" onclick={ parent.yum }>&hearts;</a>
				<a href="#" class="yuck" onclick={ parent.yuck }>x</a>
			</li>
		</ul>

		<ul>
			<li each={ key, filter in filters } class={ parent.filterCssClass(key, filter) }>
				<a href={ url } onclick={ parent.toggleFilter }>{ filter.name }</a>
			</li>
		</ul>

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
					ingredients: opts.store.getIngredients(),
					filters: opts.store.getFilters()
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

		this.yum = function(evt) {
			actions.setYummy(this.key)
		}

		this.yuck = function(evt) {
			actions.setYuck(this.key)
		}

		this.toggleFilter = function(evt) {
			actions.toggleFilter(this.key)
		}

		// view helpers -------------------------------------------------------

		this.formatIngredientsList = function(igs) {
			return igs.map(ig => ig.name).join(', ')
		}

		this.filterCssClass = function(key, filter) {
			return ('filter-' + key
				+ (filter.active ? ' active' : '')
			)
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
