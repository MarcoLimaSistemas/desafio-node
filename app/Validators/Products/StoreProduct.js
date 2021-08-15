'use strict'

class StoreProduct {
  
  async fails (errorMessages) {
    return this.ctx.response.status(400).send(errorMessages)
  }

  get rules () {
    return {
      name: 'required|min:3|max:45|unique:products',
      stoke_balance: 'required|integer',
      //Todo produto cadastrado precisa obrigatoriamente pertencer a uma categoria.
      categorie_id: 'required|exists:categories,id',
      image_id: 'required|exists:images,id',
      price: 'required|integer',
    }
  }


  get messages () {
    return {
      'name.required': 'Nome é obrigatório.',
      'name.min': 'Nome muito curto.',
      'name.min': 'Nome muito longo.',
      'name.unique': 'Produto já cadastrado',
      'stoke_balance.required': 'Balanço é obrigatório',
      'categorie_id.required': 'Todo produto cadastrado precisa obrigatoriamente pertencer a uma categoria.',
      'image_id.required': 'Todo produto cadastrado precisa obrigatoriamente ter uma imagem',
      'stoke_balance.integer': 'Balanço deve ser inteiro',
      'categorie_id.exists': 'Categoria inexistente',
      'image_id.exists': 'Imagem inexistente',
      'price.required': 'O preço é obrigatório',
      'price.integer': 'O preço deve ser em centavos',
    }
  }
}

module.exports = StoreProduct
