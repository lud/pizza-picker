
let id = it => it

// returns all own properties of an object
module.exports = function (o, f) {
	f = f || id
	return Object.keys(o).map(k => f(o[k], k))
}
