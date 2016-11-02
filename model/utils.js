'use strict'

const zerofill_integer = function(integer, spaces){
	// Inspired by: http://stackoverflow.com/a/9744576
	let pad = new Array(1 + spaces).join("0")
	return (pad + integer).slice(-pad.length)
}

const zerofill_decimal = function(number, spaces){
	let integer = (number*100).toString().split(".")[0]
	return zerofill_integer(integer, spaces)
}

module.exports = {
	zerofill_decimal: zerofill_decimal,
	zerofill_integer: zerofill_integer
}
