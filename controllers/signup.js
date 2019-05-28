const validator = require('validator');
const bcrypt = require('bcrypt');
const database = require('./database');

module.exports = async (req, res) => {
  let errorCode = 0;

  // Grabs information given
  let { email, password, companyName } = req.body;

  /* Validates email ------------------------------------------- */

  if (!validator.isEmail(email)) {
    errorCode = 1;
  } else {
    email = validator.normalizeEmail(email);
    const isExisting = await database.getUserByEmail(email);
    if (isExisting) errorCode = 2;
  }

  /* Validates password ------------------------------------------- */

  if (errorCode == 0 && !validator.isLength(password, { min: 6, max: 24 })) {
    errorCode = 3;
  }

  if (errorCode == 0) {
    // Hashes password
    const hash = await bcrypt.hash(password, 10);

    // Generates a company number
    const companyNumber = (await database.getCompanyCount(companyName)) + 1000;

    // Creates and saves user
    const user = await database.createUser(
      email,
      hash,
      companyName,
      companyNumber
    );

    // Checks if user was saved successfully
    if (user) {
      // Send response
      console.log('[DEBUG] signup sucessful!');
      res.send({
        isSuccessful: true,
        messageCode: 0
      });
    } else {
      // Error saving user
      // Send response
      console.log('[DEBUG] error saving signup!');
      res.send({
        isSuccessful: false,
        messageCode: 4
      });
    }
  } else {
    // Send response
    console.log('[DEBUG] invalid signup info!');
    res.send({
      isSuccessful: false,
      messageCode: errorCode
    });
  }
};
