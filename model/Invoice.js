'use strict'

const {zerofill_decimal} = require('./utils')

module.exports = class Invoice{

	constructor(cloud_id, client_object, discount = 0, products=[]){
		this.client = client_object
		this.cloud_id = cloud_id
		this.discount = discount
		this.products = products
	}

	product_string_output(){
		return this.products.map(item => item.string_output()).join('\n')
	}

	string_output(){
		return `${this.client.string_output()}\n` +
			`@${this.cloud_id.slice(-35)}\n` +
			`${this.product_string_output()}\n` +
			`3\n` +
			`q-${zerofill_decimal(this.discount, 9)}\n` +
			`101\r\n`
	}

	test_string_output(){
		let lines = []
		lines.push( '800' + this.client.company_name)
		lines.push(this.products.map(item => "800" + item.string_output()).join("\n"))
		if( this.descuento != 0){
			lines.push(`800descuento: ${zerofill_decimal(this.discount, 9)}`)
		}
		lines.push('810FIN\r\n')
		return lines.join("\n")
	}

	string_output_for_refund(){
		return [
			this.client.string_output(),
			this.product_string_output(),
			"\r\n"
		].join("\n")
	}
}
