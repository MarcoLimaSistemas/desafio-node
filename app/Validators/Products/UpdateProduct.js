'use strict'

class UpdateProduct {
  
  async fails (errorMessages) {
    return this.ctx.response.status(400).send(errorMessages)
  }

  get rules () {
    return {
      name: 'required|min:3|max:45',
      stoke_balance: 'required|integer',
      categorie_id: 'exists:categories,id',
      price: 'required|integer',
    }
  }


  get messages () {
    return {
      'name.required': 'Nome é obrigatório.',
      'name.min': 'Nome muito curto.',
      'name.min': 'Nome muito longo.',     
      'stoke_balance.required': 'Balanço é obrigatório',
      'stoke_balance.integer': 'Balanço deve ser inteiro',
      'categorie_id.exists': 'Categoria inexistente',
      'price.required': 'O preço é obrigatório',
      'price.integer': 'O preço deve ser em centavos',
    }
  }
}

module.exports = UpdateProduct
