let m = require('mithril')
let get = require('helpers/get')
let morpheus = require('morpheus')


function make(api, store, opts) {
	let el = opts.container
	let view = {}
	store.listen(_ => m.render(el, view.content()))
	view.content = function() {
		return m('div', [
			m('ul.ingredients', store.ingredients().map((ing,i) =>
				m('li', {'class': 'status-' + ing.status()}, [
					m('span', ing.name),
					m('a', {'class': 'yummy', onclick: e => api.toggleYummy(ing)}, m.trust('^')),
					m('a', {'class': 'yuck', onclick: e => api.toggleYuck(ing)}, 'x')
				])
			)),
			m('ul.pizzas', store.pizzas().map((p,i) =>
				m('li', {key:p.name, config: fadeInOut(p, opts)}, [
					m('span', [p.name]),
					m('span', ' - '),
					m('span', ['score: ',p.score()]),
					m('span', ' - '),
					m('span', ['rank: ',p.prevRank(), ' => ', p.rank()]),
					m('span', ' - '),
					m('span', ['defaultOrder: ',p.defaultOrder]),
					m('span', ' - '),
					m('span', [p.ingredients.map(get('name')).join(', ')])
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
		if (appearing || pizza.visible() && rankChanged) {
			// pizza has moved.
			console.log('pizza move from %s to %s', pizza.prevRank(), pizza.rank())
			let top = String(pizza.rank() * (pHeight + pMargin)) + 'px'
			console.log(' - top = %s', top)
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
