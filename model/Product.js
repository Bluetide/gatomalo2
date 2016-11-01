'use strict'

module.exports = class Product{

	constructor(name='', amount=0, tasa=0, price=0, discount=0){
		this.name = name
		this.tasa = tasa

		this.amount = amount.toString()
		this.price = price.toString()
		this.discount = discount.toString()
	}

	parse_tasa(){
		if( this.tasa == 0){
				return " "
		} else if(this.tasa == 1){
				return "!"
		} else if(this.tasa == 2){
				return "\""
		} else if( this.tasa == 3){
				return "3"
		}
	}

	zerofill_number(number, spaces){
		let integer = (number*100).toString().split(".")[0]
		let zeros = []
		for (var i = 0; i < spaces; i++) {
			zeros.push('0')
		}
		let zerofilled = zeros.join('') + integer
		return zerofilled.substr(zerofilled.length - number)
	}

	string_output(){
		let product_line = [
			this.parse_tasa(),
			this.zerofill_number(this.price_as_cents, 10),
			this.zerofill_number(this.cantidad, 5),
			"000",
			this.name
		].join('')
		if (this.discount > 0){
			return product_line + "\n" + zerofill_number(this.discount, 9)
		} else {
			return product_line
		}
	}

	test_string_output(){
		// Attributes to export
		let output_array = [
				this.name,
				this.amount.toString(),
				`$${this.price.toFixed(2)}`
		]

		// Add discount if it exists
		if(this.discount > 0){
			output_array.push("-" + this.discount.toString())
		}

		return output_array.join(' ')
	}

}
