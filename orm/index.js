const Sequelize = require('sequelize')

const sequelize = new Sequelize('sqlite://database/gatomalo.sqlite')
const printed_invoice = sequelize.define('invoice', {
  zoho_id: Sequelize.STRING,
})

module.exports = {
  sequelize: sequelize,
  printed_invoice: printed_invoice
}
