const express = require('express');
const { createAccountCtrl, getAllAccountsCtrl, getSingleAccountCtrl, deleteAccountCtrl, updateAccountCtrl } = require('../../controllers/accounts/accountsCtrl');
const isLoggedIn = require('../../middlewares/isLoggedIn');

const accountsRoute = express.Router();

//POST/api/v1/accounts
accountsRoute.post('/', isLoggedIn, createAccountCtrl);

//Get/api/v1/accounts
accountsRoute.get('/', getAllAccountsCtrl);

//GET/api/v1/accounts/:id
accountsRoute.get('/:id', getSingleAccountCtrl);

//DELETE/api/v1/accounts/:id
accountsRoute.delete('/:id', isLoggedIn, deleteAccountCtrl);

//PUT/api/v1/accounts/:id
accountsRoute.put('/:id', isLoggedIn, updateAccountCtrl);

module.exports = accountsRoute;