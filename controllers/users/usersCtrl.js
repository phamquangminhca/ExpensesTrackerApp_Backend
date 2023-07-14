const registerUserCtrl = async(req, res) => {
    try {
        res.json({
            msg: 'Register route'
        })
    } catch (error) {
        res.json(error);
    }
}

const loginUserCtrl = async(req, res) => {
    try {
        res.json({
            msg: 'Login route'
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