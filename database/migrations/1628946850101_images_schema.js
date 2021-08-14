'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImagesSchema extends Schema {
  up () {
    this.create('images', (table) => {
      table.increments()
      table.string('name', 45)
      table.string('fine_name', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('images')
  }
}

module.exports = ImagesSchema
