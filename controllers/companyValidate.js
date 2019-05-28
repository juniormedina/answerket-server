const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = async (req, res) => {
    let { companyName } = req.body;
    let companyNumber = Number(req.body.companyNumber);
    if(companyNumber && companyNumber > 999){
        const company = await User.findOne({ companyName, companyNumber });
        res.send({ isSuccessful: company ? true : false });
    }else{
        res.send({ isSuccessful: false});
    }
}