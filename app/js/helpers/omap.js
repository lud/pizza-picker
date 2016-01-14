module.exports = (o, f) => {
	let o2 = {}
	Object.keys(o).forEach(function(k){
		 o2[k] = f(o[k], k, o)
	})
	return o2
}
