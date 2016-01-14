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
				m('li', {key:p.name, config: fadeInOut(p)}, [
					m('span', [p.name]),
					m('span', ' - '),
					m('span', [p.ingredients.map(get('name')).join(', ')])
				])
			)),
		])
	}
	return view
}

module.exports = {make}

function fadeInOut(pizza) {
	return function(el, isInitialized, context, vEl) {
		console.log('fadeInOut', arguments)
		console.log('pizza visible', pizza.visible())
		if (!pizza.wasVisible() && pizza.visible()) {
			// m.redraw.strategy('none')
			el.style.height = 0
			el.style.opacity = 0
			// m.startComputation()
			morpheus([el], {
				height: 30,
				duration: 150,
				complete: function() {
					morpheus([el], {
						opacity: 1,
						duration: 300,
						complete: function() {
							console.log('complete', arguments)
						}
					})
				}
			})
		}
		else if (pizza.wasVisible() && !pizza.visible()) {
			morpheus([el], {
				opacity: 0,
				duration: 150,
				complete: function() {
					morpheus([el], {
						height: 0,
						duration: 150,
						complete: function() {
							console.log('complete', arguments)
						}
					})
				}
			})
		}
	}
}
