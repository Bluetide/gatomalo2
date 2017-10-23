'use strict'

const {zerofill_decimal, zerofill_integer} = require('./utils')

module.exports = class Product{

	constructor(name='', amount=0, tasa=0, price=0){
		this.name = name.replace(/\n\s?/g, " ") // Remove Newlines
		this.amount = Math.floor(amount)
		this.tasa = tasa
		this.price = price

		this.discount_is_percentage = false
	}

	set_discount_amount(discount=0, is_percentage=false){
		// printer bug: does not accept 100% discount :(
		if (is_percentage && discount >= 100){
			this.discount = this.price
			this.discount_is_percentage = false
			return
		}
		this.discount = discount
		this.discount_is_percentage = is_percentage
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

	string_output(){
		let product_line = [
			this.parse_tasa(),
			zerofill_decimal(this.price, 10),
			zerofill_integer(this.amount, 5),
			"000",
			this.name.substring(0, 116)
		].join('')
		if (this.discount > 0){
			// Print percentage-based discount
			if (this.discount_is_percentage){
				return `${product_line}\np-${zerofill_decimal(this.discount, 4)}`

			// Print static quantity discount
			} else {
				return `${product_line}\nq-${zerofill_decimal(this.discount, 9)}`
			}
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
