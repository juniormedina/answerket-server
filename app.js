const app = require('express')();
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const PORT = process.env.PORT || 5000;

// Database Models
require('./database/models/User');

// Database Connection
const database = require('./controllers/database');
database.connect(keys.mongoURI);

// Middlewares
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(
    cookieSession({
      maxAge: 2592000000,
      keys: [keys.cookieKey]
    })
  );

app.use(passport.initialize());
app.use(passport.session());

// Services
require('./services/passport');

// Routes
app.use('/api', require('./routes/api'));

// Start server
app.listen(PORT, () => {
  console.log('[Server]', 'Listening on port', PORT);
});
