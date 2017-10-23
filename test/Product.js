'use strict'

process.env.NODE_ENV = 'test'

const {Product} = require('../model')
const {expect} = require('chai')

describe("Product", function(){

	describe("#string_output()", function(){
		it("Should output correctly", function(){
			let name = "Lorem Ipsum Lorem Ipsum"
			let tasa = 0
			let amount = 45.678
			let price = 657.89
			let discount = 45.8567

			let product = new Product(name, amount, tasa, price)
			product.set_discount_amount(discount)
			let expected_result =
				" 000006578900045000Lorem Ipsum Lorem Ipsum\nq-000004585"

			expect(product.string_output()).to.equal(expected_result)

		})

		it("Should work with different tax rates and formats", function(){

			let name = 'Chicheme Chorrerano'
			let tasa = 1
			let amount = 1
			let price = 300
			let discount = 0

			let product = new Product(name, amount, tasa, price)
			product.set_discount_amount(discount)
			let expected_result = "!000003000000001000Chicheme Chorrerano"

			expect(product.string_output()).to.equal(expected_result)
		})

		it("Should truncate product name to 116 characters", () => {

			var longName = ''
			for (var index = 0; index < 150; index++) {
				longName = longName.concat(index%10)
			}
			let tasa = 1
			let amount = 1
			let price = 300
			let discount = 0

			let product = new Product(longName, amount, tasa, price)
			product.set_discount_amount(discount)
			let expected_result = "!00000300000000100001234567890123456789"
				+ "0123456789012345678901234567890123456789012345678901234"
				+ "56789012345678901234567890123456789012345"

			expect(product.string_output()).to.equal(expected_result)
		})

		// EDGE CASE: The printer does not accept 100% discount on products! Must fallback to absolute amount.
		it('Should fallback to absolute amount discount when discount amount is 100%', () => {

			let product = new Product('Chicheme Chorrerano', 1, 1, 440)
			product.set_discount_amount(100, true)
			let result_text = '!000004400000001000Chicheme Chorrerano'
				+ '\nq-000044000'

			expect(product.string_output()).to.equal(result_text)

		})
	})

})
