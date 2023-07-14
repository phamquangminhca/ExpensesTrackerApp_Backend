const createTransactionsCtrl = async(req, res) => {
    try {
        res.json({
            msg: 'Create Transaction route'
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