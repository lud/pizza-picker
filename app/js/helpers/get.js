module.exports = function(k, undefined) {
	return function(o) {
		return o[k] || undefined
	}
}
