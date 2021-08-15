'use strict'

const moment = require('moment')
const { USER_ROLE } = require('../../../Settings/user_const')

const Sale = use('App/Models/Sale')

const Product = use('App/Models/Product')

const SalesProduct = use('App/Models/SalesProduct')

const Database = use('Database')
class SaleController {

    async index({ pagination, request, auth }) {
        //Listar todos os pedidos de venda trazendo todos os produtos e o total da venda com filtro por data de inicio e fim
        const { initial_date, final_date } = request.get()

        const user = await auth.getUser()

        const orders = await Sale.query()
            .with('salesProducts', (builder) => {
                builder.select(Database.raw("sum(sales_products.total_price) as total"))
                    .select("sales_id")
                    .groupBy("sales_id");
            })
            .where(function () {
                //Ao listar as vendas logado como usuario exibir apenas as que foram feitas por ele
                if (user.role ==  USER_ROLE.CLIENT) {
                    this.where('user_id', user.id)
                }
                if (initial_date && final_date)
                    this.whereBetween('date', [moment(initial_date).format('YYYY-MM-DD H:mm:ss'), moment(final_date).format('YYYY-MM-DD H:mm:ss')])
            })

            .with('products')
            .paginate(
                pagination.page,
                pagination.perpage,
            )

        return orders
    }

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

    async cancelation({ params, response }) {
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