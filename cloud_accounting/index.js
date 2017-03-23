'use strict'

const Promise = require('bluebird')
const _ = require('lodash')
const Request = Promise.promisifyAll(require('request'))
const {Client, Invoice, Product} = require('../model')

const nconf = require('nconf')
	.file({file:'./private.json'})
	.env()

const zoho_url_invoices = 'https://books.zoho.com/api/v3/invoices'
const zoho_url_contacts = 'https://books.zoho.com/api/v3/contacts'
const zoho_authtoken = nconf.get('zoho_auth')
const zoho_organization_id = nconf.get('zoho_org')

const getInvoices = function(page=1){
	return Request.getAsync({
		url: zoho_url_invoices,
		qs: {
			'authtoken': zoho_authtoken,
			'organization_id': zoho_organization_id,
			'page': page
		}
	})
}

const getInvoiceDetail = function(invoice_id){
	return Request.getAsync({
		url: `${zoho_url_invoices}/${invoice_id}` ,
		qs:{
			'authtoken': zoho_authtoken,
			'organization_id': zoho_organization_id,
		}
	})
}

const getContactDetail = function(contact_id){
	return Request.getAsync({
		url: `${zoho_url_contacts}/${contact_id}`,
		qs: {
			'authtoken':zoho_authtoken,
			'organization_id':zoho_organization_id
		}
	})
}

const parse_invoice_coroutine = async function(data){

	// Variables
	let customer_name = data["invoice"]["customer_name"]
	let address = data["invoice"]["billing_address"]["address"]
	let invoice_id = data['invoice']['invoice_id']

	// If the global discount is a percentage, parse it
	var raw_discount = data['invoice']['discount']
	if(_.isString(raw_discount)){
		let percentage = parseFloat(raw_discount.replace("%", ""))/100
		raw_discount = data['invoice']['sub_total'] * percentage
	}

	// Global adjustment is calculated using both the global discount and the adjustment
	let global_discount = raw_discount - data['invoice']['adjustment']

	// Try to get the extended client data for 'RUC' and phone information
	var client_model
	try {
		let contact_id = data['invoice']['customer_id']
		let raw_response = await getContactDetail(contact_id)
		client_model = parse_contact_coroutine(JSON.parse(raw_response.body))
	} catch (e) {
		// Safe Defaults
		client_model = new Client(customer_name, address)
	}

	// Build Models
	let invoice_model = new Invoice(invoice_id, client_model, global_discount)
	invoice_model.products = data["invoice"]["line_items"].map(translate_product)

	return invoice_model
}

const parse_contact_coroutine = function(raw_data){

	// Build Model
	let client_model = new Client(
			raw_data['contact']['contact_name'],
			raw_data['contact']['billing_address']['address']
		)

	// Parse custom fields
	for(let cf of raw_data['contact']['custom_fields']){
			if (cf['label'] == 'Razón Social:'){
				client_model.company_name = cf['value']
			} else if (cf['label'] == 'RUC:') {
				client_model.ruc = cf['value']
			} else if (cf['label'] == 'DV:') {
				client_model.dv = cf['value']
			}
	}

	// Parse Phone number
	for(let contact_person of raw_data['contact']['contact_persons']){
		if (contact_person['is_primary_contact']){
			client_model.phone = contact_person['phone']
		}
	}

	// Return
	return client_model
}

const translate_product = function(product){

	// Parse Tax Value
	var tasa
	if (product["tax_percentage"] == 7){
		tasa = 1
	} else if (product["tax_percentage"] == 0){
		tasa = 0
	} else if (product["tax_percentage"] == 10){
		tasa = 2
	} else {
		tasa = 'error'
	}

	let parameters = [
		product['name'], product['quantity'], tasa, product['rate']
	]

	// Parse discount value
	if(product['discount'] != 0){
		parameters.push(product['discount'])
	}

	return new Product(...parameters)

}

module.exports = {
	getInvoices: getInvoices,
	getInvoiceDetail: getInvoiceDetail,
	getContactDetail: getContactDetail,
	getInvoice: async function(invoice_id){
		let raw_response = await getInvoiceDetail(invoice_id)
		return await parse_invoice_coroutine(JSON.parse(raw_response.body))
	},
	getClient: async function(contact_id){
		let raw_response = await getContactDetail(contact_id)
		return await parse_contact_coroutine(JSON.parse(raw_response.body))
	}
}
