!function(Q){function n(U){if(B[U])return B[U].exports;var F=B[U]={exports:{},id:U,loaded:!1};return Q[U].call(F.exports,F,F.exports,n),F.loaded=!0,F.exports}var B={};return n.m=Q,n.c=B,n.p="",n(0)}({0:function(module,exports,__webpack_require__){eval('// 1. Define the namespace\n"use strict";\n\nvar lc = window.PizzaPicker.i18n.fr = {};\nvar lang = __webpack_require__(20);\n\n// 3. Define the strings and functions\nlc.selected_pizzas_count = lang.ofCount({\n	"0..1": function (n) {\n		return n + " Pizza sélectionnée";\n	},\n	n: function (n) {\n		return n + " Pizzas sélectionnées";\n	} });\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRTovbWluc3JjL3BpenphLXBpY2tlci9hcHAvanMvbGMvZnIuanM/Nzk1YiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRTtBQUN4QyxJQUFJLElBQUksR0FBRyxtQkFBTyxDQUFDLEVBQWEsQ0FBQzs7O0FBSWpDLEVBQUUsQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3ZDLE9BQU0sRUFBRyxXQUFDO1NBQUksQ0FBQyxHQUFHLHFCQUFxQjtFQUFDO0FBQ3hDLEVBQUMsRUFBSSxXQUFDO1NBQUksQ0FBQyxHQUFHLHVCQUF1QjtFQUFDLEVBQ3RDLENBQUMiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIDEuIERlZmluZSB0aGUgbmFtZXNwYWNlXG52YXIgbGMgPSB3aW5kb3cuUGl6emFQaWNrZXIuaTE4bi5mciA9IHt9XG52YXIgbGFuZyA9IHJlcXVpcmUoJ2kxOG4taGVscGVyJylcblxuXG4vLyAzLiBEZWZpbmUgdGhlIHN0cmluZ3MgYW5kIGZ1bmN0aW9uc1xubGMuc2VsZWN0ZWRfcGl6emFzX2NvdW50ID0gbGFuZy5vZkNvdW50KHtcblx0JzAuLjEnOiAobiA9PiBuICsgXCIgUGl6emEgc8OpbGVjdGlvbm7DqWVcIiksXG5cdG46ICAobiA9PiBuICsgXCIgUGl6emFzIHPDqWxlY3Rpb25uw6llc1wiKSxcbn0pXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9taW5zcmMvcGl6emEtcGlja2VyL34vZW52aWZ5LWxvYWRlciFFOi9taW5zcmMvcGl6emEtcGlja2VyL2FwcC9qcy9sYy9mci5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=')},20:function(module,exports){eval('"use strict";\n\nexports.ofCount = function (map) {\n	return function (count) {\n		count = Number(count);\n		if (count === 0) return (map["0"] || map["0..1"] || map.n)(count);\n		if (count === 1) return (map["1"] || map["0..1"] || map.n)(count);else return map.n(count);\n	};\n};\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRTovbWluc3JjL3BpenphLXBpY2tlci9hcHAvanMvaTE4bi1oZWxwZXIuanM/NTA3ZiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLE9BQU8sQ0FBQyxPQUFPLEdBQUcsVUFBUyxHQUFHLEVBQUU7QUFDL0IsUUFBTyxVQUFVLEtBQUssRUFBRTtBQUN2QixPQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNyQixNQUFJLEtBQUssS0FBSyxDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFLLEVBQUUsS0FBSyxDQUFDO0FBQ3BFLE1BQUksS0FBSyxLQUFLLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLEVBQUssRUFBRSxLQUFLLENBQUMsTUFDL0QsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztFQUN4QjtDQUNEIiwiZmlsZSI6IjIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnRzLm9mQ291bnQgPSBmdW5jdGlvbihtYXApIHtcblx0cmV0dXJuIGZ1bmN0aW9uIChjb3VudCkge1xuXHRcdGNvdW50ID0gTnVtYmVyKGNvdW50KVxuXHRcdGlmIChjb3VudCA9PT0gMCkgcmV0dXJuIChtYXBbJzAnXSB8fCBtYXBbJzAuLjEnXSB8fCBtYXBbJ24nXSkoY291bnQpXG5cdFx0aWYgKGNvdW50ID09PSAxKSByZXR1cm4gKG1hcFsnMSddIHx8IG1hcFsnMC4uMSddIHx8IG1hcFsnbiddKShjb3VudClcblx0XHRlbHNlIHJldHVybiBtYXAubihjb3VudClcblx0fVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRTovbWluc3JjL3BpenphLXBpY2tlci9+L2VudmlmeS1sb2FkZXIhRTovbWluc3JjL3BpenphLXBpY2tlci9hcHAvanMvaTE4bi1oZWxwZXIuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9')}});