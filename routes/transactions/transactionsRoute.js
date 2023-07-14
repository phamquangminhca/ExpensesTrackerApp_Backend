const express = require('express');

const transactionsRoute = express.Router();

//POST/api/v1/transactions
transactionsRoute.post('/', async(req, res) => {
    try {
        res.json({
            msg: 'Create Transaction route'
        })
    } catch (error) {
        res.json(error);
    }
})

//GET/api/v1/transactions
transactionsRoute.get('/', async(req, res) => {
    try {
        res.json({
            msg: 'Get All Transactions route'
        })
    } catch (error) {
        res.json(error);
    }
})

//GET/api/v1/transactions/:id
transactionsRoute.get('/:id', async(req, res) => {
    try {
        res.json({
            msg: 'Get Single Transaction route'
        })
    } catch (error) {
        res.json(error);
    }
})

//DELETE/api/v1/transactions/:id
transactionsRoute.delete('/:id', async(req, res) => {
    try {
        res.json({
            msg: 'Delete Transaction route'
        })
    } catch (error) {
        res.json(error);
    }
})

//PUT/api/v1/transactions/:id
transactionsRoute.put('/:id', async(req, res) => {
    try {
        res.json({
            msg: 'Update Transaction route'
        })
    } catch (error) {
        res.json(error);
    }
})

module.exports = transactionsRoute;