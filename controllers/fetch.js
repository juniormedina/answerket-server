const database = require('./database');

module.exports = async (req, res) => {
  // Attempts to grab user using id inside passport session cookie
  const user = req.user ? await database.getUser(req.user) : null;
  res.send(
    user
      ? {
          isSuccessful: true,
          name: user.companyName,
          number: user.companyNumber,
          tickets: user.tickets
        }
      : { isSuccessful: false }
  );
};
