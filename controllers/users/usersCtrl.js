const bcrypt = require('bcryptjs');
const User = require("../../model/User");
const { AppErr, appErr } = require('../../utils/appErr');

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
        })
    } catch (error) {
        res.json(error);
    }
}

const getUserProfileCtrl = async(req, res) => {
    try {
        res.json({
            msg: 'Profile route'
        })
    } catch (error) {
        res.json(error);
    }
}

const deleteUserCtrl = async(req, res) => {
    try {
        res.json({
            msg: 'Delete route'
        })
    } catch (error) {
        res.json(error);
    }
}

const updateUserCtrl = async(req, res) => {
    try {
        res.json({
            msg: 'Update route'
        })
    } catch (error) {
        res.json(error);
    }
}

module.exports = {
    registerUserCtrl,
    loginUserCtrl,
    getUserProfileCtrl,
    deleteUserCtrl,
    updateUserCtrl
}