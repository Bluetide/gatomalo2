'use strict'

process.env.NODE_ENV = 'test'

const {Invoice, Refund, Client, Product} = require('../model')
const {zerofill_integer} = require('../model/utils')
const {expect} = require('chai')

describe('Refund', function(){
	describe("#string_output", function(){
		it("Should work like the python version", function(){

			let name = "Inversiones Nativas, S.A."
			let address = "Lorem"
			let phone = "6667-7776"
			let ruc = "14200-161-138270"
			let invoice_number = "6363"

			let product = new Product("Chicheme Chorrerano", 300, 1, 100.45)
			product.set_discount_amount(0)
			let client = new Client(name, address, phone, ruc)
			let invoice = new Invoice(invoice_number, client, 0, [product])
			let refund = new Refund(invoice_number, invoice)

			let expected_result = `jFTFBX110002122-${zerofill_integer(parseInt(invoice_number), 8)}\n`
				+ `jS${name}\nj1Direccion: ${address}\nj2Telefono: ${phone}\njR${ruc}\n`
				+ `d${product.string_output()}\n`
				+ `3\nq-000000000\n101\n\r`

			expect(refund.string_output()).to.equal(expected_result)

		})
	})
})
