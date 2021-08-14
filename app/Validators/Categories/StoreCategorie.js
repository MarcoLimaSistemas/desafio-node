'use strict'

class StoreCategorie {
  
  async fails (errorMessages) {
    return this.ctx.response.status(400).send(errorMessages)
  }

  get rules () {
    return {
      name: 'required|min:3|max:45|unique:categories',     
    }
  }


  get messages () {
    return {
      'name.required': 'Nome é obrigatório.',
      'name.min': 'Nome muito curto.',
      'name.min': 'Nome muito longo.',
      'name.unique': 'Categoria já cadastrada'
    }
  }
}

module.exports = StoreCategorie
