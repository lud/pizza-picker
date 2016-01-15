import {status} from 'constants'
let get = require('helpers/get')
let interleave = require('helpers/interleave')
let m = require('mithril')
let morpheus = require('morpheus')


function make(api, store, opts) {
	let el = opts.container
	let view = {}
	store.change.add(_ => m.render(el, view.content()))
	view.content = function() {
		return m('div', [
			m('ul.ingredients', store.ingredients().map((ing, i) =>
				m('li', {'class': 'status-' + ing.status()}, [
					m('span', ing.name),
					m('a', {'class': 'yummy', onclick: e => api.toggleYummy.dispatch(ing)}, m.trust('^')),
					m('a', {'class': 'yuck', onclick: e => api.toggleYuck.dispatch(ing)}, 'x')
				])
			)),
			m('ul.filters', store.filters().map((filter, i) =>
				m('li', {}, [
					m('a', {onclick: e => api.toggleFilter.dispatch(filter)}, [
						m('span', m.trust(filter.status() === status.ENABLED ? '&#9745;' : '&#9744;')),
						' ',
						filter.name
					]),
				])
			)),
			m('ul.pizzas', store.pizzas().reverse().map((p, i) =>
				m('li', {key:p.name, config: fadeInOut(p, opts)}, [
					m('span', [p.name]),
					m('span', ' - '),
					m('span', ['score: ',p.score()]),
					m('span', ' - '),
					m('span', ['rank: ',p.prevRank(), ' => ', p.rank()]),
					m('span', ' - '),
					m('span', ['defaultOrder: ',p.defaultOrder]),
					m('span', ' - '),
					m('span', {'class': 'ingredients'}, [interleave(p.ingredients.map(ing => formatIngredient(ing, opts)), ' – ')])
				])
			)),
		])
	}
	return view
}

module.exports = {make}

function fadeInOut(pizza, opts) {
	return function(el, isInitialized, context, vEl) {
		let pHeight = opts.style.pizzaRowHeightPx
		let pMargin = opts.style.pizzaRowMarginPx
		let appearing = !isInitialized || !pizza.wasVisible() && pizza.visible()
		let disappearing = pizza.wasVisible() && !pizza.visible()
		let rankChanged = pizza.rank() !== pizza.prevRank()
		if (appearing) {
			el.style.height = 0
			el.style.opacity = 0
			morpheus([el], {
				height: pHeight,
				duration: 150,
				complete: function() {
					morpheus([el], {
						opacity: 1,
						duration: 150
					})
				}
			})
		} else if (disappearing) {
			morpheus([el], {
				opacity: 0,
				duration: 150,
				complete: function() {
					morpheus([el], {
						height: 0,
						duration: 150
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
				duration: 300,
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
