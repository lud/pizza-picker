
module.exports = function(value, errorText) {
	let sprintfValues = Array.prototype.slice.call(arguments, 2)
	if (! value) {
		let text = errorText.replace(/%s/g, _ => sprintfValues.shift())
		throw new Error(text)
	}
}
