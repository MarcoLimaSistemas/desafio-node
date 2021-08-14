'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sale extends Model {

    products() {
        return this.belongsToMany('App/Models/Product', 'sales_id', 'product_id')
        .pivotTable('sales_products')
    }

    salesProducts() {
        return this.hasMany('App/Models/SalesProduct', 'id', 'sales_id')
    }

    
   


}

module.exports = Sale
