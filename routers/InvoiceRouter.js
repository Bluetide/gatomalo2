const cloud_accounting = require('../cloud_accounting')
const printer = require('../printer')
const {Refund} = require('../model')
const body = require('koa-body')
const router = require('koa-router')({
	prefix: '/api/invoice'
})

// Endpoint: Print Invoice
router.post('print_invoice', '/:invoice_id/print', async (ctx) => {
	let invoice = await cloud_accounting.getInvoice(ctx.params.invoice_id)
	let result = await printer(invoice.string_output(), ctx.params.invoice_id)
	ctx.body = invoice.string_output()
})

// Endpoint: Refund Invoice
router.post('refund_invoice', '/:invoice_id/refund', body(), async (ctx) => {
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

// Endpoint: Print Test Invoice
router.post('test_invoice', '/:invoice_id/test', async (ctx) => {
	let invoice = await cloud_accounting.getInvoice(ctx.params.invoice_id)
	let result = await printer(invoice.test_string_output())
	ctx.body = result
})

module.exports = router
