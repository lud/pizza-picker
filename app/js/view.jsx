import {status} from 'constants'
let call = require('helpers/call')
let get = require('helpers/get')
let interleave = require('helpers/interleave')
let m = require('mithril')
let morpheus = require('morpheus')

function make(api, store, opts) {
	let el = opts.container
	let t = m.trust
	let originalClass = el.getAttribute('class')
	let containerClass = originalClass
		? (() => originalClass + ' pizza-picker picker-' + opts.style.get().device)
		: (() => 'pizza-picker picker-' + opts.style.get().device)

	let render = function(){
		el.setAttribute('class', containerClass())
		m.render(el, content())
	}

	// Listen to the store change events and render the view
	store.change.listen(render)

		// Get the content for the view
	function content() {
		let lc = PizzaPicker.i18n[opts.locale]
		return <div class={picker-opts.style.get().device}>
			<a onclick={api.toggleMenu}>{lc.show_menu}</a>
			<a onclick={api.toggleMenu} class="picker-bt-menu"></a>
			<div class="picker-menu">
				<h3>{lc.ingredients_menu}</h3>
				<ul class="ingredients">
					{store.ingredients().map((ing, i) =>
						<li class={'status-' + ing.status()}>
							<span>{ing.name}</span>
							<a class="yummy" onclick={e => api.toggleYummy(ing)}>
								{t('&#10084;')}
							</a>
							<a class="yuck" onclick={e => api.toggleYuck(ing)}>
								{t('&#10005;')}
							</a>
						</li>
					)}
				</ul>
				<h3>{lc.filters_menu}</h3>
				<ul class="filters">
					{store.filters().map((filter, i) =>
						<li class={filter.status() === status.ENABLED ? 'active' : void 0}>
							<a onclick={e => api.toggleFilter(filter)}>
								<span>{filter.status() === status.ENABLED ? t('&#9745;') : t('&#9744;')}</span>
								{' '}
								{filter.name}
								{' '}
								<span>({filter.hasHiddenPizzas()
								? (<span class={'filter-'+status.YUCK}>
									{filter.matchingPizzas().length} {filter.matchingPizzas().filter(call('visible')).length}
								</span>)
								: filter.matchingPizzas().length})</span>
							</a>
						</li>
					)}
				</ul>
			</div>
			<ul class="pizzas">
				{store.pizzas().reverse().map((p, i) => formatPizza(p, i, opts))}
			</ul>
		</div>
	}
}

module.exports = {make}

function formatPizza(p, index, opts) {
	let elements = [],
	    style = opts.style.get(),
	    lc = PizzaPicker.i18n[opts.locale]
	if (style.device !== 'smallest') {
		elements.push(
			<div class="img">
				<img src="http://fakeimg.pl/100x100/ffffff/" />
			</div>
		)
	}
	elements.push(
		<ul class="prices">
			{opts.sizes.map(size => p.prices.size
				? <li>&Oslash; {size + opts.sizeUnit} : {lc.formatPrice(p.prices[size])}</li>
				: void 0)
			}
		</ul>
	)
	elements.push(
		<div class="infos">
			<h3>{p.name}</h3>
			<div class="ingredients">
				<p>{interleave(p.ingredients.map(ing => formatIngredient(ing, opts)), ', ')}</p>
			</div>
		</div>
	)
	return <li key={p.id} config={fadeInOut(p, opts)}>
		{elements}
	</li>
}

function fadeInOut(pizza, opts) {

	let animDuration = 300

	return function(el, isInitialized, context, vEl) {
		let pHeight = opts.style.get().pizzaRowHeightPx
		let pMargin = opts.style.get().pizzaRowMarginPx
		let appearing = !isInitialized || !pizza.wasVisible() && pizza.visible()
		let disappearing = pizza.wasVisible() && !pizza.visible()
		let rankChanged = pizza.rank() !== pizza.prevRank()
		if (appearing) {
			console.log('appearing !')
			el.style.height = 0
			el.style.opacity = 0
			morpheus([el], {
				height: pHeight,
				duration: animDuration / 2,
				complete: function() {
					morpheus([el], {
						opacity: 1,
						duration: animDuration / 2
					})
				}
			})
		} else if (disappearing) {
			console.log('disappearing !')
			morpheus([el], {
				opacity: 0,
				duration: animDuration / 2,
				complete: function() {
					morpheus([el], {
						height: 0,
						duration: animDuration / 2
					})
				}
			})
		}
		// pizza has moved.
		if (appearing || pizza.visible() && rankChanged) {
			if (appearing) {
				el.style.top = 0 // allow the first move on load
			}
			let top = String(pizza.rank() * (pHeight + pMargin)) + 'px'
			morpheus([el], {
				top: top,
				duration: animDuration,
				complete: function() {
					el.style.top = top
				}
			})
		}
	}
}

function formatIngredient(ing, opts) {
	if (ing.status() === status.YUMMY) {
		return <span class="yummy">{ing.name}</span>
	} else {
		return <span>{ing.name}</span>
	}
}
