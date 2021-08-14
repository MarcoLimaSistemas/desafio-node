'use strict'

class UpdateUser {
  
  async fails (errorMessages) {
    return this.ctx.response.status(400).send(errorMessages)
  }

  get rules () {
    return {
      name: 'required|min:3|max:45',
      email: 'email',
    
    }
  }


  get messages () {
    return {
      'name.required': 'Nome é obrigatório.',
      'name.min': 'Nome muito curto.',
      'name.min': 'Nome muito longo.',     
      'email.email': 'Email inválido.'
    }
  }
}

module.exports = UpdateUser
