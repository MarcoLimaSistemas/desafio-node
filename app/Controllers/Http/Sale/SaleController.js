'use strict'

const moment = require('moment')

const Sale = use('App/Models/Sale')

const Product = use('App/Models/Product')

const SalesProduct = use('App/Models/SalesProduct')

class SaleController {

    async order({ request, auth }) {
        const user = await auth.getUser()
        const { products } = request.post()

        const sale = await Sale.create({
            date: moment().format('YYYY-MM-DD H:mm:ss'),
            user_id: user.id
        })

        for (const product of products) {
            const productSaved = await Product.find(product.id)
            await SalesProduct.create({
                sales_id: sale.id,
                product_id: product.id,
                quantity: product.quantity,
                total_price: productSaved.price,
            })
        }

        await sale.load('products')

        return sale
    }

    async cancelation({params, response}) {
        const sale = await Sale.findOrFail(params.id)
        const salesProducts = await sale.salesProducts().fetch()

        for (const row of salesProducts.rows) {
            await row.delete()
        }       
        await sale.delete()
        return response.status(200).send({
            message: 'Pedido de venda cancelado'
        })

    }

}

module.exports = SaleController