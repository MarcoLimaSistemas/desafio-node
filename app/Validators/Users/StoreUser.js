'use strict'

class StoreUser {
  
  async fails (errorMessages) {
    return this.ctx.response.status(400).send(errorMessages)
    
  }

  get rules () {
    return {
      name: 'required|min:3|max:45',
      email: 'required|email|unique:users',
      role: 'required|in:admin,client',
      password: 'required|confirmed',
    }
  }


  get messages () {
    return {
      'name.required': 'Nome é obrigatório.',
      'name.min': 'Nome muito curto.',
      'name.min': 'Nome muito longo.',
      'email.required': 'Campo email é obrigatório.',
      'email.email': 'Email inválido.',
      'email.unique': 'Email já cadastrado',
      'password.required': 'Forneça uma senha',
      'password.confirmed': 'Senhas não conferem',
      'role.required': 'Função do usuário não especificada',
      'role.in': 'Informe o valor válido (admin,client)'
    }
  }
}

module.exports = StoreUser
