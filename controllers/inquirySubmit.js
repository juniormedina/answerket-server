const mongoose = require('mongoose');
const User = mongoose.model('users');
const utils = require('../helpers/utils');

module.exports = async (req, res) => {
  let { companyName, name, subject, message } = req.body;
  const companyNumber = Number(req.body.companyNumber);

  if (companyNumber && companyNumber > 999) {
    const company = await User.findOne({ companyName, companyNumber });
    if (company) {
      // Creates confirmation url
      const confirmationURL = utils.randomChars(6);

      // Creates and adds new ticket to company
      const newMessage = {
        fromInquirer: true,
        text: message,
        date: utils.getDate(),
        time: utils.getTime()
      };

      const newTicket = {
        url: confirmationURL,
        number: company.tickets.length + 1,
        inquirer: name,
        subject: subject,
        messages: [newMessage],
        status: 0
      };
      let updatedTickets = [...company.tickets, newTicket];
      company.tickets = updatedTickets;
      try {
        await company.save();
        res.send({ isSuccessful: true, confirmationURL });
      } catch (err) {
        res.send({ isSuccessful: false });
      }
    } else {
      res.send({ isSuccessful: false });
    }
  } else {
    res.send({ isSuccessful: false });
  }
};
