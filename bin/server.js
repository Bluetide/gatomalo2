// Libaries
const Koa = require('koa')
const app = new Koa()
const morgan = require('koa-morgan')

// Modules
const {sequelize} = require('../orm')
const ApiRouter = require('../routers/ApiRouter')
const AuthorizationMiddleware = require('../routers/AuthorizationMiddleware')
const RootRouter = require('../routers/RootRouter')
const ReportRouter = require('../routers/ReportRouter')
const StaticFileMiddleware = require('../routers/StaticFileMiddleware')

// Mount Routes
app.use(morgan('combined'))
app.use(AuthorizationMiddleware())
app.use(RootRouter.routes())
app.use(ApiRouter.routes())
app.use(ReportRouter.routes())
app.use(StaticFileMiddleware())

// Start the ORM
sequelize.sync().then(() =>{

	//Start the server
	const server_port = 5000
	console.log(`Server running on port ${server_port}`)
	app.listen(server_port)
})
