'use strict'

module.exports = class Invoice{

	constructor(cloud_id, client_object, discount = 0, products=[]){
		this.client = client_object
		this.cloud_id = cloud_id
		this.discount = discount
		this.products = products
	}

	discount_string_output(){
		// Remove dot and fix by two decimal spaces
		let discount_int = (this.discount*100).toString().split(".")[0]
		let zerofilled = "00000000000" + discount_int
		return zerofilled.substr(zerofilled.length - 9)
	}

	product_string_output(){
		return this.products.map(item => item.string_output()).join('\n')
	}

	string_output(){
		return `${this.client.string_output()}\n` +
			`@${this.cloud_id.slice(-35)}\n` +
			`${this.product_string_output()}\n` +
			`3\n` +
			`q-${this.discount_string_output()}\n`
			`101\r\n`
	}

	test_string_output(){
		let lines = []
		lines.push( '800' + this.client.company_name)
		lines.push(this.products.map(item => "800" + item.string_output()).join("\n"))
		if( this.descuento != 0){
			lines.push(`800descuento: ${this.discount_string_output()}`)
		}
		lines.append('810FIN\r\n')
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
