'use strict'

const app = require('koa')()
const Router = require('koa-router')
const pug = require('koa-pug')
const morgan = require('koa-morgan')
const serve = require('koa-static')
const mount = require('koa-mount')

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

// Mount Static Dependencies and normalize addressses
app.use(mount('/assets', serve(__dirname + '/public')))
app.use(mount('/assets/javascripts', serve(__dirname + '/node_modules/jquery/dist')))
app.use(mount('/assets/javascripts', serve(__dirname + '/node_modules/tether/dist/js')))
app.use(mount('/assets/stylesheets', serve(__dirname + '/node_modules/tether/dist/css')))
app.use(mount('/assets/javascripts', serve(__dirname + '/node_modules/bootstrap/dist/js')))
app.use(mount('/assets/stylesheets', serve(__dirname + '/node_modules/bootstrap/dist/css')))

app.listen(5000)
