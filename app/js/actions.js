
var Reflux = require('reflux')

module.exports = function(){
	var actions = Reflux.createActions([
		'setYummy', 'setYuck', 'toggleFilter'
	])
	actions.toggleFilter.sync = true
	return actions
}
