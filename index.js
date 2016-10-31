'use strict'

const app = require('koa')()
const Router = require('koa-router')
const pug = require('koa-pug')

const pug_middleware = new pug({
	viewPath: './templates',
	debug: false,
	pretty: false,
	compileDebug: false,
	locals: {},
	app: app
})

// Routers
const apiRouter = require('./apiRouter')
const rootRouter = new Router()

rootRouter.get('/', function*(){
	this.render('index', {})
})

app.use(rootRouter.routes())
app.use(apiRouter.routes())

app.listen(5000)
