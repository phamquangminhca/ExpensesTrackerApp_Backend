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
        return next(new AppErr(err, 400));
    }
}

const getAllTransactionsCtrl = async(req, res, next) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json({
            status: 'success',
            data: transactions,
        })
    } catch (error) {
        return next(new AppErr(err, 400));
    }
}

const getSingleTransactionCtrl =  async(req, res, next) => {
    try {
        const {id} = req.params;
        const transaction = await Transaction.findById(id);
        res.status(200).json({
            status: 'success',
            data: transaction,        
        })
    } catch (error) {
        return next(new AppErr(err, 400));
    }
}

const deleteTransactionCtrl = async(req, res, next) => {
    try {
        const {id} = req.params;
        const deletedTransaction = await Transaction.findByIdAndDelete(id);
        await Account.updateOne(
            { _id: deletedTransaction.account },
            { $pull: { transactions: id } }
        );
        res.status(200).json({
            status: 'success',
            data: deletedTransaction
        });
    } catch (error) {
        return next(new AppErr(err, 400));
    }
}

const updateTransactionCtrl = async(req, res, next) => {
    try {
        const {id} = req.params;
        const transaction = await Transaction.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        })
        res.json({
            status: 'success',
            data: transaction,
        })
    } catch (error) {
        return next(new AppErr(err, 400));
    }
}

module.exports = {
    createTransactionsCtrl,
    getAllTransactionsCtrl,
    getSingleTransactionCtrl,
    deleteTransactionCtrl,
    updateTransactionCtrl
}