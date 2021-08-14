'use strict'

class UpdateStokeBalance {
  
  async fails (errorMessages) {
    return this.ctx.response.status(400).send(errorMessages)
  }

  get rules () {
    return {
      operation_type: 'required|in:out,in',    
      operation_value: 'required|integer',
    }
  }


  get messages () {
    return {
      'operation_type.required': 'Tipo de operação é obrigatório ',     
      'operation_type.in': "Tipo de operação é inválida ('in' ou 'out').",     
      'operation_value.required': 'Valor é obrigatório.',     
      'operation_value.integer': 'O valor deve ser inteiro',
    }
  }
}

module.exports = UpdateStokeBalance
