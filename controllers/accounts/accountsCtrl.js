const Account = require("../../model/Account");
const User = require("../../model/User");
const { AppErr } = require("../../utils/appErr");

const createAccountCtrl = async(req, res, next) => {
    const {name, accountType, initialBalance, notes} = req.body;
    try {
        //find the logged in user
        const userFound = await User.findById(req.user);
        if (!userFound) {
            return next( new AppErr('User not found', 404));
        }

        //create the account
        const account = await Account.create({
            name, 
            accountType, 
            initialBalance, 
            notes,
            createdBy: req.user,
        })

        //push the account into user's accounts field
        userFound.accounts.push(account._id);

        //resave the user
        await userFound.save();

        res.json({
            status: 'success',
            data: account,
        })
    } catch (error) {
        return next( new AppErr(error, 404));
    }
}

const getAllAccountsCtrl = async(req, res) => {
    try {
        const accounts = await Account.find().populate('transactions');
        res.json({
            accounts,
        })
    } catch (error) {
        res.json(error);
    }
}

const getSingleAccountCtrl = async(req, res) => {
    try {
        res.json({
            msg: 'Get single Account route'
        })
    } catch (error) {
        res.json(error);
    }
}

const deleteAccountCtrl = async(req, res) => {
    try {
        res.json({
            msg: 'Delete Account route'
        })
    } catch (error) {
        res.json(error);
    }
}

const updateAccountCtrl = async(req, res) => {
    try {
        res.json({
            msg: 'Update Account route'
        })
    } catch (error) {
        res.json(error);
    }
}

module.exports = {
    createAccountCtrl,
    getAllAccountsCtrl,
    getSingleAccountCtrl,
    deleteAccountCtrl,
    updateAccountCtrl
}