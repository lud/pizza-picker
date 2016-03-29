all: mixdeps jsdeps build

mixdeps:
	mix do deps.get, deps.compile

jsdeps:
	npm install

build:
	webpack
	mix compile
