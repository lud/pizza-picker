# Pizza Picker

Sluuuurp !


## Model

### Meal

A meal is a simple dinner course, like a pizza or a burger. It has a name, an image, a list of ingredients, a mealtype (pizza, burger, etc.), a list of prices/sizes, and belongs to a mealset.

### Mealset

A mealset is a set of meals. It's this set that is used to render a picker page. It has a name, belongs to a user, and should have some configurations options and belong to a location.

At this time, the meals are also stored as json.
