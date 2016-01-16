// This modules has a simple signal mechanism just like Reflux does.
//
// Just create a signal :
//
//     var signal = fsignal() // or fsignal({async: false})
//
// Then add listeners to the signal, with an optional context :
//
//     var id = signal.listen(function(name, age){
//         console.log('%s is % years old', name, age)
//     })
//
//     signal.listen(model.setNameAndAge, model)
//
// Remove a listener with the id returned from .listen()
//
//     signal.remove(id)
//
// Call the signal, wich is a function. You must pass an array as arguments for
// the listeners.
//
//     signal(['David', 69])
//
// log => "David is 69 years old"
//
// By default, the signal triggers asynchronously, this is reasonnable for
// flux architectures.

let assert = require('helpers/assert')
let extend = require('extend')

let defaults = () => ({
	async: true
})

module.exports = function fsignal(_opts) {
	let opts = extend(defaults(), _opts)
	let listeners = []
	let id = 0
	let llen = 0 // listeners.length

	let listen = function(fn, context) {
		assert(typeof fn === 'function', "No callback given")
		let listenerId = ++id
		let listener = {
			f: fn, c:context, id: listenerId
		}
		listeners.unshift(listener)
		llen = listeners.length
		return listenerId
	}

	let remove = function(id) {
		let i = llen
		while(i--) {
			if (listeners[i].id === id) {
				let listener = listeners[i]
				listeners.splice(i, 1)
				llen = listeners.length
				return listener.f // return the fn or something else ?
			}
		}
		return void 0
	}

	let calls = function(args) {
		let i = llen,
		    listener
		while(i--) {
			listener = listeners[i]
			listener.f.apply(listener.c, args)
		}
	}

	let trigger = (!opts.async) ? calls : function(args) {
		setTimeout(() => calls(args), 0)
	}

	trigger.listen = listen
	trigger.remove = remove

	return trigger
}
