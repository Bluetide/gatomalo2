'use strict'

const app = require('koa')()
const Router = require('koa-router')
const pug = require('koa-pug')
const morgan = require('koa-morgan')

const pug_middleware = new pug({
	viewPath: './templates',
	debug: false,
	pretty: false,
	compileDebug: false,
	locals: {},
	app: app
})

// Routers
const ApiRouter = require('./routers/ApiRouter')
const RootRouter = new Router()

RootRouter.get('/', function*(){
	this.render('index', {})
})

app.use(morgan.middleware('combined'))
app.use(RootRouter.routes())
app.use(ApiRouter.routes())
app.use(require('koa-static')('./public'))

app.listen(5000)
