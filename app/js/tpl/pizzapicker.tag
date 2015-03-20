var get = require('helpers/get')

<pizzapicker>
	<pizzaslist store={ opts.store } actions={ opts.actions } />


		this.on('mount',function(){
	 		this.unsubscribe = opts.store.listen(this.update);
		})

</pizzapicker>


<pizzaslist>


	<table>
		<tr each={ pizzas }>
			<td>
				<pizzaheading>
					<p>{ name }</p>
					<p><small>{ inames() }</small></p>
				</pizzaheading>
			<td>
		</tr>
	</table>
		this.on('mount',function(){
	 		this.unsubscribe = opts.store.listen(this.update);
		})

		this.on('unmount', function(){
	 		this.unsubscribe()
		})

		this.on('update',function(state){
			this.pizzas = opts.store.getRankedPizzas()
			this.ingredients = opts.store.getIngredients()
		})

		function inames(ingredient) {
			return 'lol'
			console.log('ingredizent',ingredient)
			return ingredient.name
		}

</pizzaslist>

