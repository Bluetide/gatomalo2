'use strict'

process.env.NODE_ENV = 'test'

const {Client} = require('../model')
const {expect} = require('chai')

describe('Client', function() {

  describe('#string_output()', function() {
    it('should output correctly', function() {

      let name = 'Lorem Ipsum'
      let address = 'Second Star to the right'
      let phone = '6666-6666'
      let ruc = '23742364262348234'
      let dv = '54'

      let test_client = new Client(name, address, phone, ruc, dv)
      let expected_result =
        `jS${name}\n` +
        `j1Direccion: ${address}\n` +
        `j2Telefono: ${phone}\n` +
        `jR${ruc}`

      expect(test_client.string_output()).to.equal(expected_result)
    })
  })
})
