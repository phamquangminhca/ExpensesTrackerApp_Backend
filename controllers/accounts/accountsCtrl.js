const createAccountCtrl = async(req, res) => {
    try {
        res.json({
            msg: 'Create Account route'
        })
    } catch (error) {
        res.json(error);
    }
}

const getAllAccountsCtrl = async(req, res) => {
    try {
        res.json({
            msg: 'Get All Accounts route'
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