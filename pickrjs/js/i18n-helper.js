
exports.ofCount = function(map) {
	return function (count) {
		count = Number(count)
		if (count === 0) return (map['0'] || map['0..1'] || map['n'])(count)
		if (count === 1) return (map['1'] || map['0..1'] || map['n'])(count)
		else return map['n'](count)
	}
}
