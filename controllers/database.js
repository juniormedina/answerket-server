const mongoose = require('mongoose');
const User = mongoose.model('users');

const connect = mongoURI => {
  mongoose.connect(mongoURI, { useNewUrlParser: true }).then(
    () => {
      console.log('[MongoDB]', 'Connection to database established.');
    },
    err => {
      console.log(
        '[MongoDB]',
        'An error occurred while connecting to database.',
        err
      );
    }
  );
};

const createUser = async (email, password, companyName, companyNumber) =>
  await new User({
    email,
    password,
    companyName,
    companyNumber,
    tickets: []
  }).save();

const getUser = async id =>
  await User.findById(id, '-_id -__v -password');

const getUserByEmail = async email => await User.findOne({ email });

const getCompanyCount = async companyName => {
  let count = 0;
  let users = await User.find({ companyName });
  if(users) count = users.length;
  return count;
}
// const createCompany = async (name, modifier, userID) => {
//   // Get User
//   let user = await User.findById(userID);
//   if (!user) return false;

//   // Create Unique memberID
//   let memberID = userID;

//   // Create Company
//   let company = await new Company({
//     name,
//     modifier,
//     members: {
//       [memberID]: {
//         name: user.name,
//         image: user.image,
//         role: 'CEO',
//         associations: []
//       }
//     },
//     divisions: [],
//     invites: []
//   }).save();

//   // Add association to user
//   if (company) {
//     let association = addUserAssociation(user, company);
//     if (association) return true;
//   }

//   // Something has failed
//   // TODO... Return error
//   return false;
// };

// const addUserAssociation = async (user, company) => {
//   let associations = [...user.associations];
//   associations.push({
//     companyID: company.id,
//     name: company.name,
//     role: company.members[user.id].role
//   });
//   return await user.updateOne({ associations });
// };

// const getInvite = async (userID, code) => {
//   let invite = Invite.findOne({ code });
//   if (!invite) return false;

//   let user = User.findById(userID);
//   // TODO... Compare email as strings
//   if (!user || invite.email != user.email) return false;

//   let company = Company.findById(invite.companyID);
//   if (!company) return false;

//   // Adds user to company
//   let addedMember = await addCompanyMember(company, user, invite);
//   if (!addedMember) return false;

//   // Deletes invite
//   await invite.remove();
//   return true;
// };

// const addCompanyMember = async (company, user, invite) => {
//   const members = {
//     ...company.members,
//     [user.id]: {
//       name: user.name,
//       image: user.image,
//       role: invite.role,
//       associations: [...invite.associations]
//     }
//   };
//   return await company.updateOne({ members });
// };

module.exports = {
  connect,
  createUser,
  getUser,
  getUserByEmail,
  getCompanyCount,
};
