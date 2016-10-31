'use strict'

const app = require('koa')()
const Router = require('koa-router')
const pug = require('pug')

const apiRouter = require('./apiRouter')
const indexTemplate = pug.compileFile('./templates/index.pug')
const rootRouter = new Router()

rootRouter.get('/', function*(){
	this.body = indexTemplate()
})

app.use(rootRouter.routes())
app.use(apiRouter.routes())

app.listen(5000)
