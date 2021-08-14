'use strict'

const User = use('App/Models/User')

class UserController {

    async store({ request }) {  
        const body = request.post()
        
        const user = await User.create(body)

        return user
    }

}

module.exports = UserController