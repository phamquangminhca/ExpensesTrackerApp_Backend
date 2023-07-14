const express = require('express');
const { createAccountCtrl, getAllAccountsCtrl, getSingleAccountCtrl, deleteAccountCtrl, updateAccountCtrl } = require('../../controllers/accounts/accountsCtrl');

const accountsRoute = express.Router();

//POST/api/v1/accounts
accountsRoute.post('/', createAccountCtrl);

//Get/api/v1/accounts
accountsRoute.get('/', getAllAccountsCtrl);

//GET/api/v1/accounts/:id
accountsRoute.get('/:id', getSingleAccountCtrl);

//DELETE/api/v1/accounts/:id
accountsRoute.delete('/:id', deleteAccountCtrl);

//PUT/api/v1/accounts/:id
accountsRoute.put('/:id', updateAccountCtrl);

module.exports = accountsRoute;