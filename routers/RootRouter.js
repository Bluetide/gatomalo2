const Router = require('koa-router')
const pug = require('pug')
const _ = require('lodash')
const moment = require('moment')

const cloud_accounting = require('../cloud_accounting')
const {printed_invoice} = require('../orm')

// Generates the Root View
async function root_function(ctx){
	let current_page = ctx.params.page || 1
	let response = await cloud_accounting.getInvoices(current_page)
	let parsed_response = JSON.parse(response.body)
	let printed_invoices = await printed_invoice.all()

	// Render Response
	let sent_to_view = _.merge(parsed_response, {
		printed_invoices: printed_invoices,
		moment: moment,
		version: process.env.npm_package_version,
	})
	ctx.body = pug.renderFile('./templates/index.pug', sent_to_view)
}

const RootRouter = new Router()
RootRouter.get('index'		,'/'			, root_function)
RootRouter.get('invoices'	,'/:page'	, root_function)

module.exports = RootRouter
