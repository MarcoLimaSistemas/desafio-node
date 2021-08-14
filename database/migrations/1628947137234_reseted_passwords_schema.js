"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ResetedPasswordsSchema extends Schema {
  up() {
    this.create("reseted_passwords", table => {
      table.increments();
      table.string("email", 255).nullable();
      table.string("code", 255).nullable();
      table.boolean("status").defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop("reseted_passwords");
  }
}

module.exports = ResetedPasswordsSchema;
