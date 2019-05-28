const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = async (req, res) => {
  let { companyName, confirmationURL } = req.body;
  const companyNumber = Number(req.body.companyNumber);

  if (companyNumber && companyNumber > 999) {
    const company = await User.findOne({ companyName, companyNumber });
    if (company) {
        // Checks if ticket with confirmationURL
        let foundTicket = null;
        company.tickets.forEach(element => {
            if(element.url === confirmationURL) foundTicket = element;
        });
        if(foundTicket && foundTicket.status != 3){
            res.send({
                isSuccessful: true,
                messages: foundTicket.messages
            });
        }else{
            res.send({ isSuccessful: false });
        }
    } else {
      res.send({ isSuccessful: false });
    }
  } else {
    res.send({ isSuccessful: false });
  }
};
