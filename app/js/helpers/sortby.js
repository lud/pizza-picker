var get = require('helpers/get')

function sortBy() {
	var funs = Array.prototype.slice.call(arguments).map(function(callback){
		// substitute a string to a callback to define a property getter
		return (typeof callback === 'string') ? get(callback) : callback
	})
	return function(objA, objB) {
		var i = 0, f
		while(funs[i]) {
			f = funs[i]
			var a = f(objA), b = f(objB)
			if (a < b) return -1
			if (a > b) return 1
			// try another callback
			i += 1
		}
		return 0
	}
}

module.exports = sortBy
