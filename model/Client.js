'use strict'

module.exports = class Client {

	constructor(company_name='', address='', phone='', ruc='', dv=''){
		this.company_name = company_name.replace(/\n\s?/g, ", ") // Remove Newlines
		this.address = address.replace(/\n\s?/g, ", ") // Remove Newlines
		this.phone = phone
		this.ruc = ruc
		this.dv = dv
	}

	string_output(){
		let elements =
			`jS${this.company_name}\n` +
			`j1Direccion: ${this.address}\n` +
			`j2Telefono: ${this.phone}\n` +
			`jR${this.ruc}`
		return elements
	}
}
