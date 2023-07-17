const Account = require("../../model/Account");
const Transaction = require("../../model/Transaction");
const User = require("../../model/User");
const { AppErr } = require("../../utils/appErr");


const createTransactionsCtrl = async(req, res, next) => {
    const {name, transactionType, amount, category, account, notes} = req.body;
    try {
        //find user
        const userFound = await User.findById(req.user);
        if (!userFound) {
            return next(new AppErr('User not found', 404));
        }

        //find the account
        const accountFound = await Account.findById(account);
        if (!accountFound) {
            return next(new AppErr('Account not found', 404));
        }

        //create the transaction
        const transaction = await Transaction.create({
            name,
            transactionType,
            amount,
            category,
            account,
            createdBy: req.user,
            notes
        });

        //push the transaction to the account
        accountFound.transactions.push(transaction);

        //resave the account
        await accountFound.save();

        res.json({
            status: 'success',
            data: transaction,
        })
    } catch (error) {
        res.json(error);
    }
}

const getAllTransactionsCtrl = async(req, res) => {
    try {
        res.json({
            msg: 'Get All Transactions route'
        })
    } catch (error) {
        res.json(error);
    }
}

const getSingleTransactionCtrl =  async(req, res) => {
    try {
        res.json({
            msg: 'Get Single Transaction route'
        })
    } catch (error) {
        res.json(error);
    }
}

const deleteTransactionCtrl = async(req, res) => {
    try {
        res.json({
            msg: 'Delete Transaction route'
        })
    } catch (error) {
        res.json(error);
    }
}

const updateTransactionCtrl = async(req, res) => {
    try {
        res.json({
            msg: 'Update Transaction route'
        })
    } catch (error) {
        res.json(error);
    }
}

module.exports = {
    createTransactionsCtrl,
    getAllTransactionsCtrl,
    getSingleTransactionCtrl,
    deleteTransactionCtrl,
    updateTransactionCtrl
}