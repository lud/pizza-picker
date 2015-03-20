exports.ofCount = function(map) {
	return function (count) {
		count = Number(count)
		if (count === 0) return map['0'] || map['10'] || map['1']
		if (count === 1) return map['1'] || map['10'] || map['0']
		if (count === 1) return map['1'] || map.n
		else return map.n
	}
}
