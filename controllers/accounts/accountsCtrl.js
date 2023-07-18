const Account = require("../../model/Account");
const Transaction = require("../../model/Transaction");
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

const getAllAccountsCtrl = async(req, res, next) => {
    try {
        const accounts = await Account.find().populate('transactions');
        res.json({
            accounts,
        })
    } catch (error) {
        return next( new AppErr(error, 404));
    }
}

const getSingleAccountCtrl = async(req, res, next) => {
    try {
        //find the id from params
        const {id} = req.params;
        const account = await Account.findById(id).populate('transactions');
        res.json({
            status: 'success',
            data: account,
        })
    } catch (error) {
        return next( new AppErr(error, 404));
    }
}

const deleteAccountCtrl = async(req, res, next) => {
    try {
        const {id} = req.params;
        const deletedAccount = await Account.findByIdAndDelete(id);
        await User.updateOne(
            { _id: req.user },
            { $pull: { accounts: id } }
        );
        const deletedTransaction = await Transaction.deleteMany({ account: deletedAccount._id });
        res.status(200).json({
            status: 'success',
            data: deletedAccount
        })
    } catch (error) {
        return next( new AppErr(error, 404));
    }
}

const updateAccountCtrl = async(req, res, next) => {
    try {
        const {id} = req.params;
        const account = await Account.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        })
        res.json({
            status: 'success',
            data: account,
        })
    } catch (error) {
        return next( new AppErr(error, 500));
    }
}

module.exports = {
    createAccountCtrl,
    getAllAccountsCtrl,
    getSingleAccountCtrl,
    deleteAccountCtrl,
    updateAccountCtrl
}