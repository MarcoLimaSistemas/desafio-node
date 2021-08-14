'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterLengthPasswordSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.string('password', 60).alter()
    })
  }

  down () {
    this.table('alter_length_passwords', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AlterLengthPasswordSchema
