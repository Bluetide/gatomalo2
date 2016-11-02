'use strict'

process.env.NODE_ENV = 'test'

const {zerofill_decimal} = require('../model/utils')
const {expect} = require('chai')

describe("utils", function(){
	describe('#zerofill_decimal()', function(){
		it('should work', function(){

			let output = zerofill_decimal(567.98, 6)
			let expected = "056798"
			expect(expected).to.equal(output)

		})
	})
})
