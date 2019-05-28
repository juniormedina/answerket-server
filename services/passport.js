const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ email: username });
    // If user was not found
    if (!user) return done(null, false, { error: "Invalid email or password" });
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { error: "Invalid email or password"});
    }
    // Valid password
    return done(null, user.id);
  })
);
