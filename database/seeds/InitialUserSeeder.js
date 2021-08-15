'use strict'

/*
|--------------------------------------------------------------------------
| InitialUserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/


const User = use('App/Models/User')

class InitialUserSeeder {
  async run () {
    
    await User.createMany([
      {
        name: 'teste', role: 'admin', email: 'admin@teste.com', password: '123123'
      },
      {
        name: 'teste', role: 'client', email: 'client@teste.com', password: '123123'
      },
    ])
  }
}

module.exports = InitialUserSeeder
