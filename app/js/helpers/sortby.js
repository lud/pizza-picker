var get = require('helpers/get')

function maybeWrap(callback) {
	// substitute a string to a callback to define a property getter
	return (typeof callback === 'string') ? get(callback) : callback
}

function reverse(callback) {
	callback.__sortDesc = true
	return callback
}

function sortBy() {
	var funs = Array.prototype.slice.call(arguments).map(maybeWrap)
	var sorter = function(objA, objB) {
		// console.log('iter -----------')
		var i = 0, f
		while(funs[i]) {
			f = funs[i]
			// console.log('using fun ', i)
			var a, b
			if (f.__sortDesc) {
				b = f(objA)
				a = f(objB)
			} else {
				a = f(objA)
				b = f(objB)
			}
			// console.log('comparing ', a, b)
			// if (a < b) console.log('result ', -1, objA, objB)
			// if (a > b) console.log('result ', 1, objA, objB)
			if (a < b) return -1
			if (a > b) return 1
			// try another callback
			// console.log('equals')
			i += 1
		}
		return 0
	}
	sorter.desc = function(callback) {
		funs.push(reverse(maybeWrap(callback)))
		return sorter
	}
	sorter.asc = function(callback) {
		funs.push(maybeWrap(callback))
		return sorter
	}
	return sorter
}


// var test = [
// 	{x:2.5,key:3000,name:'dddd'},
// 	{x:2.5,key:4000,name:'cccc'},
// 	{x:3.5,key:2000,name:'bbbb'},
// 	{x:3.5,key:1000,name:'aaaa'}
// ]


// function dump(it) {
// 	return [it.key,it.name,'x='+it.x].join(':')
// }


// function ftest (code, expect) {
// 	// console.log('-------------------------------------')
// 	// console.log('test ' + code)
// 	var sorted = eval(code)
// 	// console.log(sorted.map(dump))
// 	var f1000 = x => x / 1000
// 	var result = sorted.map(get('key')).map(f1000).join('')
// 	if (result !== expect) {
// 		console.log('FAIL')
// 		console.log('expected ', expect)
// 		console.log('result ', result)
// 	}
// }

// ftest("test.sort(sortBy('key'))", '1234')
// ftest("test.sort(sortBy().asc('key'))", '1234')
// ftest("test.sort(sortBy().desc('x').desc('name'))", '2134')
// ftest("test.sort(sortBy().desc('x').asc('name'))", '1243')
// ftest("test.sort(sortBy('x').asc('name'))", '4312')
// ftest("test.sort(sortBy('x').desc('name'))", '3421')
// ftest("test.sort(sortBy('name').desc('x'))", '1243')


module.exports = sortBy
