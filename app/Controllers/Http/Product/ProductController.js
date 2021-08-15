'use strict'

const { existAssociatedWithSale } = require("../../../Validators/Products/DestroyProduct")

const Product = use('App/Models/Product')

//Implementar endpoints para cadastro, edição e exclusão de produtos.
class ProductController {

    async index({ pagination, request }) {
        //Implementar endpoint para listagem de todos os produtos
        const { query } = request.get()

        const products = await Product.query()
            .paginate(
                pagination.page,
                pagination.perpage,
            )

        return products
    }

    async store({ request }) {
        const body = request.post()

        const product = await Product.create(body)

        return product
    }

    async show({ params }) {

        const product = await Product.findOrFail(params.id)

        return product
    }

    async destroy({ params, response }) {
        const invalidFields = await existAssociatedWithSale(params.id)
        if (invalidFields.length > 0) {
            return response.status(400).send({
                error: invalidFields
            })
        }

        const product = await Product.findOrFail(params.id)

        await product.delete()
    }


    async update({ request, params }) {

        const body = request.post()

        const product = await Product.findOrFail(params.id)

        product.merge(body)

        await product.save()

        return product
    }
    //Implementar endpoint para adicionar ou remover saldo no estoque do produto
    async updateStokeBalance({ params, request }) {
        const { operation_type, operation_value } = request.post()

        const product = await Product.findOrFail(params.id)

        switch (operation_type) {
            case 'out':
                product.stoke_balance -= operation_value
                break;
            case 'in':
                product.stoke_balance += operation_value
                break;
        }

        await product.save()

        return product

    }

}

module.exports = ProductController