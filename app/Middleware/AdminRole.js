"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
class AdminRole {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ response, auth }, next) {
    const user = await auth.getUser();

    if (!user.role || user.role !== "admin")
      return response.status(401).send({
        message: "Função disponível apenas com privilégios administrativos",
      });
    await next();
  }
}

module.exports = AdminRole;
