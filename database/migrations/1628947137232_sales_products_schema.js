'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SalesProductsSchema extends Schema {
  up () {
    this.create('sales_products', (table) => {
      table.increments()
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.integer('sales_id').unsigned().references('id').inTable('sales')
      table.integer('quantity')
      table.integer('total_price')
      table.timestamps()
    })
  }

  down () {
    this.drop('sales_products')
  }
}

module.exports = SalesProductsSchema
