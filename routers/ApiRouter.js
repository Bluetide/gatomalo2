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

ApiRouter.post('print_invoice', '/invoice/:invoice_id/print', function*(){
	let result = yield printer("810 ID:" + this.params.invoice_id)
	this.body = result
})

module.exports = ApiRouter
