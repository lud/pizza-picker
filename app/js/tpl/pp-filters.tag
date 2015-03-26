var extend = require('extend')
var status = require('constants').status


<pp-filters>

	<div class="pizza-picker">
		<ul>
			<li each={ key, filter in filters } class={ parent.filterCssClass(key, filter) }>
				<a href={ url } onclick={ parent.toggleFilter }>{ filter.name }</a>
			</li>
		</ul>
	</div>

	<script>

		console.log('filter opts', opts)

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

		this.toggleFilter = function(evt) {
			actions.toggleFilter(this.key)
		}

		// view helpers -------------------------------------------------------

		this.filterCssClass = function(key, filter) {
			return ('filter-' + key
				+ (filter.active ? ' active' : '')
			)
		}

	</script>

</pp-filters>
