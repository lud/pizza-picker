
function insertVarAt(tpl, marker) {
	if (typeof tpl === 'function') return tpl
	var parts = fun.split(marker)
	return function () {

	}
}


exports.ofCount = function(_map) {
	var map = {}

	for(var k in _map) if (_map.hasOwnProperty(k)) {
		map[k] = insertVarAt(_map[k],'%1')
	}

	return function (count) {
		count = Number(count)
		if (count === 0) return (map['0'] || map['10'] || map['1'])(count)
		if (count === 1) return (map['1'] || map['10'] || map['0'])(count)
		if (count === 1) return (map['1'] || map.n)(count)
		else return map.n(count)
	}
}
