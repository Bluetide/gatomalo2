'use strict'

const cloud_accounting = require('../cloud_accounting')
const printer = require('../printer')
const {Refund} = require('../model')
const KoaBody = require('koa-body')()
const ApiRouter = require('koa-router')({
	prefix: '/api'
})

ApiRouter.get('invoice_page', '/:page', async function(ctx){
	let page = ctx.params.page || 1
	let response = await cloud_accounting.getInvoices(page)
	ctx.body = JSON.parse(response.body)
})

ApiRouter.post('print_invoice', '/invoice/:invoice_id/print', async function(ctx){
	let invoice = await cloud_accounting.getInvoice(ctx.params.invoice_id)
	let result = await printer(invoice.string_output(), ctx.params.invoice_id)
	ctx.body = invoice.string_output()
})

ApiRouter.post('refund_invoice', '/invoice/:invoice_id/refund',
  KoaBody, async function(ctx){
	let legacy_id = ctx.request.body.legacy_id
	if (!legacy_id){
		ctx.response.status = 400
		ctx.body = "Missing legacy_id Param"
		return
	}

	let invoice = await cloud_accounting.getInvoice(ctx.params.invoice_id)
	let refund_model = new Refund(legacy_id, invoice)
	let result = await printer(refund_model.string_output())
	ctx.body = refund_model.string_output()
})

ApiRouter.post('test_invoice', '/invoice/:invoice_id/test', async function(ctx){
	let invoice = await cloud_accounting.getInvoice(ctx.params.invoice_id)
	let result = await printer(invoice.test_string_output())
	ctx.body = result
})

module.exports = ApiRouter
