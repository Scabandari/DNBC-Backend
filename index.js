const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
var cors = require('cors');

const keys = require('./config/keys');

require('./models/resume/UdemyCourse');
require('./models/resume/Email');
require('./models/User');
require('./models/Blog');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/upload', require('./routes/uploadRoutes'));
app.use('/dnbc/auth', require('./routes/authRoutes'));
app.use('/dnbc/user', require('./routes/userRoutes'));
app.use('/resume', require('./routes/resumeRoutes'));
require('./routes/blogRoutes')(app);

app.get('/', (req, res) => {
  res.send('Working');
});

// if (['production'].includes(process.env.NODE_ENV)) {
//   app.use(express.static('client/build'));

//   const path = require('path');
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve('client', 'build', 'index.html'));
//   });
// }

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
