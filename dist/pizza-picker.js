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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(4);
	var formatPrice = __webpack_require__(9);
	var fsignal = __webpack_require__(2);
	var storeFactory = __webpack_require__(16);
	var viewFactory = __webpack_require__(17);
	var respdata = __webpack_require__(15);
	
	// app
	var PizzaPicker = { i18n: {} };
	window.PizzaPicker = PizzaPicker;
	window.m = __webpack_require__(5);
	
	PizzaPicker.create = function (_opts) {
		var opts = setDefaultOpts(_opts);
		var api = {
			'toggleYummy': fsignal(),
			'toggleYuck': fsignal(),
			'toggleFilter': fsignal(),
			'windowResize': fsignal({ async: false }),
			'toggleMenu': fsignal()
		};
		var store = storeFactory.make(api, opts);
		opts.style = respdata(opts.style, api.windowResize);
		viewFactory.make(api, store, opts);
		store.init();
		return api;
	};
	
	PizzaPicker.filter = {
		taggedOnly: function taggedOnly(tag) {
			// keeps only the pizza if it has the tag
			return pizzaHasTagFun(tag, true);
		},
		hideTagged: function hideTagged(tag) {
			// keeps only the pizza if it has NOT the tag
			return pizzaHasTagFun(tag, false);
		}
	};
	
	function pizzaHasTagFun(tag, ret) {
		return function (pizza) {
			return pizza.tagged(tag) ? ret : !ret;
		};
	}
	
	function setDefaultOpts(opts) {
		return extend({
			container: 'pizzapicker',
			events: {},
			filters: {},
			ingredients: {},
			locale: 'en',
			pizzas: [],
			prices: [],
			renderFilters: true,
			renderIngredients: true,
			renderPizzas: true,
			// Styles makes use of responsive-data system
			style: [{
				minWidth: 768,
				data: {
					renderImages: true,
					wrapperCssClass: 'pizza-picker',
					pizzaRowHeightPx: 100,
					pizzaRowMarginPx: 5
				}
			}, {
				minWidth: 480,
				data: {
					renderImages: true,
					wrapperCssClass: 'pizza-picker picker-swapmenu',
					pizzaRowHeightPx: 100,
					pizzaRowMarginPx: 5
				}
			},
			// this is the default with no constraint. It is specified last
			// because we select the fist matching constraints and this one has
			// no constraint to match (matches all cases)
			{
				data: {
					renderImages: false,
					wrapperCssClass: 'pizza-picker picker-swapmenu',
					pizzaRowHeightPx: 100,
					pizzaRowMarginPx: 5
				}
			}]
		}, opts);
	}
	
	// export the price formatter for the i18n files
	PizzaPicker.priceFormatter = formatPrice.formatter;

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	(function (root, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
			module.exports = factory(require('helpers/assert'), require());
		} else {
			throw new Error('not available without build');
			root.returnExports = factory();
		}
	})(undefined, function (assert, extend) {
	
		// This modules has a simple signal mechanism just like Reflux does.
		//
		// Just create a signal :
		//
		//     var signal = fsignal() // or fsignal({async: false})
		//
		// Then add listeners to the signal, with an optional context :
		//
		//     var id = signal.listen(function(name, age){
		//         console.log('%s is % years old', name, age)
		//     })
		//
		//     signal.listen(model.setNameAndAge, model)
		//
		// Remove a listener with the id returned from .listen()
		//
		//     signal.remove(id)
		//
		// Call the signal, wich is a function. You can pass arguments for the
		// listeners.
		//
		//     signal('David', 69)
		//
		// log => "David is 69 years old"
		//
		// By default, the signal triggers asynchronously, this is reasonnable for
		// flux architectures.
	
		var defaults = function defaults() {
			return {
				async: true
			};
		};
	
		return function fsignal(_opts) {
			var opts = extend(defaults(), _opts);
			var listeners = [];
			var id = 0;
			var llen = 0; // listeners.length
	
			var remove = function remove(id) {
				var i = llen;
				while (i--) {
					if (listeners[i].id === id) {
						var listener = listeners[i];
						listeners.splice(i, 1);
						llen = listeners.length;
						return listener.f; // return the fn or something else ?
					}
				}
				return void 0;
			};
	
			var listen = function listen(fn, context) {
				assert(typeof fn === 'function', "Signal listener must be a function, %s given", typeof fn === 'undefined' ? 'undefined' : _typeof(fn));
				var listenerId = ++id;
				var listener = {
					f: fn, c: context, id: listenerId
				};
				listeners.unshift(listener);
				llen = listeners.length;
				return function () {
					remove(listenerId);
				};
			};
	
			var calls = function calls() {
				// if (opts.async) {
				// console.log('calling with opts.async', opts.async)
				// console.log(listeners)
				// }
				var i = llen,
				    listener = undefined;
				while (i--) {
					listener = listeners[i];
					listener.f.apply(listener.c, arguments);
				}
			};
	
			var trigger = !opts.async ? calls : function () {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				setTimeout(function () {
					return calls.apply(null, args);
				}, 0);
			};
	
			trigger.listen = listen;
			trigger.remove = remove;
	
			return trigger;
		};
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (k) {
	  return function (o) {
	    return o[k];
	  };
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	var hasOwn = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	
	var isArray = function isArray(arr) {
		if (typeof Array.isArray === 'function') {
			return Array.isArray(arr);
		}
	
		return toStr.call(arr) === '[object Array]';
	};
	
	var isPlainObject = function isPlainObject(obj) {
		if (!obj || toStr.call(obj) !== '[object Object]') {
			return false;
		}
	
		var hasOwnConstructor = hasOwn.call(obj, 'constructor');
		var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
		// Not own constructor property must be Object
		if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
			return false;
		}
	
		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		var key;
		for (key in obj) {/**/}
	
		return typeof key === 'undefined' || hasOwn.call(obj, key);
	};
	
	module.exports = function extend() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0],
			i = 1,
			length = arguments.length,
			deep = false;
	
		// Handle a deep copy situation
		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
			target = {};
		}
	
		for (; i < length; ++i) {
			options = arguments[i];
			// Only deal with non-null/undefined values
			if (options != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];
	
					// Prevent never-ending loop
					if (target !== copy) {
						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && isArray(src) ? src : [];
							} else {
								clone = src && isPlainObject(src) ? src : {};
							}
	
							// Never move original objects, clone them
							target[name] = extend(deep, clone, copy);
	
						// Don't bring in undefined values
						} else if (typeof copy !== 'undefined') {
							target[name] = copy;
						}
					}
				}
			}
		}
	
		// Return the modified object
		return target;
	};
	


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {var m = (function app(window, undefined) {
		"use strict";
	  	var VERSION = "v0.2.2-rc.1";
		function isFunction(object) {
			return typeof object === "function";
		}
		function isObject(object) {
			return type.call(object) === "[object Object]";
		}
		function isString(object) {
			return type.call(object) === "[object String]";
		}
		var isArray = Array.isArray || function (object) {
			return type.call(object) === "[object Array]";
		};
		var type = {}.toString;
		var parser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[.+?\])/g, attrParser = /\[(.+?)(?:=("|'|)(.*?)\2)?\]/;
		var voidElements = /^(AREA|BASE|BR|COL|COMMAND|EMBED|HR|IMG|INPUT|KEYGEN|LINK|META|PARAM|SOURCE|TRACK|WBR)$/;
		var noop = function () {};
	
		// caching commonly used variables
		var $document, $location, $requestAnimationFrame, $cancelAnimationFrame;
	
		// self invoking function needed because of the way mocks work
		function initialize(window) {
			$document = window.document;
			$location = window.location;
			$cancelAnimationFrame = window.cancelAnimationFrame || window.clearTimeout;
			$requestAnimationFrame = window.requestAnimationFrame || window.setTimeout;
		}
	
		initialize(window);
	
		m.version = function() {
			return VERSION;
		};
	
		/**
		 * @typedef {String} Tag
		 * A string that looks like -> div.classname#id[param=one][param2=two]
		 * Which describes a DOM node
		 */
	
		/**
		 *
		 * @param {Tag} The DOM node tag
		 * @param {Object=[]} optional key-value pairs to be mapped to DOM attrs
		 * @param {...mNode=[]} Zero or more Mithril child nodes. Can be an array, or splat (optional)
		 *
		 */
		function m(tag, pairs) {
			for (var args = [], i = 1; i < arguments.length; i++) {
				args[i - 1] = arguments[i];
			}
			if (isObject(tag)) return parameterize(tag, args);
			var hasAttrs = pairs != null && isObject(pairs) && !("tag" in pairs || "view" in pairs || "subtree" in pairs);
			var attrs = hasAttrs ? pairs : {};
			var classAttrName = "class" in attrs ? "class" : "className";
			var cell = {tag: "div", attrs: {}};
			var match, classes = [];
			if (!isString(tag)) throw new Error("selector in m(selector, attrs, children) should be a string");
			while ((match = parser.exec(tag)) != null) {
				if (match[1] === "" && match[2]) cell.tag = match[2];
				else if (match[1] === "#") cell.attrs.id = match[2];
				else if (match[1] === ".") classes.push(match[2]);
				else if (match[3][0] === "[") {
					var pair = attrParser.exec(match[3]);
					cell.attrs[pair[1]] = pair[3] || (pair[2] ? "" :true);
				}
			}
	
			var children = hasAttrs ? args.slice(1) : args;
			if (children.length === 1 && isArray(children[0])) {
				cell.children = children[0];
			}
			else {
				cell.children = children;
			}
	
			for (var attrName in attrs) {
				if (attrs.hasOwnProperty(attrName)) {
					if (attrName === classAttrName && attrs[attrName] != null && attrs[attrName] !== "") {
						classes.push(attrs[attrName]);
						cell.attrs[attrName] = ""; //create key in correct iteration order
					}
					else cell.attrs[attrName] = attrs[attrName];
				}
			}
			if (classes.length) cell.attrs[classAttrName] = classes.join(" ");
	
			return cell;
		}
		function forEach(list, f) {
			for (var i = 0; i < list.length && !f(list[i], i++);) {}
		}
		function forKeys(list, f) {
			forEach(list, function (attrs, i) {
				return (attrs = attrs && attrs.attrs) && attrs.key != null && f(attrs, i);
			});
		}
		// This function was causing deopts in Chrome.
		function dataToString(data) {
			//data.toString() might throw or return null if data is the return value of Console.log in Firefox (behavior depends on version)
			try {
				if (data == null || data.toString() == null) return "";
			} catch (e) {
				return "";
			}
			return data;
		}
		// This function was causing deopts in Chrome.
		function injectTextNode(parentElement, first, index, data) {
			try {
				insertNode(parentElement, first, index);
				first.nodeValue = data;
			} catch (e) {} //IE erroneously throws error when appending an empty text node after a null
		}
	
		function flatten(list) {
			//recursively flatten array
			for (var i = 0; i < list.length; i++) {
				if (isArray(list[i])) {
					list = list.concat.apply([], list);
					//check current index again and flatten until there are no more nested arrays at that index
					i--;
				}
			}
			return list;
		}
	
		function insertNode(parentElement, node, index) {
			parentElement.insertBefore(node, parentElement.childNodes[index] || null);
		}
	
		var DELETION = 1, INSERTION = 2, MOVE = 3;
	
		function handleKeysDiffer(data, existing, cached, parentElement) {
			console.log('existing before', existing)
			forKeys(data, function (key, i) {
				existing[key = key.key] = existing[key] ? {
					action: MOVE,
					index: i,
					from: existing[key].index,
					element: cached.nodes[existing[key].index] || $document.createElement("div")
				} : {action: INSERTION, index: i};
			});
			console.log('existing after', existing)
			var actions = [];
			for (var prop in existing) actions.push(existing[prop]);
			var changes = actions.sort(sortChanges), newCached = new Array(cached.length);
			newCached.nodes = cached.nodes.slice();
	
			forEach(changes, function (change) {
				var index = change.index;
				if (change.action === DELETION) {
					clear(cached[index].nodes, cached[index]);
					newCached.splice(index, 1);
				}
				if (change.action === INSERTION) {
					var dummy = $document.createElement("div");
					dummy.key = data[index].attrs.key;
					insertNode(parentElement, dummy, index);
					newCached.splice(index, 0, {
						attrs: {key: data[index].attrs.key},
						nodes: [dummy]
					});
					newCached.nodes[index] = dummy;
				}
	
				if (change.action === MOVE) {
					var changeElement = change.element;
					var maybeChanged = parentElement.childNodes[index];
					if (maybeChanged !== changeElement && changeElement !== null) {
						parentElement.insertBefore(changeElement, maybeChanged || null);
					}
					newCached[index] = cached[change.from];
					newCached.nodes[index] = changeElement;
				}
			});
	
			return newCached;
		}
	
		function diffKeys(data, cached, existing, parentElement) {
			var keysDiffer = data.length !== cached.length;
			if (!keysDiffer) {
				forKeys(data, function (attrs, i) {
					var cachedCell = cached[i];
					return keysDiffer = cachedCell && cachedCell.attrs && cachedCell.attrs.key !== attrs.key;
				});
			}
	
			return keysDiffer ? handleKeysDiffer(data, existing, cached, parentElement) : cached;
		}
	
		function diffArray(data, cached, nodes) {
			//diff the array itself
	
			//update the list of DOM nodes by collecting the nodes from each item
			forEach(data, function (_, i) {
				if (cached[i] != null) nodes.push.apply(nodes, cached[i].nodes);
			})
			//remove items from the end of the array if the new array is shorter than the old one. if errors ever happen here, the issue is most likely
			//a bug in the construction of the `cached` data structure somewhere earlier in the program
			forEach(cached.nodes, function (node, i) {
				if (node.parentNode != null && nodes.indexOf(node) < 0) clear([node], [cached[i]]);
			})
			if (data.length < cached.length) cached.length = data.length;
			cached.nodes = nodes;
		}
	
		function buildArrayKeys(data) {
			var guid = 0;
			forKeys(data, function () {
				forEach(data, function (attrs) {
					if ((attrs = attrs && attrs.attrs) && attrs.key == null) attrs.key = "__mithril__" + guid++;
				})
				return 1;
			});
		}
	
		function maybeRecreateObject(data, cached, dataAttrKeys) {
			//if an element is different enough from the one in cache, recreate it
			if (data.tag !== cached.tag ||
					dataAttrKeys.sort().join() !== Object.keys(cached.attrs).sort().join() ||
					data.attrs.id !== cached.attrs.id ||
					data.attrs.key !== cached.attrs.key ||
					(m.redraw.strategy() === "all" && (!cached.configContext || cached.configContext.retain !== true)) ||
					(m.redraw.strategy() === "diff" && cached.configContext && cached.configContext.retain === false)) {
				if (cached.nodes.length) clear(cached.nodes);
				if (cached.configContext && isFunction(cached.configContext.onunload)) cached.configContext.onunload();
				if (cached.controllers) {
					forEach(cached.controllers, function (controller) {
						if (controller.unload) controller.onunload({preventDefault: noop});
					});
				}
			}
		}
	
		function getObjectNamespace(data, namespace) {
			return data.attrs.xmlns ? data.attrs.xmlns :
				data.tag === "svg" ? "http://www.w3.org/2000/svg" :
				data.tag === "math" ? "http://www.w3.org/1998/Math/MathML" :
				namespace;
		}
	
		function unloadCachedControllers(cached, views, controllers) {
			if (controllers.length) {
				cached.views = views;
				cached.controllers = controllers;
				forEach(controllers, function (controller) {
					if (controller.onunload && controller.onunload.$old) controller.onunload = controller.onunload.$old;
					if (pendingRequests && controller.onunload) {
						var onunload = controller.onunload;
						controller.onunload = noop;
						controller.onunload.$old = onunload;
					}
				});
			}
		}
	
		function scheduleConfigsToBeCalled(configs, data, node, isNew, cached) {
			//schedule configs to be called. They are called after `build`
			//finishes running
			if (isFunction(data.attrs.config)) {
				var context = cached.configContext = cached.configContext || {};
	
				//bind
				configs.push(function() {
					return data.attrs.config.call(data, node, !isNew, context, cached);
				});
			}
		}
	
		function buildUpdatedNode(cached, data, editable, hasKeys, namespace, views, configs, controllers) {
			var node = cached.nodes[0];
			if (hasKeys) setAttributes(node, data.tag, data.attrs, cached.attrs, namespace);
			cached.children = build(node, data.tag, undefined, undefined, data.children, cached.children, false, 0, data.attrs.contenteditable ? node : editable, namespace, configs);
			cached.nodes.intact = true;
	
			if (controllers.length) {
				cached.views = views;
				cached.controllers = controllers;
			}
	
			return node;
		}
	
		function handleNonexistentNodes(data, parentElement, index) {
			var nodes;
			if (data.$trusted) {
				nodes = injectHTML(parentElement, index, data);
			}
			else {
				nodes = [$document.createTextNode(data)];
				if (!parentElement.nodeName.match(voidElements)) insertNode(parentElement, nodes[0], index);
			}
	
			var cached = typeof data === "string" || typeof data === "number" || typeof data === "boolean" ? new data.constructor(data) : data;
			cached.nodes = nodes;
			return cached;
		}
	
		function reattachNodes(data, cached, parentElement, editable, index, parentTag) {
			var nodes = cached.nodes;
			if (!editable || editable !== $document.activeElement) {
				if (data.$trusted) {
					clear(nodes, cached)
					nodes = injectHTML(parentElement, index, data)
				} else if (parentTag === "textarea") {
					// <textarea> uses `value` instead of `nodeValue`.
					parentElement.value = data
				} else if (editable) {
					// contenteditable nodes use `innerHTML` instead of `nodeValue`.
					editable.innerHTML = data
				} else {
					// was a trusted string
					if (nodes[0].nodeType === 1 || nodes.length > 1 || (nodes[0].nodeValue.trim && !nodes[0].nodeValue.trim())) {
						clear(cached.nodes, cached)
						nodes = [$document.createTextNode(data)]
					}
					injectTextNode(parentElement, nodes[0], index, data);
				}
			}
			cached = new data.constructor(data);
			cached.nodes = nodes;
			return cached;
		}
	
		function handleText(cached, data, index, parentElement, shouldReattach, editable, parentTag) {
			//handle text nodes
			return cached.nodes.length === 0 ? handleNonexistentNodes(data, parentElement, index) :
				cached.valueOf() !== data.valueOf() || shouldReattach === true ?
					reattachNodes(data, cached, parentElement, editable, index, parentTag) :
				(cached.nodes.intact = true, cached);
		}
	
		function getSubArrayCount(item) {
			if (item.$trusted) {
				//fix offset of next element if item was a trusted string w/ more than one html element
				//the first clause in the regexp matches elements
				//the second clause (after the pipe) matches text nodes
				var match = item.match(/<[^\/]|\>\s*[^<]/g);
				if (match != null) return match.length;
			}
			else if (isArray(item)) {
				return item.length;
			}
			return 1;
		}
	
		function buildArray(data, cached, parentElement, index, parentTag, shouldReattach, editable, namespace, configs) {
			data = flatten(data);
			var nodes = [], intact = cached.length === data.length, subArrayCount = 0;
	
			//keys algorithm: sort elements without recreating them if keys are present
			//1) create a map of all existing keys, and mark all for deletion
			//2) add new keys to map and mark them for addition
			//3) if key exists in new list, change action from deletion to a move
			//4) for each key, handle its corresponding action as marked in previous steps
			var existing = {}, shouldMaintainIdentities = false;
			forKeys(cached, function (attrs, i) {
				shouldMaintainIdentities = true;
				existing[cached[i].attrs.key] = {action: DELETION, index: i};
			});
	
			buildArrayKeys(data);
			if (shouldMaintainIdentities) cached = diffKeys(data, cached, existing, parentElement);
			//end key algorithm
	
			var cacheCount = 0;
			//faster explicitly written
			for (var i = 0, len = data.length; i < len; i++) {
				//diff each item in the array
				var item = build(parentElement, parentTag, cached, index, data[i], cached[cacheCount], shouldReattach, index + subArrayCount || subArrayCount, editable, namespace, configs);
	
				if (item !== undefined) {
					intact = intact && item.nodes.intact;
					subArrayCount += getSubArrayCount(item);
					cached[cacheCount++] = item;
				}
			}
	
			if (!intact) diffArray(data, cached, nodes);
			return cached
		}
	
		function makeCache(data, cached, index, parentIndex, parentCache) {
			if (cached != null) {
				if (type.call(cached) === type.call(data)) return cached;
	
				if (parentCache && parentCache.nodes) {
					var offset = index - parentIndex, end = offset + (isArray(data) ? data : cached.nodes).length;
					clear(parentCache.nodes.slice(offset, end), parentCache.slice(offset, end));
				} else if (cached.nodes) {
					clear(cached.nodes, cached);
				}
			}
	
			cached = new data.constructor();
			//if constructor creates a virtual dom element, use a blank object
			//as the base cached node instead of copying the virtual el (#277)
			if (cached.tag) cached = {};
			cached.nodes = [];
			return cached;
		}
	
		function constructNode(data, namespace) {
			return namespace === undefined ?
				data.attrs.is ? $document.createElement(data.tag, data.attrs.is) : $document.createElement(data.tag) :
				data.attrs.is ? $document.createElementNS(namespace, data.tag, data.attrs.is) : $document.createElementNS(namespace, data.tag);
		}
	
		function constructAttrs(data, node, namespace, hasKeys) {
			return hasKeys ? setAttributes(node, data.tag, data.attrs, {}, namespace) : data.attrs;
		}
	
		function constructChildren(data, node, cached, editable, namespace, configs) {
			return data.children != null && data.children.length > 0 ?
				build(node, data.tag, undefined, undefined, data.children, cached.children, true, 0, data.attrs.contenteditable ? node : editable, namespace, configs) :
				data.children;
		}
	
		function reconstructCached(data, attrs, children, node, namespace, views, controllers) {
			var cached = {tag: data.tag, attrs: attrs, children: children, nodes: [node]};
			unloadCachedControllers(cached, views, controllers);
			if (cached.children && !cached.children.nodes) cached.children.nodes = [];
			//edge case: setting value on <select> doesn't work before children exist, so set it again after children have been created
			if (data.tag === "select" && "value" in data.attrs) setAttributes(node, data.tag, {value: data.attrs.value}, {}, namespace);
			return cached
		}
	
		function getController(views, view, cachedControllers, controller) {
			var controllerIndex = m.redraw.strategy() === "diff" && views ? views.indexOf(view) : -1;
			return controllerIndex > -1 ? cachedControllers[controllerIndex] :
				typeof controller === "function" ? new controller() : {};
		}
	
		function updateLists(views, controllers, view, controller) {
			if (controller.onunload != null) unloaders.push({controller: controller, handler: controller.onunload});
			views.push(view);
			controllers.push(controller);
		}
	
		function checkView(data, view, cached, cachedControllers, controllers, views) {
			var controller = getController(cached.views, view, cachedControllers, data.controller);
			//Faster to coerce to number and check for NaN
			var key = +(data && data.attrs && data.attrs.key);
			data = pendingRequests === 0 || forcing || cachedControllers && cachedControllers.indexOf(controller) > -1 ? data.view(controller) : {tag: "placeholder"};
			if (data.subtree === "retain") return cached;
			if (key === key) (data.attrs = data.attrs || {}).key = key;
			updateLists(views, controllers, view, controller);
			return data;
		}
	
		function markViews(data, cached, views, controllers) {
			var cachedControllers = cached && cached.controllers;
			while (data.view != null) data = checkView(data, data.view.$original || data.view, cached, cachedControllers, controllers, views);
			return data;
		}
	
		function buildObject(data, cached, editable, parentElement, index, shouldReattach, namespace, configs) {
			var views = [], controllers = [];
			data = markViews(data, cached, views, controllers);
			if (!data.tag && controllers.length) throw new Error("Component template must return a virtual element, not an array, string, etc.");
			data.attrs = data.attrs || {};
			cached.attrs = cached.attrs || {};
			var dataAttrKeys = Object.keys(data.attrs);
			var hasKeys = dataAttrKeys.length > ("key" in data.attrs ? 1 : 0);
			maybeRecreateObject(data, cached, dataAttrKeys);
			if (!isString(data.tag)) return;
			var isNew = cached.nodes.length === 0;
			namespace = getObjectNamespace(data, namespace);
			var node;
			if (isNew) {
				node = constructNode(data, namespace);
				//set attributes first, then create children
				var attrs = constructAttrs(data, node, namespace, hasKeys)
				var children = constructChildren(data, node, cached, editable, namespace, configs);
				cached = reconstructCached(data, attrs, children, node, namespace, views, controllers);
			}
			else {
				node = buildUpdatedNode(cached, data, editable, hasKeys, namespace, views, configs, controllers);
			}
			if (isNew || shouldReattach === true && node != null) insertNode(parentElement, node, index);
			//schedule configs to be called. They are called after `build`
			//finishes running
			scheduleConfigsToBeCalled(configs, data, node, isNew, cached);
			return cached
		}
	
		function build(parentElement, parentTag, parentCache, parentIndex, data, cached, shouldReattach, index, editable, namespace, configs) {
			//`build` is a recursive function that manages creation/diffing/removal
			//of DOM elements based on comparison between `data` and `cached`
			//the diff algorithm can be summarized as this:
			//1 - compare `data` and `cached`
			//2 - if they are different, copy `data` to `cached` and update the DOM
			//    based on what the difference is
			//3 - recursively apply this algorithm for every array and for the
			//    children of every virtual element
	
			//the `cached` data structure is essentially the same as the previous
			//redraw's `data` data structure, with a few additions:
			//- `cached` always has a property called `nodes`, which is a list of
			//   DOM elements that correspond to the data represented by the
			//   respective virtual element
			//- in order to support attaching `nodes` as a property of `cached`,
			//   `cached` is *always* a non-primitive object, i.e. if the data was
			//   a string, then cached is a String instance. If data was `null` or
			//   `undefined`, cached is `new String("")`
			//- `cached also has a `configContext` property, which is the state
			//   storage object exposed by config(element, isInitialized, context)
			//- when `cached` is an Object, it represents a virtual element; when
			//   it's an Array, it represents a list of elements; when it's a
			//   String, Number or Boolean, it represents a text node
	
			//`parentElement` is a DOM element used for W3C DOM API calls
			//`parentTag` is only used for handling a corner case for textarea
			//values
			//`parentCache` is used to remove nodes in some multi-node cases
			//`parentIndex` and `index` are used to figure out the offset of nodes.
			//They're artifacts from before arrays started being flattened and are
			//likely refactorable
			//`data` and `cached` are, respectively, the new and old nodes being
			//diffed
			//`shouldReattach` is a flag indicating whether a parent node was
			//recreated (if so, and if this node is reused, then this node must
			//reattach itself to the new parent)
			//`editable` is a flag that indicates whether an ancestor is
			//contenteditable
			//`namespace` indicates the closest HTML namespace as it cascades down
			//from an ancestor
			//`configs` is a list of config functions to run after the topmost
			//`build` call finishes running
	
			//there's logic that relies on the assumption that null and undefined
			//data are equivalent to empty strings
			//- this prevents lifecycle surprises from procedural helpers that mix
			//  implicit and explicit return statements (e.g.
			//  function foo() {if (cond) return m("div")}
			//- it simplifies diffing code
			data = dataToString(data);
			if (data.subtree === "retain") return cached;
			cached = makeCache(data, cached, index, parentIndex, parentCache);
			return isArray(data) ? buildArray(data, cached, parentElement, index, parentTag, shouldReattach, editable, namespace, configs) :
				data != null && isObject(data) ? buildObject(data, cached, editable, parentElement, index, shouldReattach, namespace, configs) :
				!isFunction(data) ? handleText(cached, data, index, parentElement, shouldReattach, editable, parentTag) :
				cached;
		}
		function sortChanges(a, b) { return a.action - b.action || a.index - b.index; }
		function setAttributes(node, tag, dataAttrs, cachedAttrs, namespace) {
			for (var attrName in dataAttrs) {
				var dataAttr = dataAttrs[attrName];
				var cachedAttr = cachedAttrs[attrName];
				if (!(attrName in cachedAttrs) || (cachedAttr !== dataAttr)) {
					cachedAttrs[attrName] = dataAttr;
					try {
						//`config` isn't a real attributes, so ignore it
						if (attrName === "config" || attrName === "key") continue;
						//hook event handlers to the auto-redrawing system
						else if (isFunction(dataAttr) && attrName.slice(0, 2) === "on") {
							node[attrName] = autoredraw(dataAttr, node);
						}
						//handle `style: {...}`
						else if (attrName === "style" && dataAttr != null && isObject(dataAttr)) {
							for (var rule in dataAttr) {
								if (cachedAttr == null || cachedAttr[rule] !== dataAttr[rule]) node.style[rule] = dataAttr[rule];
							}
							for (var rule in cachedAttr) {
								if (!(rule in dataAttr)) node.style[rule] = "";
							}
						}
						//handle SVG
						else if (namespace != null) {
							if (attrName === "href") node.setAttributeNS("http://www.w3.org/1999/xlink", "href", dataAttr);
							else node.setAttribute(attrName === "className" ? "class" : attrName, dataAttr);
						}
						//handle cases that are properties (but ignore cases where we should use setAttribute instead)
						//- list and form are typically used as strings, but are DOM element references in js
						//- when using CSS selectors (e.g. `m("[style='']")`), style is used as a string, but it's an object in js
						else if (attrName in node && attrName !== "list" && attrName !== "style" && attrName !== "form" && attrName !== "type" && attrName !== "width" && attrName !== "height") {
							//#348 don't set the value if not needed otherwise cursor placement breaks in Chrome
							if (tag !== "input" || node[attrName] !== dataAttr) node[attrName] = dataAttr;
						}
						else node.setAttribute(attrName, dataAttr);
					}
					catch (e) {
						//swallow IE's invalid argument errors to mimic HTML's fallback-to-doing-nothing-on-invalid-attributes behavior
						if (e.message.indexOf("Invalid argument") < 0) throw e;
					}
				}
				//#348 dataAttr may not be a string, so use loose comparison (double equal) instead of strict (triple equal)
				else if (attrName === "value" && tag === "input" && node.value != dataAttr) {
					node.value = dataAttr;
				}
			}
			return cachedAttrs;
		}
		function clear(nodes, cached) {
			for (var i = nodes.length - 1; i > -1; i--) {
				if (nodes[i] && nodes[i].parentNode) {
					try { nodes[i].parentNode.removeChild(nodes[i]); }
					catch (e) {} //ignore if this fails due to order of events (see http://stackoverflow.com/questions/21926083/failed-to-execute-removechild-on-node)
					cached = [].concat(cached);
					if (cached[i]) unload(cached[i]);
				}
			}
			//release memory if nodes is an array. This check should fail if nodes is a NodeList (see loop above)
			if (nodes.length) nodes.length = 0;
		}
		function unload(cached) {
			if (cached.configContext && isFunction(cached.configContext.onunload)) {
				cached.configContext.onunload();
				cached.configContext.onunload = null;
			}
			if (cached.controllers) {
				forEach(cached.controllers, function (controller) {
					if (isFunction(controller.onunload)) controller.onunload({preventDefault: noop});
				});
			}
			if (cached.children) {
				if (isArray(cached.children)) forEach(cached.children, unload);
				else if (cached.children.tag) unload(cached.children);
			}
		}
		function injectHTML(parentElement, index, data) {
			var nextSibling = parentElement.childNodes[index];
			if (nextSibling) {
				var isElement = nextSibling.nodeType !== 1;
				var placeholder = $document.createElement("span");
				if (isElement) {
					parentElement.insertBefore(placeholder, nextSibling || null);
					placeholder.insertAdjacentHTML("beforebegin", data);
					parentElement.removeChild(placeholder);
				}
				else nextSibling.insertAdjacentHTML("beforebegin", data);
			}
			else {
				if (window.Range && window.Range.prototype.createContextualFragment) {
					parentElement.appendChild($document.createRange().createContextualFragment(data));
				}
				else parentElement.insertAdjacentHTML("beforeend", data);
			}
			var nodes = [];
			while (parentElement.childNodes[index] !== nextSibling) {
				nodes.push(parentElement.childNodes[index]);
				index++;
			}
			return nodes;
		}
		function autoredraw(callback, object) {
			return function(e) {
				e = e || event;
				m.redraw.strategy("diff");
				m.startComputation();
				try { return callback.call(object, e); }
				finally {
					endFirstComputation();
				}
			};
		}
	
		var html;
		var documentNode = {
			appendChild: function(node) {
				if (html === undefined) html = $document.createElement("html");
				if ($document.documentElement && $document.documentElement !== node) {
					$document.replaceChild(node, $document.documentElement);
				}
				else $document.appendChild(node);
				this.childNodes = $document.childNodes;
			},
			insertBefore: function(node) {
				this.appendChild(node);
			},
			childNodes: []
		};
		var nodeCache = [], cellCache = {};
		m.render = function(root, cell, forceRecreation) {
			var configs = [];
			if (!root) throw new Error("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.");
			var id = getCellCacheKey(root);
			var isDocumentRoot = root === $document;
			var node = isDocumentRoot || root === $document.documentElement ? documentNode : root;
			if (isDocumentRoot && cell.tag !== "html") cell = {tag: "html", attrs: {}, children: cell};
			if (cellCache[id] === undefined) clear(node.childNodes);
			if (forceRecreation === true) reset(root);
			cellCache[id] = build(node, null, undefined, undefined, cell, cellCache[id], false, 0, null, undefined, configs);
			forEach(configs, function (config) { config(); });
		};
		function getCellCacheKey(element) {
			var index = nodeCache.indexOf(element);
			return index < 0 ? nodeCache.push(element) - 1 : index;
		}
	
		m.trust = function(value) {
			value = new String(value);
			value.$trusted = true;
			return value;
		};
	
		function gettersetter(store) {
			var prop = function() {
				if (arguments.length) store = arguments[0];
				return store;
			};
	
			prop.toJSON = function() {
				return store;
			};
	
			return prop;
		}
	
		m.prop = function (store) {
			//note: using non-strict equality check here because we're checking if store is null OR undefined
			if ((store != null && isObject(store) || isFunction(store)) && isFunction(store.then)) {
				return propify(store);
			}
	
			return gettersetter(store);
		};
	
		var roots = [], components = [], controllers = [], lastRedrawId = null, lastRedrawCallTime = 0, computePreRedrawHook = null, computePostRedrawHook = null, topComponent, unloaders = [];
		var FRAME_BUDGET = 16; //60 frames per second = 1 call per 16 ms
		function parameterize(component, args) {
			var controller = function() {
				return (component.controller || noop).apply(this, args) || this;
			};
			if (component.controller) controller.prototype = component.controller.prototype;
			var view = function(ctrl) {
				var currentArgs = arguments.length > 1 ? args.concat([].slice.call(arguments, 1)) : args;
				return component.view.apply(component, currentArgs ? [ctrl].concat(currentArgs) : [ctrl]);
			};
			view.$original = component.view;
			var output = {controller: controller, view: view};
			if (args[0] && args[0].key != null) output.attrs = {key: args[0].key};
			return output;
		}
		m.component = function(component) {
			for (var args = [], i = 1; i < arguments.length; i++) args.push(arguments[i]);
			return parameterize(component, args);
		};
		m.mount = m.module = function(root, component) {
			if (!root) throw new Error("Please ensure the DOM element exists before rendering a template into it.");
			var index = roots.indexOf(root);
			if (index < 0) index = roots.length;
	
			var isPrevented = false;
			var event = {preventDefault: function() {
				isPrevented = true;
				computePreRedrawHook = computePostRedrawHook = null;
			}};
	
			forEach(unloaders, function (unloader) {
				unloader.handler.call(unloader.controller, event);
				unloader.controller.onunload = null;
			});
	
			if (isPrevented) {
				forEach(unloaders, function (unloader) {
					unloader.controller.onunload = unloader.handler;
				});
			}
			else unloaders = [];
	
			if (controllers[index] && isFunction(controllers[index].onunload)) {
				controllers[index].onunload(event);
			}
	
			var isNullComponent = component === null;
	
			if (!isPrevented) {
				m.redraw.strategy("all");
				m.startComputation();
				roots[index] = root;
				var currentComponent = component ? (topComponent = component) : (topComponent = component = {controller: noop});
				var controller = new (component.controller || noop)();
				//controllers may call m.mount recursively (via m.route redirects, for example)
				//this conditional ensures only the last recursive m.mount call is applied
				if (currentComponent === topComponent) {
					controllers[index] = controller;
					components[index] = component;
				}
				endFirstComputation();
				if (isNullComponent) {
					removeRootElement(root, index);
				}
				return controllers[index];
			}
			if (isNullComponent) {
				removeRootElement(root, index);
			}
		};
	
		function removeRootElement(root, index) {
			roots.splice(index, 1);
			controllers.splice(index, 1);
			components.splice(index, 1);
			reset(root);
			nodeCache.splice(getCellCacheKey(root), 1);
		}
	
		var redrawing = false, forcing = false;
		m.redraw = function(force) {
			if (redrawing) return;
			redrawing = true;
			if (force) forcing = true;
			try {
				//lastRedrawId is a positive number if a second redraw is requested before the next animation frame
				//lastRedrawID is null if it's the first redraw and not an event handler
				if (lastRedrawId && !force) {
					//when setTimeout: only reschedule redraw if time between now and previous redraw is bigger than a frame, otherwise keep currently scheduled timeout
					//when rAF: always reschedule redraw
					if ($requestAnimationFrame === window.requestAnimationFrame || new Date - lastRedrawCallTime > FRAME_BUDGET) {
						if (lastRedrawId > 0) $cancelAnimationFrame(lastRedrawId);
						lastRedrawId = $requestAnimationFrame(redraw, FRAME_BUDGET);
					}
				}
				else {
					redraw();
					lastRedrawId = $requestAnimationFrame(function() { lastRedrawId = null; }, FRAME_BUDGET);
				}
			}
			finally {
				redrawing = forcing = false;
			}
		};
		m.redraw.strategy = m.prop();
		function redraw() {
			if (computePreRedrawHook) {
				computePreRedrawHook();
				computePreRedrawHook = null;
			}
			forEach(roots, function (root, i) {
				var component = components[i];
				if (controllers[i]) {
					var args = [controllers[i]];
					m.render(root, component.view ? component.view(controllers[i], args) : "");
				}
			});
			//after rendering within a routed context, we need to scroll back to the top, and fetch the document title for history.pushState
			if (computePostRedrawHook) {
				computePostRedrawHook();
				computePostRedrawHook = null;
			}
			lastRedrawId = null;
			lastRedrawCallTime = new Date;
			m.redraw.strategy("diff");
		}
	
		var pendingRequests = 0;
		m.startComputation = function() { pendingRequests++; };
		m.endComputation = function() {
			if (pendingRequests > 1) pendingRequests--;
			else {
				pendingRequests = 0;
				m.redraw();
			}
		}
	
		function endFirstComputation() {
			if (m.redraw.strategy() === "none") {
				pendingRequests--;
				m.redraw.strategy("diff");
			}
			else m.endComputation();
		}
	
		m.withAttr = function(prop, withAttrCallback, callbackThis) {
			return function(e) {
				e = e || event;
				var currentTarget = e.currentTarget || this;
				var _this = callbackThis || this;
				withAttrCallback.call(_this, prop in currentTarget ? currentTarget[prop] : currentTarget.getAttribute(prop));
			};
		};
	
		//routing
		var modes = {pathname: "", hash: "#", search: "?"};
		var redirect = noop, routeParams, currentRoute, isDefaultRoute = false;
		m.route = function(root, arg1, arg2, vdom) {
			//m.route()
			if (arguments.length === 0) return currentRoute;
			//m.route(el, defaultRoute, routes)
			else if (arguments.length === 3 && isString(arg1)) {
				redirect = function(source) {
					var path = currentRoute = normalizeRoute(source);
					if (!routeByValue(root, arg2, path)) {
						if (isDefaultRoute) throw new Error("Ensure the default route matches one of the routes defined in m.route");
						isDefaultRoute = true;
						m.route(arg1, true);
						isDefaultRoute = false;
					}
				};
				var listener = m.route.mode === "hash" ? "onhashchange" : "onpopstate";
				window[listener] = function() {
					var path = $location[m.route.mode];
					if (m.route.mode === "pathname") path += $location.search;
					if (currentRoute !== normalizeRoute(path)) redirect(path);
				};
	
				computePreRedrawHook = setScroll;
				window[listener]();
			}
			//config: m.route
			else if (root.addEventListener || root.attachEvent) {
				root.href = (m.route.mode !== 'pathname' ? $location.pathname : '') + modes[m.route.mode] + vdom.attrs.href;
				if (root.addEventListener) {
					root.removeEventListener("click", routeUnobtrusive);
					root.addEventListener("click", routeUnobtrusive);
				}
				else {
					root.detachEvent("onclick", routeUnobtrusive);
					root.attachEvent("onclick", routeUnobtrusive);
				}
			}
			//m.route(route, params, shouldReplaceHistoryEntry)
			else if (isString(root)) {
				var oldRoute = currentRoute;
				currentRoute = root;
				var args = arg1 || {};
				var queryIndex = currentRoute.indexOf("?");
				var params = queryIndex > -1 ? parseQueryString(currentRoute.slice(queryIndex + 1)) : {};
				for (var i in args) params[i] = args[i];
				var querystring = buildQueryString(params);
				var currentPath = queryIndex > -1 ? currentRoute.slice(0, queryIndex) : currentRoute;
				if (querystring) currentRoute = currentPath + (currentPath.indexOf("?") === -1 ? "?" : "&") + querystring;
	
				var shouldReplaceHistoryEntry = (arguments.length === 3 ? arg2 : arg1) === true || oldRoute === root;
	
				if (window.history.pushState) {
					computePreRedrawHook = setScroll;
					computePostRedrawHook = function() {
						window.history[shouldReplaceHistoryEntry ? "replaceState" : "pushState"](null, $document.title, modes[m.route.mode] + currentRoute);
					};
					redirect(modes[m.route.mode] + currentRoute);
				}
				else {
					$location[m.route.mode] = currentRoute;
					redirect(modes[m.route.mode] + currentRoute);
				}
			}
		};
		m.route.param = function(key) {
			if (!routeParams) throw new Error("You must call m.route(element, defaultRoute, routes) before calling m.route.param()");
			if( !key ){
				return routeParams;
			}
			return routeParams[key];
		};
		m.route.mode = "search";
		function normalizeRoute(route) {
			return route.slice(modes[m.route.mode].length);
		}
		function routeByValue(root, router, path) {
			routeParams = {};
	
			var queryStart = path.indexOf("?");
			if (queryStart !== -1) {
				routeParams = parseQueryString(path.substr(queryStart + 1, path.length));
				path = path.substr(0, queryStart);
			}
	
			// Get all routes and check if there's
			// an exact match for the current path
			var keys = Object.keys(router);
			var index = keys.indexOf(path);
			if(index !== -1){
				m.mount(root, router[keys [index]]);
				return true;
			}
	
			for (var route in router) {
				if (route === path) {
					m.mount(root, router[route]);
					return true;
				}
	
				var matcher = new RegExp("^" + route.replace(/:[^\/]+?\.{3}/g, "(.*?)").replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$");
	
				if (matcher.test(path)) {
					path.replace(matcher, function() {
						var keys = route.match(/:[^\/]+/g) || [];
						var values = [].slice.call(arguments, 1, -2);
						forEach(keys, function (key, i) {
							routeParams[key.replace(/:|\./g, "")] = decodeURIComponent(values[i]);
						})
						m.mount(root, router[route]);
					});
					return true;
				}
			}
		}
		function routeUnobtrusive(e) {
			e = e || event;
	
			if (e.ctrlKey || e.metaKey || e.which === 2) return;
	
			if (e.preventDefault) e.preventDefault();
			else e.returnValue = false;
	
			var currentTarget = e.currentTarget || e.srcElement;
			var args = m.route.mode === "pathname" && currentTarget.search ? parseQueryString(currentTarget.search.slice(1)) : {};
			while (currentTarget && currentTarget.nodeName.toUpperCase() !== "A") currentTarget = currentTarget.parentNode;
			// clear pendingRequests because we want an immediate route change
			pendingRequests = 0;
			m.route(currentTarget[m.route.mode].slice(modes[m.route.mode].length), args);
		}
		function setScroll() {
			if (m.route.mode !== "hash" && $location.hash) $location.hash = $location.hash;
			else window.scrollTo(0, 0);
		}
		function buildQueryString(object, prefix) {
			var duplicates = {};
			var str = [];
			for (var prop in object) {
				var key = prefix ? prefix + "[" + prop + "]" : prop;
				var value = object[prop];
	
				if (value === null) {
					str.push(encodeURIComponent(key));
				} else if (isObject(value)) {
					str.push(buildQueryString(value, key));
				} else if (isArray(value)) {
					var keys = [];
					duplicates[key] = duplicates[key] || {};
					forEach(value, function (item) {
						if (!duplicates[key][item]) {
							duplicates[key][item] = true;
							keys.push(encodeURIComponent(key) + "=" + encodeURIComponent(item));
						}
					});
					str.push(keys.join("&"));
				} else if (value !== undefined) {
					str.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
				}
			}
			return str.join("&");
		}
		function parseQueryString(str) {
			if (str === "" || str == null) return {};
			if (str.charAt(0) === "?") str = str.slice(1);
	
			var pairs = str.split("&"), params = {};
			forEach(pairs, function (string) {
				var pair = string.split("=");
				var key = decodeURIComponent(pair[0]);
				var value = pair.length === 2 ? decodeURIComponent(pair[1]) : null;
				if (params[key] != null) {
					if (!isArray(params[key])) params[key] = [params[key]];
					params[key].push(value);
				}
				else params[key] = value;
			});
	
			return params;
		}
		m.route.buildQueryString = buildQueryString;
		m.route.parseQueryString = parseQueryString;
	
		function reset(root) {
			var cacheKey = getCellCacheKey(root);
			clear(root.childNodes, cellCache[cacheKey]);
			cellCache[cacheKey] = undefined;
		}
	
		m.deferred = function () {
			var deferred = new Deferred();
			deferred.promise = propify(deferred.promise);
			return deferred;
		};
		function propify(promise, initialValue) {
			var prop = m.prop(initialValue);
			promise.then(prop);
			prop.then = function(resolve, reject) {
				return propify(promise.then(resolve, reject), initialValue);
			};
			prop["catch"] = prop.then.bind(null, null);
			return prop;
		}
		//Promiz.mithril.js | Zolmeister | MIT
		//a modified version of Promiz.js, which does not conform to Promises/A+ for two reasons:
		//1) `then` callbacks are called synchronously (because setTimeout is too slow, and the setImmediate polyfill is too big
		//2) throwing subclasses of Error cause the error to be bubbled up instead of triggering rejection (because the spec does not account for the important use case of default browser error handling, i.e. message w/ line number)
		function Deferred(successCallback, failureCallback) {
			var RESOLVING = 1, REJECTING = 2, RESOLVED = 3, REJECTED = 4;
			var self = this, state = 0, promiseValue = 0, next = [];
	
			self.promise = {};
	
			self.resolve = function(value) {
				if (!state) {
					promiseValue = value;
					state = RESOLVING;
	
					fire();
				}
				return this;
			};
	
			self.reject = function(value) {
				if (!state) {
					promiseValue = value;
					state = REJECTING;
	
					fire();
				}
				return this;
			};
	
			self.promise.then = function(successCallback, failureCallback) {
				var deferred = new Deferred(successCallback, failureCallback)
				if (state === RESOLVED) {
					deferred.resolve(promiseValue);
				}
				else if (state === REJECTED) {
					deferred.reject(promiseValue);
				}
				else {
					next.push(deferred);
				}
				return deferred.promise
			};
	
			function finish(type) {
				state = type || REJECTED;
				next.map(function(deferred) {
					state === RESOLVED ? deferred.resolve(promiseValue) : deferred.reject(promiseValue);
				});
			}
	
			function thennable(then, successCallback, failureCallback, notThennableCallback) {
				if (((promiseValue != null && isObject(promiseValue)) || isFunction(promiseValue)) && isFunction(then)) {
					try {
						// count protects against abuse calls from spec checker
						var count = 0;
						then.call(promiseValue, function(value) {
							if (count++) return;
							promiseValue = value;
							successCallback();
						}, function (value) {
							if (count++) return;
							promiseValue = value;
							failureCallback();
						});
					}
					catch (e) {
						m.deferred.onerror(e);
						promiseValue = e;
						failureCallback();
					}
				} else {
					notThennableCallback();
				}
			}
	
			function fire() {
				// check if it's a thenable
				var then;
				try {
					then = promiseValue && promiseValue.then;
				}
				catch (e) {
					m.deferred.onerror(e);
					promiseValue = e;
					state = REJECTING;
					return fire();
				}
	
				if (state === REJECTING) {
					m.deferred.onerror(promiseValue)
				}
	
				thennable(then, function () {
					state = RESOLVING
					fire()
				}, function () {
					state = REJECTING
					fire()
				}, function () {
					try {
						if (state === RESOLVING && isFunction(successCallback)) {
							promiseValue = successCallback(promiseValue);
						}
						else if (state === REJECTING && isFunction(failureCallback)) {
							promiseValue = failureCallback(promiseValue);
							state = RESOLVING;
						}
					}
					catch (e) {
						m.deferred.onerror(e);
						promiseValue = e;
						return finish();
					}
	
					if (promiseValue === self) {
						promiseValue = TypeError();
						finish();
					} else {
						thennable(then, function () {
							finish(RESOLVED);
						}, finish, function () {
							finish(state === RESOLVING && RESOLVED);
						});
					}
				});
			}
		}
		m.deferred.onerror = function(e) {
			if (type.call(e) === "[object Error]" && !e.constructor.toString().match(/ Error/)) {
				pendingRequests = 0;
				throw e;
			}
		};
	
		m.sync = function(args) {
			var method = "resolve";
	
			function synchronizer(pos, resolved) {
				return function(value) {
					results[pos] = value;
					if (!resolved) method = "reject";
					if (--outstanding === 0) {
						deferred.promise(results);
						deferred[method](results);
					}
					return value;
				};
			}
	
			var deferred = m.deferred();
			var outstanding = args.length;
			var results = new Array(outstanding);
			if (args.length > 0) {
				forEach(args, function (arg, i) {
					arg.then(synchronizer(i, true), synchronizer(i, false));
				});
			}
			else deferred.resolve([]);
	
			return deferred.promise;
		};
		function identity(value) { return value; }
	
		function ajax(options) {
			if (options.dataType && options.dataType.toLowerCase() === "jsonp") {
				var callbackKey = "mithril_callback_" + new Date().getTime() + "_" + (Math.round(Math.random() * 1e16)).toString(36)
				var script = $document.createElement("script");
	
				window[callbackKey] = function(resp) {
					script.parentNode.removeChild(script);
					options.onload({
						type: "load",
						target: {
							responseText: resp
						}
					});
					window[callbackKey] = undefined;
				};
	
				script.onerror = function() {
					script.parentNode.removeChild(script);
	
					options.onerror({
						type: "error",
						target: {
							status: 500,
							responseText: JSON.stringify({
								error: "Error making jsonp request"
							})
						}
					});
					window[callbackKey] = undefined;
	
					return false;
				}
	
				script.onload = function() {
					return false;
				};
	
				script.src = options.url
					+ (options.url.indexOf("?") > 0 ? "&" : "?")
					+ (options.callbackKey ? options.callbackKey : "callback")
					+ "=" + callbackKey
					+ "&" + buildQueryString(options.data || {});
				$document.body.appendChild(script);
			}
			else {
				var xhr = new window.XMLHttpRequest();
				xhr.open(options.method, options.url, true, options.user, options.password);
				xhr.onreadystatechange = function() {
					if (xhr.readyState === 4) {
						if (xhr.status >= 200 && xhr.status < 300) options.onload({type: "load", target: xhr});
						else options.onerror({type: "error", target: xhr});
					}
				};
				if (options.serialize === JSON.stringify && options.data && options.method !== "GET") {
					xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
				}
				if (options.deserialize === JSON.parse) {
					xhr.setRequestHeader("Accept", "application/json, text/*");
				}
				if (isFunction(options.config)) {
					var maybeXhr = options.config(xhr, options);
					if (maybeXhr != null) xhr = maybeXhr;
				}
	
				var data = options.method === "GET" || !options.data ? "" : options.data;
				if (data && (!isString(data) && data.constructor !== window.FormData)) {
					throw new Error("Request data should be either be a string or FormData. Check the `serialize` option in `m.request`");
				}
				xhr.send(data);
				return xhr;
			}
		}
	
		function bindData(xhrOptions, data, serialize) {
			if (xhrOptions.method === "GET" && xhrOptions.dataType !== "jsonp") {
				var prefix = xhrOptions.url.indexOf("?") < 0 ? "?" : "&";
				var querystring = buildQueryString(data);
				xhrOptions.url = xhrOptions.url + (querystring ? prefix + querystring : "");
			}
			else xhrOptions.data = serialize(data);
			return xhrOptions;
		}
	
		function parameterizeUrl(url, data) {
			var tokens = url.match(/:[a-z]\w+/gi);
			if (tokens && data) {
				forEach(tokens, function (token) {
					var key = token.slice(1);
					url = url.replace(token, data[key]);
					delete data[key];
				});
			}
			return url;
		}
	
		m.request = function(xhrOptions) {
			if (xhrOptions.background !== true) m.startComputation();
			var deferred = new Deferred();
			var isJSONP = xhrOptions.dataType && xhrOptions.dataType.toLowerCase() === "jsonp"
			var serialize = xhrOptions.serialize = isJSONP ? identity : xhrOptions.serialize || JSON.stringify;
			var deserialize = xhrOptions.deserialize = isJSONP ? identity : xhrOptions.deserialize || JSON.parse;
			var extract = isJSONP ? function(jsonp) { return jsonp.responseText } : xhrOptions.extract || function(xhr) {
				if (xhr.responseText.length === 0 && deserialize === JSON.parse) {
					return null
				} else {
					return xhr.responseText
				}
			};
			xhrOptions.method = (xhrOptions.method || "GET").toUpperCase();
			xhrOptions.url = parameterizeUrl(xhrOptions.url, xhrOptions.data);
			xhrOptions = bindData(xhrOptions, xhrOptions.data, serialize);
			xhrOptions.onload = xhrOptions.onerror = function(e) {
				try {
					e = e || event;
					var unwrap = (e.type === "load" ? xhrOptions.unwrapSuccess : xhrOptions.unwrapError) || identity;
					var response = unwrap(deserialize(extract(e.target, xhrOptions)), e.target);
					if (e.type === "load") {
						if (isArray(response) && xhrOptions.type) {
							forEach(response, function (res, i) {
								response[i] = new xhrOptions.type(res);
							});
						} else if (xhrOptions.type) {
							response = new xhrOptions.type(response);
						}
						deferred.resolve(response)
					} else {
						deferred.reject(response)
					}
	
					deferred[e.type === "load" ? "resolve" : "reject"](response);
				}
				catch (e) {
					deferred.reject(e);
				}
				finally {
					if (xhrOptions.background !== true) m.endComputation()
				}
			}
	
			ajax(xhrOptions);
			deferred.promise = propify(deferred.promise, xhrOptions.initialValue);
			return deferred.promise;
		};
	
		//testing API
		m.deps = function(mock) {
			initialize(window = mock || window);
			return window;
		};
		//for internal testing only, do not use `m.deps.factory`
		m.deps.factory = app;
	
		return m;
	})(typeof window !== "undefined" ? window : {});
	
	if (typeof module === "object" && module != null && module.exports) module.exports = m;
	else if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return m }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)(module)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	var status = {
		PASS: 'pass',
		YUMMY: 'yummy',
		YUCK: 'yuck',
		ENABLED: 'enabled',
		DISABLED: 'disabled'
	};
	
	module.exports = {
		status: status
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (value, errorText) {
		var sprintfValues = Array.prototype.slice.call(arguments, 2);
		if (!value) {
			var text = errorText.replace(/%s/g, function (_) {
				return sprintfValues.shift();
			});
			throw new Error(text);
		}
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (k) {
	  return function (o) {
	    return o[k]();
	  };
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	function format(price, decimals, decimalSep, thousandSep, unitFormat) {
		decimals = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
		decimalSep = decimalSep || '.';
		thousandSep = thousandSep || ',';
		unitFormat = unitFormat || '$ %s';
		var sign = price < 0 ? '-' : '';
		price = Math.abs(+price || 0).toFixed(decimals);
		var intPart = parseInt(price),
		    intStr = String(intPart),
		   
		// first group length : 12 000 000 : fgl = 2 (only if price > 999)
		fgl = intStr.length > 3 ? intStr.length % 3 : 0,
		    priceStr = sign + (fgl ? intStr.substr(0, fgl) + thousandSep : '') + intStr.substr(fgl).replace(/(\d{3})(?=\d)/g, '$1' + thousandSep) + (decimals ? decimalSep + Math.abs(price - intPart).toFixed(decimals).slice(2) : '');
		return unitFormat.replace('%s', priceStr);
	}
	
	module.exports = {
		format: format,
		formatter: function formatter(decimals, decimalSep, thousandSep, unitFormat) {
			return function (price) {
				return format(price, decimals, decimalSep, thousandSep, unitFormat);
			};
		}
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function interleave(list, glue) {
		if (list.length === 0) return [];
		if (list.length === 1) return list[0];
		var newList = [list[0]],
		    len = list.length,
		    i = undefined;
		for (i = 1; i < len; i++) {
			newList.push(glue);
			newList.push(list[i]);
		}
		return newList;
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (o, f) {
		var o2 = {};
		Object.keys(o).forEach(function (k) {
			o2[k] = f(o[k], k, o);
		});
		return o2;
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	var id = function id(it) {
		return it;
	};
	
	// returns all own properties of an object
	module.exports = function (o, f) {
		f = f || id;
		return Object.keys(o).map(function (k) {
			return f(o[k], k);
		});
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var get = __webpack_require__(3);
	
	function maybeWrap(callback) {
		return typeof callback === 'string' ? get(callback) : callback;
	}
	
	function reverse(callback) {
		callback.__sortDesc = true;
		return callback;
	}
	
	function sortBy() {
		var funs = Array.prototype.slice.call(arguments).map(maybeWrap);
		var sorter = function sorter(objA, objB) {
			// console.log('iter -----------')
			var i = 0,
			    f;
			while (funs[i]) {
				f = funs[i];
				// console.log('using fun ', i)
				var a, b;
				if (f.__sortDesc) {
					b = f(objA);
					a = f(objB);
				} else {
					a = f(objA);
					b = f(objB);
				}
				// console.log('comparing ', a, b)
				// if (a < b) console.log('result ', -1, objA, objB)
				// if (a > b) console.log('result ', 1, objA, objB)
				if (a < b) return -1;
				if (a > b) return 1;
				// try another callback
				// console.log('equals')
				i += 1;
			}
			return 0;
		};
		sorter.desc = function (callback) {
			funs.push(reverse(maybeWrap(callback)));
			return sorter;
		};
		sorter.asc = function (callback) {
			funs.push(maybeWrap(callback));
			return sorter;
		};
		return sorter;
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
	
	module.exports = sortBy;

/***/ },
/* 14 */,
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// This module allow you to define several versions for a same data, each one
	// associated to a screen size configuration.
	//
	// Each time the window is resized, (and once at the beginning), the first
	// matching configuration defines the version and publishes it. You should also
	// pass a default configuration.
	//
	// First, provide the module with some data :
	//
	//    var resp = require('responsive-data')
	//    var conf = resp([
	//        {
	//            'minWidth': 768,
	//            data: {
	//                // anything you want here
	//                type: 'tablet'
	//            }
	//        },
	//        {
	//            'minWidth': 0,
	//            'maxWidth': 768 - 1,
	//            data: {
	//                type: 'smartphone'
	//            }
	//        },
	//        // this one has no constraints, so it matches everytime
	//        {
	//        	data: {
	//        		type: 'any'
	//        	}
	//        }
	//    ])
	//
	// The modules calculates the good version immediately and returns a getter.
	//
	//    // outputs the config version relative to the current size, e.g. {type: 'tablet'}
	//    console.log(conf.get())
	//
	// You can also pass a function to the module. It will be called every time the
	// window is resized (throttled to 200 ms)
	//
	//    var conf = resp(configs, function(version, client){
	//        // outputs the config version relative to the current size, e.g. {type: 'tablet'}
	//        console.log(version)
	//        console.log(client) // outputs 'landscape' or 'portrait'
	//    })
	//
	// You can match minWidth, maxWidth, orientation ('portrait' or 'landscape').
	//
	var throttle = __webpack_require__(21);
	var fsignal = __webpack_require__(2);
	
	// add the listener for the event resizes. One single listener for many possible
	// configuration
	var onResize = fsignal({ async: false });
	var listenerAdded = false;
	function maybeAddGlobalListener() {
		if (!listenerAdded) {
			var listener = function listener() {
				onResize(getClient());
			};
			window.addEventListener('resize', throttle(listener, 200, { trailing: true }));
			listenerAdded = true;
		}
	}
	
	module.exports = function (_configs, listener) {
		var configs = _configs.slice().reverse();
		maybeAddGlobalListener();
		var _client = getClient();
		var current = calculateSizes(configs, _client);
		var calculatorListenerId = onResize.listen(function (newClient) {
			_client = newClient;
			current = calculateSizes(configs, _client);
			if (listener) listener(current, _client);
		});
		return {
			get: function get() {
				return current;
			},
			client: function client() {
				return _client;
			},
			forget: function forget() {
				return onResize.remove(calculatorListenerId);
			}
		};
	};
	
	function getClient() {
		var width = document.documentElement.clientWidth;
		var height = document.documentElement.clientHeight;
		// square is portrait
		var orientation = width > height ? 'landscape' : 'portrait';
		var portrait = height >= width;
		var landscape = width > height;
		return { width: width, height: height, orientation: orientation };
	}
	
	function calculateSizes(configs, client) {
		var i = configs.length;
		while (i--) {
			var config = configs[i];
			if (matchConfig(config, client)) {
				return config.data;
			}
		}
	}
	
	function matchConfig(config, client) {
		var undefined = void 0;
		if (config.maxWidth !== undefined && config.maxWidth < client.width) {
			// the max allowed with is inferior to the actual width. The client is
			// too wide.
			return false;
		}
		if (config.minWidth !== undefined && config.minWidth > client.width) {
			// the min allowed with is superior to the actual width. The client is
			// not wide enough.
			return false;
		}
		if (config.orientation !== undefined && config.orientation !== client.orientation) {
			// bad required orientation
			return false;
		}
		return true;
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _constants = __webpack_require__(6);
	
	var assert = __webpack_require__(7);
	var extend = __webpack_require__(4);
	var get = __webpack_require__(3);
	var m = __webpack_require__(5);
	var omap = __webpack_require__(11);
	var ovals = __webpack_require__(12);
	var fsignal = __webpack_require__(2);
	var sortby = __webpack_require__(13);
	
	var model = {};
	
	model.make = function (api, opts) {
		var ingredients = omap(opts.ingredients, Ingredient);
		var defaultOrder = 0;
		var _pizzas = opts.pizzas.map(function (def, i) {
			var def2 = extend({ id: i }, def);
			def2.ingredients = findAllIngredients(ingredients, def.ingredients);
			def2.defaultOrder = defaultOrder++;
			return Pizza(def2);
		});
		var _filters = ovals(opts.filters, function (filter, k) {
			filter.id = k;
			return Filter(filter);
		}).sort(sortby('name'));
		var ingredientsList = ovals(ingredients).sort();
		var store = {
			change: fsignal({ async: false }),
			trigger: function trigger() {
				store.change();
			},
			init: function init() {
				omap(api, function (f, k) {
					if (store[k]) {
						f.listen(store[k]);
					}
				});
				store.computeAll();
			},
			ingredients: function ingredients() {
				return ingredientsList;
			},
			pizzas: function pizzas() {
				return _pizzas;
			},
			filters: function filters() {
				return _filters;
			},
			toggleYummy: function toggleYummy(ing) {
				ing.toggleYummy();
				store.computeAll();
			},
			toggleYuck: function toggleYuck(ing) {
				ing.toggleYuck();
				store.computeAll();
			},
			toggleFilter: function toggleFilter(filter) {
				filter.toggle();
				store.computeAll();
			},
			windowResize: function windowResize() {
				// we must listen to this pure UI event in order to set the previous
				// rank of pizzas to their current rank
				store.computeAll();
			},
			computeAll: function computeAll() {
				console.log('compute !');
				var visibleRank = 0;
				var enabledFilters = _filters.filter(function (f) {
					return f.status() === _constants.status.ENABLED;
				});
				_pizzas.forEach(function (p) {
					return p.compute(enabledFilters);
				});
				// Sort pizzas for score calculation
				_pizzas.sort(sortby().desc(function (p) {
					return p.score();
				}).asc('defaultOrder'));
				_pizzas.forEach(function (p) {
					return p.rank(p.visible() ? visibleRank++ : 0);
				});
				// Sort pizzas by default to allow animations on rendering
				_pizzas.sort(sortby('defaultOrder'));
				_filters.forEach(function (f) {
					return f.setMatchingPizzas(_pizzas);
				});
				store.trigger();
			}
		};
		// store.init()
		return store;
	};
	
	module.exports = model;
	
	// pizza model, receives all pizza properties from the user spec, but
	// .ingredients are models
	var Pizza = function Pizza(data) {
		var pizza = extend({ tags: [], url: null, prices: {}, name: 'Unnamed pizza' }, data);
		pizza.wasVisible = m.prop(false);
		pizza.visible = m.prop(true);
		var prevRank = 0;
		var curRank = 0;
		pizza.prevRank = function () {
			return prevRank;
		};
		pizza.rank = function () {
			if (arguments.length) {
				var newRank = arguments[0];
				prevRank = curRank;
				curRank = newRank;
				return curRank;
			} else {
				return curRank;
			}
		};
		pizza.checkVisible = function (filters) {
			pizza.wasVisible(pizza.visible());
			// a pizza is visible if neither of its ingredients have a YUCK status
			return pizza.visible(!filters.some(function (filter) {
				return filter.reject(pizza);
			}) && !pizza.ingredients.some(function (i) {
				return i.status() === _constants.status.YUCK;
			}));
		};
		pizza.calcScore = function () {
			// Yummy ingredients score 1, others score 0
			return pizza.score(pizza.ingredients.map(function (ing) {
				return Number(ing.status() === _constants.status.YUMMY);
			}).reduce(function (sum, score) {
				return sum + score;
			}));
		};
		pizza.score = m.prop();
		pizza.calcScore();
		pizza.compute = function (filters) {
			pizza.checkVisible(filters);
			pizza.calcScore();
		};
		pizza.tagged = function (tag) {
			return pizza.tags.indexOf(tag) !== -1;
		};
		return pizza;
	};
	
	var Ingredient = function Ingredient(name) {
		var ing = {
			name: name
		};
		ing.status = m.prop(_constants.status.PASS);
		ing.toggleYummy = function () {
			ing.status(ing.status() === _constants.status.YUMMY ? _constants.status.PASS : _constants.status.YUMMY);
		};
		ing.toggleYuck = function () {
			ing.status(ing.status() === _constants.status.YUCK ? _constants.status.PASS : _constants.status.YUCK);
		};
		return ing;
	};
	
	var Filter = function Filter(data) {
		var filter = extend({}, data);
		filter.status = m.prop(_constants.status.DISABLED);
		filter.toggle = function () {
			return filter.status(filter.status() === _constants.status.DISABLED ? _constants.status.ENABLED : _constants.status.DISABLED);
		};
		filter.accept = function (pizza) {
			var passes = filter.fun(pizza);
			return passes;
			return filter.fun(pizza);
		};
		filter.reject = function (pizza) {
			return !filter.accept(pizza);
		};
		var selfPizzas = [];
		filter.setMatchingPizzas = function (pizzas) {
			selfPizzas = pizzas.filter(function (p) {
				return filter.accept(p);
			});
		};
		filter.hasHiddenPizzas = function () {
			return selfPizzas.some(function (p) {
				return !p.visible();
			});
		};
		filter.matchingPizzas = function () {
			return selfPizzas.slice();
		};
		return filter;
	};
	
	function findAllIngredients(ingrs, keys) {
		var found = [];
		keys.forEach(function (k) {
			assert(ingrs[k] !== void 0, "Ingredient '%s' not found", k);
			found.push(ingrs[k]);
		});
		return found;
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _constants = __webpack_require__(6);
	
	var call = __webpack_require__(8);
	var get = __webpack_require__(3);
	var interleave = __webpack_require__(10);
	var m = __webpack_require__(5);
	
	function make(api, store, opts) {
		var el = opts.container;
		var t = m.trust;
	
		var render = function render() {
			var ct = content();
			console.log('render pizzas');
			ct.children[1].children[0].map(function (li) {
				return console.log(' - ', li.attrs.key);
			});
			m.render(el, ct);
		};
	
		// Listen to the store change events and render the view
		store.change.listen(render);
	
		var menuActive = false;
		// Listen to the view changes
		api.toggleMenu.listen(function () {
			menuActive = !menuActive;render();
		});
	
		// Get the content for the view
		function content() {
			var lc = PizzaPicker.i18n[opts.locale];
			return {
				tag: 'div',
				children: [{
					tag: 'div',
					children: [{
						tag: 'div',
						children: [{
							tag: 'a',
							children: [lc.show_menu],
							attrs: { onclick: api.toggleMenu }
						}, {
							tag: 'a',
							children: [{
								tag: 'span',
								attrs: { className: 'bt-top' }
							}, {
								tag: 'span',
								attrs: { className: 'bt-middle' }
							}, {
								tag: 'span',
								attrs: { className: 'bt-bottom' }
							}],
							attrs: { onclick: api.toggleMenu, className: 'picker-bt-menu' }
						}],
						attrs: { className: 'picker-menu-toggle' }
					}, {
						tag: 'h3',
						children: [lc.ingredients_menu]
					}, {
						tag: 'ul',
						children: [store.ingredients().map(function (ing, i) {
							return {
								tag: 'li',
								children: [{
									tag: 'span',
									children: [ing.name]
								}, {
									tag: 'a',
									children: [t('&#10084;')],
									attrs: { className: 'yummy', onclick: function onclick(e) {
											return api.toggleYummy(ing);
										} }
								}, {
									tag: 'a',
									children: [t('&#10005;')],
									attrs: { className: 'yuck', onclick: function onclick(e) {
											return api.toggleYuck(ing);
										} }
								}],
								attrs: { className: 'status-' + ing.status() }
							};
						})],
						attrs: { className: 'picker-ingredients' }
					}, {
						tag: 'h3',
						children: [lc.filters_menu]
					}, {
						tag: 'ul',
						children: [store.filters().map(function (filter, i) {
							return {
								tag: 'li',
								children: [{
									tag: 'a',
									children: [{
										tag: 'span',
										children: [filter.status() === _constants.status.ENABLED ? t('&#9745;') : t('&#9744;')]
									}, ' ', filter.name, ' ', {
										tag: 'span',
										children: ['(', filter.hasHiddenPizzas() ? {
											tag: 'span',
											children: [{
												tag: 'span',
												children: [filter.matchingPizzas().length],
												attrs: { className: 'filter-' + _constants.status.YUCK }
											}, ' ', filter.matchingPizzas().filter(call('visible')).length]
										} : filter.matchingPizzas().length, ')']
									}],
									attrs: { onclick: function onclick(e) {
											return api.toggleFilter(filter);
										} }
								}],
								attrs: { className: filter.status() === _constants.status.ENABLED ? 'on' : 'off' }
							};
						})],
						attrs: { className: 'picker-filters' }
					}],
					attrs: { className: 'picker-menu' }
				}, {
					tag: 'ul',
					children: [store.pizzas().reverse().map(function (p, i) {
						return formatPizza(p, i, opts);
					})],
					attrs: { className: 'picker-pizzas' }
				}],
				attrs: { className: opts.style.get().wrapperCssClass + ' ' + (menuActive ? 'view-menu' : 'view-pizzas') }
			};
		}
	}
	
	module.exports = { make: make };
	
	function formatPizza(p, index, opts) {
		var elements = [],
		    style = opts.style.get(),
		    lc = PizzaPicker.i18n[opts.locale];
		if (style.renderImages) {
			elements.push({
				tag: 'div',
				children: [{
					tag: 'img',
					attrs: { src: 'http://fakeimg.pl/100x100/ffffff/' }
				}],
				attrs: { className: 'img' }
			});
		}
		elements.push({
			tag: 'ul',
			children: [opts.sizes.map(function (size) {
				return p.prices[size] && {
					tag: 'li',
					children: ['Ø ', size + opts.sizeUnit, ' : ', lc.formatPrice(p.prices[size])]
				};
			})],
			attrs: { className: 'prices' }
		});
	
		var pHeight = opts.style.get().pizzaRowHeightPx;
		var pMargin = opts.style.get().pizzaRowMarginPx;
		var visible = p.visible();
		var rankChanged = p.rank() !== p.prevRank();
		var rank = p.rank();
		var top = visible ? rank * (pHeight + pMargin) : 0;
		var transform = 'translate(0,' + top + 'px)';
		var className = visible && p.wasVisible() ? 'filter-move' : visible ? 'filter-in' : 'filter-out';
	
		// <h3>{className} {transform}</h3>
		elements.push({
			tag: 'div',
			children: [{
				tag: 'h3',
				children: [p.rank(), ' ', p.name]
			}, {
				tag: 'div',
				children: [{
					tag: 'p',
					children: [interleave(p.ingredients.map(function (ing) {
						return formatIngredient(ing, opts);
					}), ', ')]
				}],
				attrs: { className: 'ingredients' }
			}],
			attrs: { className: 'infos' }
		});
	
		// let colorSlice = (255 / 10)
		// let debugColorInt =  Math.floor(colorSlice * (10 - p.id))
		// console.log('sliece', debugColorInt)
		// let debugColor = 'rgb(%s,%s,%s)' . replace(/%s/g, debugColorInt)
	
		return {
			tag: 'li',
			children: [elements],
			attrs: { key: p.id, style: { transform: transform }, /* background: debugColor */className: className }
		};
	}
	
	function formatIngredient(ing, opts) {
		if (ing.status() === _constants.status.YUMMY) {
			return {
				tag: 'span',
				children: [ing.name],
				attrs: { className: 'yummy' }
			};
		} else {
			return {
				tag: 'span',
				children: [ing.name]
			};
		}
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(1),
	    now = __webpack_require__(20),
	    toNumber = __webpack_require__(22);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide an options object to indicate whether `func` should be invoked on
	 * the leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent calls
	 * to the debounced function return the result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	 * on the trailing edge of the timeout only if the the debounced function is
	 * invoked more than once during the `wait` timeout.
	 *
	 * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options] The options object.
	 * @param {boolean} [options.leading=false] Specify invoking on the leading
	 *  edge of the timeout.
	 * @param {number} [options.maxWait] The maximum time `func` is allowed to be
	 *  delayed before it's invoked.
	 * @param {boolean} [options.trailing=true] Specify invoking on the trailing
	 *  edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // avoid costly calculations while the window size is in flux
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // invoke `sendMail` when clicked, debouncing subsequent calls
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // ensure `batchLog` is invoked once after 1 second of debounced calls
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // cancel a trailing debounced invocation
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var args,
	      maxTimeoutId,
	      result,
	      stamp,
	      thisArg,
	      timeoutId,
	      trailingCall,
	      lastCalled = 0,
	      leading = false,
	      maxWait = false,
	      trailing = true;
	
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxWait = 'maxWait' in options && nativeMax(toNumber(options.maxWait) || 0, wait);
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	
	  function cancel() {
	    if (timeoutId) {
	      clearTimeout(timeoutId);
	    }
	    if (maxTimeoutId) {
	      clearTimeout(maxTimeoutId);
	    }
	    lastCalled = 0;
	    args = maxTimeoutId = thisArg = timeoutId = trailingCall = undefined;
	  }
	
	  function complete(isCalled, id) {
	    if (id) {
	      clearTimeout(id);
	    }
	    maxTimeoutId = timeoutId = trailingCall = undefined;
	    if (isCalled) {
	      lastCalled = now();
	      result = func.apply(thisArg, args);
	      if (!timeoutId && !maxTimeoutId) {
	        args = thisArg = undefined;
	      }
	    }
	  }
	
	  function delayed() {
	    var remaining = wait - (now() - stamp);
	    if (remaining <= 0 || remaining > wait) {
	      complete(trailingCall, maxTimeoutId);
	    } else {
	      timeoutId = setTimeout(delayed, remaining);
	    }
	  }
	
	  function flush() {
	    if ((timeoutId && trailingCall) || (maxTimeoutId && trailing)) {
	      result = func.apply(thisArg, args);
	    }
	    cancel();
	    return result;
	  }
	
	  function maxDelayed() {
	    complete(trailing, timeoutId);
	  }
	
	  function debounced() {
	    args = arguments;
	    stamp = now();
	    thisArg = this;
	    trailingCall = trailing && (timeoutId || !leading);
	
	    if (maxWait === false) {
	      var leadingCall = leading && !timeoutId;
	    } else {
	      if (!maxTimeoutId && !leading) {
	        lastCalled = stamp;
	      }
	      var remaining = maxWait - (stamp - lastCalled),
	          isCalled = remaining <= 0 || remaining > maxWait;
	
	      if (isCalled) {
	        if (maxTimeoutId) {
	          maxTimeoutId = clearTimeout(maxTimeoutId);
	        }
	        lastCalled = stamp;
	        result = func.apply(thisArg, args);
	      }
	      else if (!maxTimeoutId) {
	        maxTimeoutId = setTimeout(maxDelayed, remaining);
	      }
	    }
	    if (isCalled && timeoutId) {
	      timeoutId = clearTimeout(timeoutId);
	    }
	    else if (!timeoutId && wait !== maxWait) {
	      timeoutId = setTimeout(delayed, wait);
	    }
	    if (leadingCall) {
	      isCalled = true;
	      result = func.apply(thisArg, args);
	    }
	    if (isCalled && !timeoutId && !maxTimeoutId) {
	      args = thisArg = undefined;
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}
	
	module.exports = debounce;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var isObject = __webpack_require__(1);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array constructors, and
	  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	module.exports = isFunction;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => logs the number of milliseconds it took for the deferred function to be invoked
	 */
	var now = Date.now;
	
	module.exports = now;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var debounce = __webpack_require__(18),
	    isObject = __webpack_require__(1);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/**
	 * Creates a throttled function that only invokes `func` at most once per
	 * every `wait` milliseconds. The throttled function comes with a `cancel`
	 * method to cancel delayed `func` invocations and a `flush` method to
	 * immediately invoke them. Provide an options object to indicate whether
	 * `func` should be invoked on the leading and/or trailing edge of the `wait`
	 * timeout. The `func` is invoked with the last arguments provided to the
	 * throttled function. Subsequent calls to the throttled function return the
	 * result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	 * on the trailing edge of the timeout only if the the throttled function is
	 * invoked more than once during the `wait` timeout.
	 *
	 * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
	 * for details over the differences between `_.throttle` and `_.debounce`.
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to throttle.
	 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	 * @param {Object} [options] The options object.
	 * @param {boolean} [options.leading=true] Specify invoking on the leading
	 *  edge of the timeout.
	 * @param {boolean} [options.trailing=true] Specify invoking on the trailing
	 *  edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // avoid excessively updating the position while scrolling
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // invoke `renewToken` when the click event is fired, but not more than once every 5 minutes
	 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	 * jQuery(element).on('click', throttled);
	 *
	 * // cancel a trailing throttled invocation
	 * jQuery(window).on('popstate', throttled.cancel);
	 */
	function throttle(func, wait, options) {
	  var leading = true,
	      trailing = true;
	
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  if (isObject(options)) {
	    leading = 'leading' in options ? !!options.leading : leading;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	  return debounce(func, wait, { 'leading': leading, 'maxWait': wait, 'trailing': trailing });
	}
	
	module.exports = throttle;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(19),
	    isObject = __webpack_require__(1);
	
	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Built-in method references without a dependency on `global`. */
	var freeParseInt = parseInt;
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3);
	 * // => 3
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3');
	 * // => 3
	 */
	function toNumber(value) {
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}
	
	module.exports = toNumber;


/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }
/******/ ]);
//# sourceMappingURL=pizza-picker.js.map