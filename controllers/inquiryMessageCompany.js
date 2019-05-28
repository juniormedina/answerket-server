const mongoose = require('mongoose');
const User = mongoose.model('users');
const utils = require('../helpers/utils');
const database = require('./database');

module.exports = async (req, res) => {
  let { message, ticketIndex } = req.body;
    const company = req.user ? await User.findById(req.user) : null;

    if (company && ticketIndex < company.tickets.length && company.tickets[ticketIndex].status != 3) {      
        const newMessage = {
          fromInquirer: false,
          text: message,
          date: utils.getDate(),
          time: utils.getTime()
        };

        let updatedMessages = [
          ...company.tickets[ticketIndex].messages,
          newMessage
        ];
        let updatedTickets = [...company.tickets];
        updatedTickets[ticketIndex].messages = updatedMessages;

        // Sets ticket as "updated: waiting for company response"
        updatedTickets[ticketIndex].status = 1;
        // Updates company tickets
        company.tickets = updatedTickets;
        try {
          await User.findOneAndUpdate({ _id: company.id }, company);
          res.send({
            isSuccessful: true,
            tickets: company.tickets
          });
        } catch (err) {
          res.send({ isSuccessful: false });
        }
    } else {
      res.send({ isSuccessful: false });
    }
};
