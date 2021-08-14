"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class ResetedPassword extends Model {
  static get hidden() {
    return ["status", "created_at", "updated_at", "code"];
  }
}

module.exports = ResetedPassword;
