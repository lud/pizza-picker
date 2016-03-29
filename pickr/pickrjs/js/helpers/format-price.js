

function format(price, decimals, decimalSep, thousandSep, unitFormat) {
	decimals = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals
	decimalSep = decimalSep || '.'
	thousandSep = thousandSep || ','
	unitFormat = unitFormat || '$ %s'
	let sign = price < 0 ? '-' : ''
    price = Math.abs(+price || 0).toFixed(decimals)
	let intPart = parseInt(price),
	    intStr = String(intPart),
	    // first group length : 12 000 000 : fgl = 2 (only if price > 999)
	    fgl = intStr.length > 3 ? intStr.length % 3 : 0,
		priceStr = (sign
			+ (fgl ? intStr.substr(0, fgl) + thousandSep : '')
			+ intStr.substr(fgl).replace(/(\d{3})(?=\d)/g, '$1' + thousandSep)
			+ (decimals ? decimalSep + Math.abs(price - intPart).toFixed(decimals).slice(2) : '')
		)
	return unitFormat.replace('%s', priceStr)
}

module.exports = {
	format: format,
	formatter: function(decimals, decimalSep, thousandSep, unitFormat) {
		return function(price) {
			return format(price, decimals, decimalSep, thousandSep, unitFormat)
		}
	}
}
