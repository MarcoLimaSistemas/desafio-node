'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const Product = use('App/Models/Product')
class SalesProduct extends Model {

    product() {
        return this.belongsTo('App/Models/Product')
    } 

    static boot() {
        super.boot()   
        // Toda venda cadastrada deve subtrair a quantidade comprada do produto em seu estoque
        this.addHook('afterCreate', async (salesProductInstace) => {
            
            const product = await Product.find(salesProductInstace.product_id)

            product.stoke_balance -= salesProductInstace.quantity

            await product.save()
        })
        // Ao cancelar um pedido o estoque do produto deve ser devolvido
        this.addHook('beforeDelete', async (salesProductInstace) => {
            
            const product = await Product.find(salesProductInstace.product_id)

            product.stoke_balance += salesProductInstace.quantity

            await product.save()
        })
    }
}

module.exports = SalesProduct
