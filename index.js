const koa = require('koa')
const app = koa()
const pug = require('pug')

const indexTemplate = pug.compileFile('./templates/index.pug')

app.use(function*(){
	this.body = indexTemplate()
})

app.listen(5000)
