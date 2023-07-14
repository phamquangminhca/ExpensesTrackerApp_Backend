const express = require('express');

const usersRoute = express.Router();

//POST/api/v1/users/register
usersRoute.post('/register', async(req, res) => {
    try {
        res.json({
            msg: 'Register route'
        })
    } catch (error) {
        res.json(error);
    }
})

//POST/api/v1/users/login
usersRoute.post('/login', async(req, res) => {
    try {
        res.json({
            msg: 'Login route'
        })
    } catch (error) {
        res.json(error);
    }
})

//GET/api/v1/users/profile/:id
usersRoute.get('/profile/:id', async(req, res) => {
    try {
        res.json({
            msg: 'Profile route'
        })
    } catch (error) {
        res.json(error);
    }
})

//DELETE/api/v1/users/:id
usersRoute.delete('/:id', async(req, res) => {
    try {
        res.json({
            msg: 'Delete route'
        })
    } catch (error) {
        res.json(error);
    }
})

//PUT/api/v1/users/:id
usersRoute.put('/:id', async(req, res) => {
    try {
        res.json({
            msg: 'Update route'
        })
    } catch (error) {
        res.json(error);
    }
})

module.exports = usersRoute;