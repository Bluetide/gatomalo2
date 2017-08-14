const Sequelize = require('sequelize')

const sequelize = new Sequelize('postgres://postgres:bluetide@gatomalo2_database_1/gatomalo')
const printed_invoice = sequelize.define('invoice', {
  zoho_id: Sequelize.STRING,
})

module.exports = {
  sequelize: sequelize,
  printed_invoice: printed_invoice
}
