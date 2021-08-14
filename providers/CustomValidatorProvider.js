"use strict";

const { ServiceProvider } = require("@adonisjs/fold");
const { ioc } = require("@adonisjs/fold");

const existsFn = async (data, field, message, args, get) => {
  const Database = ioc.use("Database");

  const value = get(data, field);
  if (!value) {
    return;
  }
  const [table, column] = args;
  const row = await Database.table(table).where(column, value).first();

  if (!row) {
    throw message;
  }
};

const associated = async (data, field, message, args, get) => {
  const Database = ioc.use("Database");

  const value = get(data, field);
  if (!value) {
    return;
  }
  const [table, column] = args;
  const row = await Database.table(table).where(column, value).first();

  if (row) {
    throw message;
  }
};

class CustomValidatorProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    //
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    const Validator = ioc.use("Validator");
    Validator.extend("exists", existsFn);
    Validator.extend("associated", associated);
  }
}

module.exports = CustomValidatorProvider;
