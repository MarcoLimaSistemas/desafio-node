'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RenameFileNameSchema extends Schema {
  up () {
    this.table('images', (table) => {
      table.renameColumn('fine_name', 'file_name')
    })
    this.table('images', (table) => {
      table.string('file_name', 800).alter()
    })
  }

  down () {
    this.table('rename_file_names', (table) => {
      // reverse alternations
    })
  }
}

module.exports = RenameFileNameSchema
