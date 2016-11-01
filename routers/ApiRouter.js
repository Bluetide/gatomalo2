'use strict'

const ApiRouter = require('koa-router')({
	prefix: '/api'
})

ApiRouter.get('/', function*(){
	this.body = "Lorem Ipsum"
})

module.exports = ApiRouter
