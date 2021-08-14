'use strict'

const User = use('App/Models/User')

class UserController {

    async store({ request, response }) {
        const body = request.only(['name', 'email', 'password'])

        const user = await User.create(body)

        return response.created(user)
    }
    async update({ request, params, response }) {
        const user = await User.findOrFail(params.id)

        const body = request.only(['name', 'email'])

        if (body.email && user.email != body.email) {

            const existUser = await User.findByOrFail('email', body.email)

            if (existUser) {
                return response.conflict([{
                    messsage: 'Esse email já está sendo utilizado por outro usuário',
                    "field": "email",
                    "validation": "unique"
                }])
            }
        }

        user.merge(body)

        await user.save()

        return user
    }

    async show({ params }) {
        const user = await User.findOrFail(params.id)

        return user
    }

    async index({ pagination }) {
        const users = await User.query().paginate(
            pagination.page,
            pagination.perpage,
        );

        return users
    }

}

module.exports = UserController