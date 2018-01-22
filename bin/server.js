// Libraries
const Koa = require('koa')
const app = new Koa()
const morgan = require('koa-morgan')

// Modules
const {sequelize} = require('../orm')
const InvoiceRouter = require('../routers/InvoiceRouter')
const AuthorizationMiddleware = require('../routers/AuthorizationMiddleware')
const RootRouter = require('../routers/RootRouter')
const ReportRouter = require('../routers/ReportRouter')
const StaticFileMiddleware = require('../routers/StaticFileMiddleware')

// Mount Routes
app.use(morgan('combined'))
app.use(AuthorizationMiddleware())
app.use(RootRouter.routes())
app.use(InvoiceRouter.routes())
app.use(ReportRouter.routes())
app.use(StaticFileMiddleware())

// Start the ORM
sequelize.sync().then(() =>{

	//Start the server
	const server_port = 5001
	console.log(`Server running on port ${server_port}`)
	app.listen(server_port)
})
