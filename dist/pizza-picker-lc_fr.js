/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 1. Define the namespace
	var lc = window.PizzaPicker.i18n.fr = {};
	var lang = __webpack_require__(12);
	
	// 3. Define the strings and functions
	lc.selected_pizzas_count = lang.ofCount({
		'0..1': function _(n) {
			return n + " Pizza sélectionnée";
		},
		n: function n(_n) {
			return _n + " Pizzas sélectionnées";
		}
	});
	lc.ingredients_menu = 'Filtrer par ingredients';
	lc.filters_menu = 'Filtrer par type';
	lc.show_menu = 'Choisir les ingrédients';
	lc.formatPrice = PizzaPicker.priceFormatter(2, ',', ' ', '%s €');

/***/ },

/***/ 12:
/***/ function(module, exports) {

	'use strict';
	
	exports.ofCount = function (map) {
		return function (count) {
			count = Number(count);
			if (count === 0) return (map['0'] || map['0..1'] || map['n'])(count);
			if (count === 1) return (map['1'] || map['0..1'] || map['n'])(count);else return map['n'](count);
		};
	};

/***/ }

/******/ });
//# sourceMappingURL=pizza-picker-lc_fr.js.map