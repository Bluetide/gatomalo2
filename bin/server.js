// Libaries
const Koa = require('koa')
const app = new Koa()
const morgan = require('koa-morgan')
const serve = require('koa-static')
const mount = require('koa-mount')

// Modules
const {sequelize} = require('../orm')
const ApiRouter = require('../routers/ApiRouter')
const AuthorizationMiddleware = require('../routers/AuthorizationMiddleware')
const RootRouter = require('../routers/RootRouter')

// Mount Routes
app.use(morgan('combined'))
app.use(AuthorizationMiddleware())
app.use(RootRouter.routes())
app.use(ApiRouter.routes())

// Mount Static Dependencies and normalize addressses
app.use(mount('/assets', serve('./public')))
app.use(mount('/assets/javascripts', serve('./node_modules/jquery/dist')))
app.use(mount('/assets/javascripts', serve('./node_modules/tether/dist/js')))
app.use(mount('/assets/javascripts', serve('./node_modules/bootstrap/dist/js')))

// Start the ORM
sequelize.sync().then(() =>{

	//Start the server
	const server_port = 5000
	console.log(`Server running on port ${server_port}`)
	app.listen(server_port)
})
