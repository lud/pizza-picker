!function(n){function e(c){if(t[c])return t[c].exports;var l=t[c]={exports:{},id:c,loaded:!1};return n[c].call(l.exports,l,l.exports,e),l.loaded=!0,l.exports}var t={};return e.m=n,e.c=t,e.p="",e(0)}({0:function(module,exports,__webpack_require__){eval('// 1. Define the namespace\n"use strict";\n\nvar lc = window.PizzaPicker.i18n.fr = {};\nvar lang = __webpack_require__(14);\n\n// 3. Define the strings and functions\nlc.selected_pizzas_count = lang.ofCount({\n	10: function (n) {\n		return n + " Pizza sélectionnée";\n	},\n	n: function (n) {\n		return n + " Pizzas sélectionnées";\n	} });\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvanMvbGMvZnIuanM/YThhYiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRTtBQUN4QyxJQUFJLElBQUksR0FBRyxtQkFBTyxDQUFDLEVBQWEsQ0FBQzs7O0FBSWpDLEVBQUUsQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3ZDLEdBQUUsRUFBRyxXQUFDO1NBQUksQ0FBQyxHQUFHLHFCQUFxQjtFQUFDO0FBQ3BDLEVBQUMsRUFBSSxXQUFDO1NBQUksQ0FBQyxHQUFHLHVCQUF1QjtFQUFDLEVBQ3RDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAxLiBEZWZpbmUgdGhlIG5hbWVzcGFjZVxudmFyIGxjID0gd2luZG93LlBpenphUGlja2VyLmkxOG4uZnIgPSB7fVxudmFyIGxhbmcgPSByZXF1aXJlKCdpMThuLWhlbHBlcicpXG5cblxuLy8gMy4gRGVmaW5lIHRoZSBzdHJpbmdzIGFuZCBmdW5jdGlvbnNcbmxjLnNlbGVjdGVkX3Bpenphc19jb3VudCA9IGxhbmcub2ZDb3VudCh7XG5cdDEwOiAobiA9PiBuICsgXCIgUGl6emEgc8OpbGVjdGlvbm7DqWVcIiksXG5cdG46ICAobiA9PiBuICsgXCIgUGl6emFzIHPDqWxlY3Rpb25uw6llc1wiKSxcbn0pXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2FwcC9qcy9sYy9mci5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6IjAuanMifQ==')},14:function(module,exports,__webpack_require__){eval('"use strict";\n\nfunction insertVarAt(tpl, marker) {\n	if (typeof tpl === "function") {\n		return tpl;\n	}var parts = fun.split(marker);\n	return function () {};\n}\n\nexports.ofCount = function (_map) {\n	var map = {};\n\n	for (var k in _map) if (_map.hasOwnProperty(k)) {\n		map[k] = insertVarAt(_map[k], "%1");\n	}\n\n	return function (count) {\n		count = Number(count);\n		if (count === 0) return (map["0"] || map["10"] || map["1"])(count);\n		if (count === 1) return (map["1"] || map["10"] || map["0"])(count);\n		if (count === 1) return (map["1"] || map.n)(count);else return map.n(count);\n	};\n};\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvanMvaTE4bi1oZWxwZXIuanM/YzUwMiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLFNBQVMsV0FBVyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUU7QUFDakMsS0FBSSxPQUFPLEdBQUcsS0FBSyxVQUFVO0FBQUUsU0FBTyxHQUFHO0VBQ3pDLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQzdCLFFBQU8sWUFBWSxFQUVsQjtDQUNEOztBQUdELE9BQU8sQ0FBQyxPQUFPLEdBQUcsVUFBUyxJQUFJLEVBQUU7QUFDaEMsS0FBSSxHQUFHLEdBQUcsRUFBRTs7QUFFWixNQUFJLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDOUMsS0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDO0VBQ2xDOztBQUVELFFBQU8sVUFBVSxLQUFLLEVBQUU7QUFDdkIsT0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDckIsTUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUM7QUFDbEUsTUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUM7QUFDbEUsTUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsTUFDN0MsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztFQUN4QjtDQUNEIiwic291cmNlc0NvbnRlbnQiOlsiXG5mdW5jdGlvbiBpbnNlcnRWYXJBdCh0cGwsIG1hcmtlcikge1xuXHRpZiAodHlwZW9mIHRwbCA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHRwbFxuXHR2YXIgcGFydHMgPSBmdW4uc3BsaXQobWFya2VyKVxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXG5cdH1cbn1cblxuXG5leHBvcnRzLm9mQ291bnQgPSBmdW5jdGlvbihfbWFwKSB7XG5cdHZhciBtYXAgPSB7fVxuXG5cdGZvcih2YXIgayBpbiBfbWFwKSBpZiAoX21hcC5oYXNPd25Qcm9wZXJ0eShrKSkge1xuXHRcdG1hcFtrXSA9IGluc2VydFZhckF0KF9tYXBba10sJyUxJylcblx0fVxuXG5cdHJldHVybiBmdW5jdGlvbiAoY291bnQpIHtcblx0XHRjb3VudCA9IE51bWJlcihjb3VudClcblx0XHRpZiAoY291bnQgPT09IDApIHJldHVybiAobWFwWycwJ10gfHwgbWFwWycxMCddIHx8IG1hcFsnMSddKShjb3VudClcblx0XHRpZiAoY291bnQgPT09IDEpIHJldHVybiAobWFwWycxJ10gfHwgbWFwWycxMCddIHx8IG1hcFsnMCddKShjb3VudClcblx0XHRpZiAoY291bnQgPT09IDEpIHJldHVybiAobWFwWycxJ10gfHwgbWFwLm4pKGNvdW50KVxuXHRcdGVsc2UgcmV0dXJuIG1hcC5uKGNvdW50KVxuXHR9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2FwcC9qcy9pMThuLWhlbHBlci5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6IjE0LmpzIn0=')}});