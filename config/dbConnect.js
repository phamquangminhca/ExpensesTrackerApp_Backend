const mongoose = require('mongoose');

//connect
const dbConnect = async() => {
    try {
        await mongoose.connect('mongodb+srv://phamquangminhca:snake18112001@anthonycluster.muh72zt.mongodb.net/income-expenses-app?retryWrites=true&w=majority');
        console.log('Db connected successfully');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

dbConnect();