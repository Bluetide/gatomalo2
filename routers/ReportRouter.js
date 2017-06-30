const printer = require('../printer')
const router = require('koa-router')({
	prefix: '/api/report'
})

// Endpoint: X Report
router.post('/x', async (ctx) => {
	ctx.body = await printer('I0X')
})

// Endpoint: Z Report
router.post('/z', async (ctx) => {
	ctx.body = await printer('I0Z')
})

module.exports = router
