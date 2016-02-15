import {status} from 'constants'
let call = require('helpers/call')
let get = require('helpers/get')
let interleave = require('helpers/interleave')
let m = require('mithril')

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
			{opts.sizes.map(size => (p.prices[size] && <li>&Oslash; {size + opts.sizeUnit} : {lc.formatPrice(p.prices[size])}</li>))
			}
		</ul>
	)
	elements.push(
		<div class="infos">
			<h3>{p.rank()} {p.name}</h3>
			<div class="ingredients">
				<p>{interleave(p.ingredients.map(ing => formatIngredient(ing, opts)), ', ')}</p>
			</div>
		</div>
	)

	let pHeight = opts.style.get().pizzaRowHeightPx
	let pMargin = opts.style.get().pizzaRowMarginPx
	let visible = p.visible()
	let rankChanged = p.rank() !== p.prevRank()
	let rank = p.rank()
	let top = visible
		? rank * (pHeight + pMargin)
		: 0
	let transform = 'translateY(' + top + 'px)'

	return <li key={p.id}  style={{transform: transform}} className={visible ? 'filter-in' : 'filter-out'}>
		{elements}
	</li>
}



function formatIngredient(ing, opts) {
	if (ing.status() === status.YUMMY) {
		return <span class="yummy">{ing.name}</span>
	} else {
		return <span>{ing.name}</span>
	}
}
