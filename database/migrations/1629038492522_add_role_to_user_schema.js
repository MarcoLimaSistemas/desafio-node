'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
class AddRoleToUserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table
      .enu('role', ['admin', 'client'])
      .defaultTo('client');
    })
    
  }

  down () {
    this.table('add_role_to_users', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddRoleToUserSchema
