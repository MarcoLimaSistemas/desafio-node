'use strict'

class StoreOrder {
  
  async fails (errorMessages) {
    return this.ctx.response.status(400).send(errorMessages)
  }
  

  get rules () {
    return {
        'products': 'required|array|min:1',
        'products.*.id': 'required|exists:products,id',
        'products.*.quantity': 'required|integer',
    }
  }


  get messages () {
    return {
      'products.required': 'O campo de produtos é obrigatório.',
      'products.array': 'O campo de produtos deve ser uma lista.',
      'products.*.id.required': 'O id do produto é obrigatório.',
      'products.*.id.exists': 'O produto não existe.',
      'products.*.quantity.required': 'A quantidade deve ser informada.',
      'products.*.quantity.integer': 'A quantidade deve ser um numero inteiro.',
    }
  }
}

module.exports = StoreOrder
