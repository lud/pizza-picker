
module.exports = function interleave(list, glue) {
	if (list.length === 0) return []
	if (list.length === 1) return list[0]
	let newList = [list[0]], len = list.length, i
	for (i = 1; i < len; i++) {
		newList.push(glue)
		newList.push(list[i])
	}
	return newList
}
