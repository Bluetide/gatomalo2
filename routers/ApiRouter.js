'use strict'

const cloud_accounting = require('../cloud_accounting')
const printer = require('../printer')
const {Refund} = require('../model')
const KoaBody = require('koa-body')()
const ApiRouter = require('koa-router')({
	prefix: '/api'
})

ApiRouter.get('invoice_page', '/:page', function*(){
	let page = this.params.page || 1
	let response = yield cloud_accounting.getInvoices(page)
	this.body = JSON.parse(response.body)
})

ApiRouter.post('print_invoice', '/invoice/:invoice_id/print', function*(){
	let invoice = yield cloud_accounting.getInvoice(this.params.invoice_id)
	let result = yield printer(invoice.string_output())
	this.body = invoice.string_output()
})

ApiRouter.post('refund_invoice', '/invoice/:invoice_id/refund', KoaBody, function*(){
	let legacy_id = this.request.body.legacy_id
	if (!legacy_id){
		this.response.status = 400
		this.body = "Missing legacy_id Param"
		return
	}

	let invoice = yield cloud_accounting.getInvoice(this.params.invoice_id)
	let refund_model = new Refund(legacy_id, invoice)
	let result = yield printer(refund_model.string_output())
	this.body = refund_model.string_output()
})

ApiRouter.post('test_invoice', '/invoice/:invoice_id/test', function*(){
	let invoice = yield cloud_accounting.getInvoice(this.params.invoice_id)
	let result = yield printer(invoice.test_string_output())
	this.body = result
})

module.exports = ApiRouter
