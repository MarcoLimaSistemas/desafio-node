'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.group(() => {
    Route.resource('products', 'ProductController')
        .middleware(new Map([
            [['products.store', 'products.update', 'products.destroy'], 'admin']
        ]))
        .validator(new Map([
            [['products.store'], ['Products/StoreProduct']],
            [['products.update'], ['Products/UpdateProduct']],
        ]))

    Route.post('products/:id/update-stoke-balance', 'ProductController.updateStokeBalance')
        .validator('Products/UpdateStokeBalance')
})
    .prefix('v1')
    .namespace('Product')

