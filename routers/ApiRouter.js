'use strict'

const cloud_accounting = require('../cloud_accounting')
const printer = require('../printer')
const ApiRouter = require('koa-router')({
	prefix: '/api'
})

ApiRouter.get('invoice_page', '/:page', function*(){
	let page = this.params.page || 1
	let response = yield cloud_accounting.getInvoices(page)
	this.body = JSON.parse(response.body)
})

ApiRouter.post('test_invoice', '/invoice/:invoice_id/test', function*(){
	let invoice = yield cloud_accounting.getInvoice(this.params.invoice_id)
	let result = yield printer(invoice.test_string_output())
	this.body = result
})

module.exports = ApiRouter
