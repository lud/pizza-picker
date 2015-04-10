var extend = require('extend')
var statusClasses = require('constants').statusAtoms


<pp-pizzas>

	<div class="pizza-picker">
		<p>{ lc.selected_pizzas_count(acceptedPizzas.length) }</p>
		<ul>
			<li each={ pizzas } data-score={ score } class="{ parent.getInstantClass(this) } { pizza:1, unaccepted: !accepted }">
				<a href={ url } onclick={ parent.userEvents.clickPizza }>{ name } { score }</a>
				<small each={ ingredients } class="{ingredient:1}">
					<span class="status-{ parent.parent.statusClass(status) }">{ name }</span></small>
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
				var pizzas = opts.store.getRankedPizzas()
				var data = {
					pizzas: pizzas,
					acceptedPizzas: pizzas.filter(p => p.accepted)
				}
				self.update(data)
			});
		})

		this.on('unmount', function(){
			this.unsubscribe()
		})

		this.on('update', function() {
			setTimeout(function(){
				// trigger the css transition
				var nodes = Array.prototype.slice.call(self.root.getElementsByTagName('li'))
				nodes.map(function(li){
					if (/on_to_off/.test(li.className)) {
						li.className += ' off'
					} else if (/off_to_on/.test(li.className)) {
						li.className += ' on'
					}
				})

			}, 40)
		})

		// Actions events -----------------------------------------------------

		var actions = opts.actions

		// view helpers -------------------------------------------------------

		this.statusClass = function(status) {
			return statusClasses[status]
		}

		this.getInstantClass = function(it) {
			// elements that remain the same
			if (it.accepted && it.prevAccepted) return "on"
			if (!it.accepted && !it.prevAccepted) return "off"

			// elements that change
			var prevAccepted = it.prevAccepted ? "on" : "off"
			var accepted = it.accepted ? "on" : "off"
			return prevAccepted + '_to_' + accepted
		}

	</script>

</pp-pizzas>
