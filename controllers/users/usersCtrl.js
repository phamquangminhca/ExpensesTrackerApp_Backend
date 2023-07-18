const bcrypt = require('bcryptjs');
const User = require("../../model/User");
const { AppErr, appErr } = require('../../utils/appErr');
const generateToken = require('../../utils/generateToken');
const Account = require('../../model/Account');
const Transaction = require('../../model/Transaction');

const registerUserCtrl = async(req, res, next) => {
    const {fullname, password, email} = req.body;
    try {
        //check if fields are empty
        if (!email || !password || !fullname) {
            return next(appErr('Please provide all fields', 400))
        }

        //check if email exists
        const userFound = await User.findOne({email});
        if (userFound) {
            return next(new AppErr('User Already Exists', 400))
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create user
        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
        });

        res.json({
            status: 'success',
            fullname: user.fullname,
            email: user.email,
            id: user._id,
        })
    } catch (error) {
        return next(new Error(error));
    }
}

const loginUserCtrl = async(req, res, next) => {
    const {email, password} = req.body;
    try {
        //check if email exists
        const userFound = await User.findOne({email});
        if (!userFound) {
            return next(appErr('Invalid login credentials', 400));
        }

        //check if password is valid
        const isPasswordMatched = await bcrypt.compare(password, userFound.password);
        if(!isPasswordMatched) {
            return next(new AppErr('Invalid login credentials', 400));
        }

        res.json({
            status: 'success',
            fullname: userFound.fullname,
            id: userFound._id,
            token: generateToken(userFound._id),
        })
    } catch (error) {
        res.json(error);
    }
}

const getUserProfileCtrl = async(req, res) => {
    try {
        const user = await User.findById(req.user).populate({
            path: 'accounts',
            populate: {
                path: 'transactions',
                'model': 'Transaction'
            }
        });
        res.json({
            user
        })
    } catch (error) {
        res.json(error);
    }
}

const deleteUserCtrl = async(req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        await Account.deleteMany({ createdBy: deletedUser._id  });
        await Transaction.deleteMany({ createdBy: deletedUser._id });
        res.status(200).json({
            status:'success',
            data: deletedUser,
        });
    } catch (error) {
        return next(new AppErr(err, 400));
    }
}

const updateUserCtrl = async(req, res, next) => {
    try {
        const {email, password} = req.body;
        if (email) {
            //check if email exists
            const userFound = await User.findOne({email});
            const currentUser = await User.findById(req.user);
            if(userFound && email !== currentUser.email) {
                return next(new AppErr('Email is already taken', 400));
            }
        }
        
        //check if user is updating the password
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            //update the user
            const user = await User.findByIdAndUpdate(req.user, {
                password: hashedPassword,
            }, {
                new: true,
                runValidators: true,
            });

            //send the response
            return res.status(200).json({
                status: 'success',
                data: user,
            });
        }

        const user = await User.findByIdAndUpdate(req.user, req.body, {
            new: true,
            runValidators: true,
        });

        //send the response
        return res.status(200).json({
            status: 'success',
            data: user,
        });
    } catch (error) {
        return next(new AppErr(error.message, 500));
    }
}

module.exports = {
    registerUserCtrl,
    loginUserCtrl,
    getUserProfileCtrl,
    deleteUserCtrl,
    updateUserCtrl
}