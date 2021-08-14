const { validateAll } = use("Validator");

/**
 * @typedef {Object} ValidatorMessage
 * @property {string} message message from validation
 * @property {string} field field in property is invalid
 * @property {string} validation rule that failed
 */

/**
 * @typedef {Object} ValidateParams
 * @property {Object} user
 * @property {Object} [profesional]
 */

module.exports = {
  /**
   * @param {ValidateParams} arg0
   * @returns {Promise<Array<ValidatorMessage>>}
   */
  async existAssociatedProduct(id) {
    const rules = {
      id: 'required|associated:products, categorie_id'
    };

    const messageRequired = {
      required: "O campo é obrigatório.",
      associated: "Categoria está associada a um ou mais produtos"
    };

    const responseValidate = await validateAll(
      { id },
      rules,
      messageRequired,
    );

    if (responseValidate.fails()) {
      const invalidFieldsWithMessage = responseValidate.messages();
      return invalidFieldsWithMessage;
    } else {
      return [];
    }
  },
};
