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
let throttle = require('lodash/throttle')
let fsignal = require('fsignal')

// add the listener for the event resizes. One single listener for many possible
// configuration
let onResize = fsignal({async: false})
let listenerAdded = false
function maybeAddGlobalListener() {
	if (!listenerAdded) {
		let listener = function() {
			onResize(getClient())
		}
		window.addEventListener('resize', throttle(listener, 200, {trailing: true}))
		listenerAdded = true
	}
}

module.exports = function(_configs, listener) {
	let configs = _configs.slice().reverse()
	maybeAddGlobalListener()
	let client = getClient()
	let current = calculateSizes(configs, client)
	let calculatorListenerId = onResize.listen(function(newClient){
		client = newClient
		current = calculateSizes(configs, client)
		if (listener) listener(current, client)
	})
	return {
		get: function(){
			return current
		},
		client: () => client,
		forget: () => onResize.remove(calculatorListenerId)
	}
}

function getClient() {
	let width = document.documentElement.clientWidth
	let height = document.documentElement.clientHeight
	// square is portrait
	let orientation = (width > height) ? 'landscape' : 'portrait'
	let portrait = (height >= width)
	let landscape = (width > height)
	return {width, height, orientation}
}

function calculateSizes(configs, client) {
	let i = configs.length
	while(i--) {
		let config = configs[i]
		if (matchConfig(config, client)) {
			return config.data
		}
	}
}

function matchConfig(config, client) {
	let undefined = void 0
	if (config.maxWidth !== undefined && config.maxWidth < client.width) {
		// the max allowed with is inferior to the actual width. The client is
		// too wide.
		return false
	}
	if (config.minWidth !== undefined && config.minWidth > client.width) {
		// the min allowed with is superior to the actual width. The client is
		// not wide enough.
		return false
	}
	if (config.orientation !== undefined && config.orientation !== client.orientation) {
		// bad required orientation
		return false
	}
	return true
}
