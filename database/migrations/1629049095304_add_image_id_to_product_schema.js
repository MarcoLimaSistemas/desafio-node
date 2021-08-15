'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddImageIdToProductSchema extends Schema {
  up () {
    this.table('products', (table) => {
      table.integer('image_id').unsigned().references('id').inTable('images')
    })
  }

  down () {
    this.table('add_image_id_to_products', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddImageIdToProductSchema
