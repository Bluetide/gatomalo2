'use strict'

const cloud_accounting = require('../cloud_accounting')
const ApiRouter = require('koa-router')({
	prefix: '/api'
})

ApiRouter.get('invoice_page', '/:page', function*(){
	let page = this.params.page || 1
	let response = yield cloud_accounting.getInvoices(page)
	this.body = JSON.parse(response.body)
})

ApiRouter.post('print_invoice', '/invoice/:invoice_id/print', function*(){
	this.body = "Lorem Ipsum" + this.params.invoice_id
})

module.exports = ApiRouter
