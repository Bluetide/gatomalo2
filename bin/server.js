'use strict'

const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const pug = require('pug')
const morgan = require('koa-morgan')
const serve = require('koa-static')
const mount = require('koa-mount')
const cloud_accounting = require('../cloud_accounting')
const _ = require('lodash')

// Routers
const ApiRouter = require('../routers/ApiRouter')
const RootRouter = new Router()

const root_generator = async function(ctx){
	let current_page = ctx.params.page || 1
	let response = await cloud_accounting.getInvoices(current_page)
	let parsed_response = JSON.parse(response.body)
	ctx.body = pug.renderFile(
		'./templates/index.pug',
		_.merge(parsed_response, {
		})
	)
}

RootRouter.get('index', 	'/'			, root_generator)
RootRouter.get('invoices','/:page', root_generator)

app.use(morgan('combined'))
app.use(RootRouter.routes())
app.use(ApiRouter.routes())

// Mount Static Dependencies and normalize addressses
app.use(mount('/assets', serve('./public')))
app.use(mount('/assets/javascripts', serve('./node_modules/jquery/dist')))
app.use(mount('/assets/javascripts', serve('./node_modules/tether/dist/js')))
app.use(mount('/assets/javascripts', serve('./node_modules/bootstrap/dist/js')))

app.listen(5000)
