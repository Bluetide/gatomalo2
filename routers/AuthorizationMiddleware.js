const auth = require('koa-basic-auth')
const compose = require('koa-compose')

// Private data saved in an nConf
const nconf = require('nconf')
	.file({file:'./private.json'})
	.env()

// Throws a message if the user is unauthorized
let message_middleware = async function(ctx, next){
	try {
		await next()
	} catch (err) {
		if (401 == err.status) {

			// Print a message for unauthorized enties
			ctx.status = 401
			ctx.set('WWW-Authenticate', 'Basic')
			ctx.body = '401 unauthorized'

		} else {
			throw err
		}
	}
}

// Configure the auth module
let username = nconf.get('username')
let password = nconf.get('password')
let auth_middleware = auth({
	name:username,
	pass:password,
})

// Use compose to merge both middleware
module.exports = () => compose([message_middleware, auth_middleware])
