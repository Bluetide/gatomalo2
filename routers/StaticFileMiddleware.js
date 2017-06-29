const serve = require('koa-static')
const mount = require('koa-mount')
const compose = require('koa-compose')

// Allow access to static files
let mounts = [
	mount('/assets/', serve('./public')),
	mount('/assets/javascripts', serve('./node_modules/jquery/dist')),
	mount('/assets/javascripts', serve('./node_modules/tether/dist/js')),
	mount('/assets/javascripts', serve('./node_modules/bootstrap/dist/js')),
]

module.exports = () => compose(mounts)
