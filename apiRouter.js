'use strict'

const apiRouter = require('koa-router')({
	prefix: '/api'
})

apiRouter.get('/', function*(){
	this.body = "Lorem Ipsum"
})

module.exports = apiRouter
