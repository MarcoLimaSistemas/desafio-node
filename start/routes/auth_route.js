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
    Route.post('authenticate', 'AuthController.login')     
    Route.post('logout', 'AuthController.logout')     
})
    .prefix('v1')
    .namespace('Auth')

Route.group(() => {
    Route.post('forgotpassword', 'AuthController.forgotPassword')     
    Route.post('validatecode', 'AuthController.validateCode')     
    Route.post('resetpassword', 'AuthController.resetPassword')     
})
    .prefix('v1/auth')
    .namespace('Auth')

