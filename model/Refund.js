'use strict'

const {zerofill_decimal, zerofill_integer} = require('./utils')

module.exports = class Refund{

	constructor(legacy_id, invoice_model){
		this.legacy_id = parseInt(legacy_id)
		this.invoice = invoice_model
	}

	products_as_string(){
		return this.invoice.products
			.map(item => ('d' + item.string_output() ))
			.join("\n")
	}

	string_output(){
		let lines = [
			`jFTFBX110002122-${zerofill_integer(this.legacy_id, 8)}`,
			this.invoice.client.string_output(),
			this.products_as_string(),
			"3",
			`q-${zerofill_decimal(this.invoice.discount, 9)}`,
			"101\n\r"
		]

		return lines.join("\n")
	}

}
