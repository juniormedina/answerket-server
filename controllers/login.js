const passport = require('passport');
const database = require('./database');

module.exports = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    // Invalid login
    if (err) return next(err);
    if (!user)
      return res.send({
        isSuccessful: false,
        messageCode: 1
      });

    // Successful login
    req.logIn(user, async err => {
      if (err) return next(err);

      // Query User for name. email, associations
      const user = await database.getUser(req.user);
      return res.send(
        user
          ? {
              isSuccessful: true,
              name: user.companyName,
              number: user.companyNumber,
              tickets: user.tickets
            }
          : {
              isSuccessful: false,
              messageCode: 1
            }
      );
    });
  })(req, res, next);
};
