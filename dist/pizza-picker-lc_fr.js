/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	eval("// 1. Define the namespace\n\"use strict\";\n\nvar lc = window.PizzaPicker.i18n.fr = {};\nvar lang = __webpack_require__(15);\n\n// 3. Define the strings and functions\nlc.selected_pizzas = lang.ofCount({\n\t10: \"Pizza sélectionnée\",\n\tn: \"Pizzas sélectionnées\" });\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRTovbWluc3JjL3BpenphLXBpY2tlci9hcHAvanMvbGMvZnIuanM/ZmJhYiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRTtBQUN4QyxJQUFJLElBQUksR0FBRyxtQkFBTyxDQUFDLEVBQWEsQ0FBQzs7O0FBSWpDLEVBQUUsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUNqQyxHQUFFLEVBQUUsb0JBQW9CO0FBQ3hCLEVBQUMsRUFBRSxzQkFBc0IsRUFDekIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIDEuIERlZmluZSB0aGUgbmFtZXNwYWNlXG52YXIgbGMgPSB3aW5kb3cuUGl6emFQaWNrZXIuaTE4bi5mciA9IHt9XG52YXIgbGFuZyA9IHJlcXVpcmUoJ2kxOG4taGVscGVyJylcblxuXG4vLyAzLiBEZWZpbmUgdGhlIHN0cmluZ3MgYW5kIGZ1bmN0aW9uc1xubGMuc2VsZWN0ZWRfcGl6emFzID0gbGFuZy5vZkNvdW50KHtcblx0MTA6IFwiUGl6emEgc8OpbGVjdGlvbm7DqWVcIixcblx0bjogXCJQaXp6YXMgc8OpbGVjdGlvbm7DqWVzXCIsXG59KVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRTovbWluc3JjL3BpenphLXBpY2tlci9hcHAvanMvbGMvZnIuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiIwLmpzIn0=");

/***/ },

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	eval("\"use strict\";\n\nexports.ofCount = function (map) {\n\treturn function (count) {\n\t\tcount = Number(count);\n\t\tif (count === 0) return map[\"0\"] || map[\"10\"] || map[\"1\"];\n\t\tif (count === 1) return map[\"1\"] || map[\"10\"] || map[\"0\"];\n\t\tif (count === 1) return map[\"1\"] || map.n;else return map.n;\n\t};\n};\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRTovbWluc3JjL3BpenphLXBpY2tlci9hcHAvanMvaTE4bi1oZWxwZXIuanM/ZmUxYyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sQ0FBQyxPQUFPLEdBQUcsVUFBUyxHQUFHLEVBQUU7QUFDL0IsUUFBTyxVQUFVLEtBQUssRUFBRTtBQUN2QixPQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNyQixNQUFJLEtBQUssS0FBSyxDQUFDLEVBQUUsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7QUFDekQsTUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO0FBQ3pELE1BQUksS0FBSyxLQUFLLENBQUMsRUFBRSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUNwQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0VBQ2pCO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzLm9mQ291bnQgPSBmdW5jdGlvbihtYXApIHtcblx0cmV0dXJuIGZ1bmN0aW9uIChjb3VudCkge1xuXHRcdGNvdW50ID0gTnVtYmVyKGNvdW50KVxuXHRcdGlmIChjb3VudCA9PT0gMCkgcmV0dXJuIG1hcFsnMCddIHx8IG1hcFsnMTAnXSB8fCBtYXBbJzEnXVxuXHRcdGlmIChjb3VudCA9PT0gMSkgcmV0dXJuIG1hcFsnMSddIHx8IG1hcFsnMTAnXSB8fCBtYXBbJzAnXVxuXHRcdGlmIChjb3VudCA9PT0gMSkgcmV0dXJuIG1hcFsnMSddIHx8IG1hcC5uXG5cdFx0ZWxzZSByZXR1cm4gbWFwLm5cblx0fVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRTovbWluc3JjL3BpenphLXBpY2tlci9hcHAvanMvaTE4bi1oZWxwZXIuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiIxNS5qcyJ9");

/***/ }

/******/ });