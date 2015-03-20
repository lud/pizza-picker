var get = require('helpers/get')

module.exports = function sortBy(callback) {
	var f = callback
	// si on a simplement passé une clé, la fonction a appeler sur l'objet
	// sert à récupérer la clé
	if (typeof callback === 'string') f = get(callback)
	return function(objA, objB) {
		var a = f(objA), b = f(objB)
		if (a < b) return -1
		if (a > b) return 1
		return 0
	}
}
