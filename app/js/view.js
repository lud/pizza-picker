import {status} from 'constants'
let call = require('helpers/call')
let get = require('helpers/get')
let interleave = require('helpers/interleave')
let m = require('mithril')
let morpheus = require('morpheus')

function make(api, store, opts) {
	let el = opts.container
	let view = {}
	let render = () => m.render(el, content())

	// listen to the resize changes anf
	api.windowResize.listen(render)

	// Listen to the store change events and render the view
	store.change.listen(render)

		// Get the content for the view
	function content() {
		return m('div', [
			m('ul.ingredients', store.ingredients().map((ing, i) =>
				m('li', {'class': 'status-' + ing.status()}, [
					m('span', ing.name),
					m('a', {'class': 'yummy', onclick: e => api.toggleYummy(ing)}, m.trust('&#10084;')),
					m('a', {'class': 'yuck', onclick: e => api.toggleYuck(ing)}, m.trust('&#10005;'))
				])
			)),
			m('ul.filters', store.filters().map((filter, i) =>
				m('li', {}, [
					m('a', {onclick: e => api.toggleFilter(filter)}, [
						m('span', m.trust(filter.status() === status.ENABLED ? '&#9745;' : '&#9744;')),
						' ',
						filter.name
					]),
					' ',
					m('span', ['(', filter.hasHiddenPizzas()
						? [m('span', {'class': 'filter-'+status.YUCK}, filter.matchingPizzas().length),' ',filter.matchingPizzas().filter(call('visible')).length]
						: filter.matchingPizzas().length
					 ,')'])
				])
			)),
			m('ul.pizzas', store.pizzas().reverse().map((p, i) => formatPizza(p, i, opts))),
		])
	}

	return view
}

module.exports = {make}


function formatPizza(p, index, opts) {
	let elements = [], style = opts.style.get()
	if (style.device !== 'smallest') {
		elements.push(m('div.img', m('img',{src:'http://fakeimg.pl/100x100/ffffff/'})))
	}
	elements.push(m('ul.prices', {'class': 'sizes'}, opts.sizes.map(function(size){
		if (p.prices[size]) {
			return m('li', [m.trust('&Oslash; '), size, opts.sizeUnit, ' : ', opts.formatPrice(p.prices[size])])
		}
	})))
	elements.push(m('div.infos', [
		m('h3', p.name),
		m('p', {'class': 'ingredients'}, [interleave(p.ingredients.map(ing => formatIngredient(ing, opts)), ', ')]),
	]))
	return m('li', {key: p.id, config: fadeInOut(p, opts)}, [elements])
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
		return m('span', {'class': 'yummy'}, ing.name)
	} else {
		return m('span', ing.name)
	}
}
