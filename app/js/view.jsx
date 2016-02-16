import {status} from 'constants'
let call = require('helpers/call')
let get = require('helpers/get')
let interleave = require('helpers/interleave')
let m = require('mithril')

function make(api, store, opts) {
	let el = opts.container
	let t = m.trust

	let render = function(){
		let ct = content()
		console.log('render pizzas')
		ct.children[1].children[0].map(li => console.log(' - ', li.attrs.key))
		m.render(el, ct)
	}

	// Listen to the store change events and render the view
	store.change.listen(render)

	let menuActive = false
	// Listen to the view changes
	api.toggleMenu.listen(() => {menuActive = !menuActive; render()})

		// Get the content for the view
	function content() {
		let lc = PizzaPicker.i18n[opts.locale]
		return <div class={opts.style.get().wrapperCssClass + ' ' + (menuActive?'view-menu':'view-pizzas')}>
			<div class="picker-menu">
				<div class="picker-menu-toggle">
					<a onclick={api.toggleMenu}>{lc.show_menu}</a>
					<a onclick={api.toggleMenu} class="picker-bt-menu">
						<span class="bt-top" />
						<span class="bt-middle" />
						<span class="bt-bottom" />
					</a>
				</div>
				<h3>{lc.ingredients_menu}</h3>
				<ul class="picker-ingredients">
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
				<ul class="picker-filters">
					{store.filters().map((filter, i) =>
						<li class={filter.status() === status.ENABLED ? 'on' : 'off'}>
							<a onclick={e => api.toggleFilter(filter)}>
								<span>{filter.status() === status.ENABLED ? t('&#9745;') : t('&#9744;')}</span>
								{' '}
								{filter.name}
								{' '}
								<span>({filter.hasHiddenPizzas()
								? <span>
										<span class={'filter-'+status.YUCK}>
											{filter.matchingPizzas().length}
										</span>
										{' '}
										{filter.matchingPizzas().filter(call('visible')).length}
								</span>
								: filter.matchingPizzas().length})</span>
							</a>
						</li>
					)}
				</ul>
			</div>
			<ul class="picker-pizzas">
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
	if (style.renderImages) {
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

	let pHeight = opts.style.get().pizzaRowHeightPx
	let pMargin = opts.style.get().pizzaRowMarginPx
	let visible = p.visible()
	let rankChanged = p.rank() !== p.prevRank()
	let rank = p.rank()
	let top = visible
		? rank * (pHeight + pMargin)
		: 0
	let transform = 'translate(0,' + top + 'px)'
	let className = (visible && p.wasVisible()) ? 'filter-move' : visible ? 'filter-in' : 'filter-out'

			// <h3>{className} {transform}</h3>
	elements.push(
		<div class="infos">
			<h3>{p.rank()} {p.name}</h3>
			<div class="ingredients">
				<p>{interleave(p.ingredients.map(ing => formatIngredient(ing, opts)), ', ')}</p>
			</div>
		</div>
	)

	// let colorSlice = (255 / 10)
	// let debugColorInt =  Math.floor(colorSlice * (10 - p.id))
	// console.log('sliece', debugColorInt)
	// let debugColor = 'rgb(%s,%s,%s)' . replace(/%s/g, debugColorInt)

	return <li key={p.id}  style={{transform: transform, /* background: debugColor */}} className={className}>
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
