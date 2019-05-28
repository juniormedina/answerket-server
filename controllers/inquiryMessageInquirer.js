const mongoose = require('mongoose');
const User = mongoose.model('users');
const utils = require('../helpers/utils');

module.exports = async (req, res) => {
  let { companyName, confirmationURL, message } = req.body;
  const companyNumber = Number(req.body.companyNumber);

  if (companyNumber && companyNumber > 999) {
    const company = await User.findOne({ companyName, companyNumber });
    if (company) {
      // Checks if ticket with confirmationURL
      let foundTicket = -1;
      for (let i = 0; i < company.tickets.length; i++) {
        if (company.tickets[i].url === confirmationURL) foundTicket = i;
      }

      if (!(foundTicket < 0) && company.tickets[foundTicket].status != 3) {
        const newMessage = {
          fromInquirer: true,
          text: message,
          date: utils.getDate(),
          time: utils.getTime()
        };

        let updatedMessages = [
          ...company.tickets[foundTicket].messages,
          newMessage
        ];
        let updatedTickets = [...company.tickets];
        updatedTickets[foundTicket].messages = updatedMessages;
        // Determines the new ticket status
        let hasCompanyReplied = false;
        updatedMessages.forEach(element => {
          if(!element.fromInquirer) hasCompanyReplied = true;
        });
        // Sets ticket as "updated: waiting for company response"
        if(hasCompanyReplied) updatedTickets[foundTicket].status = 2;
        // Updates company tickets
        company.tickets = updatedTickets;
        try {
          await User.findOneAndUpdate({ _id: company.id }, company);
          res.send({
            isSuccessful: true,
            messages: company.tickets[foundTicket].messages
          });
        } catch (err) {
          res.send({ isSuccessful: false });
        }
      } else {
        res.send({ isSuccessful: false });
      }
    } else {
      res.send({ isSuccessful: false });
    }
  } else {
    res.send({ isSuccessful: false });
  }
};
