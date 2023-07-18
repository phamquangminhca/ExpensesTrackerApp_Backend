const express = require('express');
const { createTransactionsCtrl, getAllTransactionsCtrl, getSingleTransactionCtrl, deleteTransactionCtrl, updateTransactionCtrl } = require('../../controllers/transactions/transactionsCtrl');
const isLoggedIn = require('../../middlewares/isLoggedIn');

const transactionsRoute = express.Router();

//POST/api/v1/transactions
transactionsRoute.post('/', isLoggedIn, createTransactionsCtrl);

//GET/api/v1/transactions
transactionsRoute.get('/', getAllTransactionsCtrl);

//GET/api/v1/transactions/:id
transactionsRoute.get('/:id', getSingleTransactionCtrl);

//DELETE/api/v1/transactions/:id
transactionsRoute.delete('/:id', isLoggedIn, deleteTransactionCtrl);

//PUT/api/v1/transactions/:id
transactionsRoute.put('/:id', updateTransactionCtrl);

module.exports = transactionsRoute;