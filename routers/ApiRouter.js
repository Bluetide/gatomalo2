'use strict'

const cloud_accounting = require('../cloud_accounting')
const ApiRouter = require('koa-router')({
	prefix: '/api'
})

ApiRouter.get('/', function*(){
	let response = yield cloud_accounting.getInvoices()
	this.body = response.body
})

module.exports = ApiRouter
