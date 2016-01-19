// 1. Define the namespace
var lc = window.PizzaPicker.i18n.fr = {}
var lang = require('i18n-helper')


// 3. Define the strings and functions
lc.selected_pizzas_count = lang.ofCount({
	'0..1': (n => n + " Pizza sélectionnée"),
	n:  (n => n + " Pizzas sélectionnées"),
})
lc.ingredients_menu = 'Filtrer par ingredients'
lc.filters_menu = 'Filtrer par type'
