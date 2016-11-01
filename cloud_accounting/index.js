'use strict'

const Promise = require('bluebird')
const Request = Promise.promisifyAll(require('request'))

const nconf = require('nconf')
	.argv()
	.env()
	.file({file: __dirname + '/private.json'})

const zoho_url_invoices = 'https://books.zoho.com/api/v3/invoices'

module.exports = {
	getInvoices(page=1){
		return Request.getAsync({
			url: zoho_url_invoices,
			qs: {
				'authtoken': nconf.get('zoho_auth'),
				'organization_id': nconf.get('zoho_org'),
				'page': page
			}
		})
	}
}
