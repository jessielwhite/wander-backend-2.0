require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;

const db = require('../config/db-helpers');

app.use(express.static(`${__dirname}/dist`));

// set morgan to log info about our requests for development
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.post('/type', (req, res) => {
  let type = req.body;
  db.addType(type, (err, type) => {
    if (err) {
      console.error(err);
    } else {
      res.send(type);
    }
  });
});

app.get('/types', (req, res) => {
  db.getTypes((err, types) => {
    if (err) {
      console.error(err);
    } else {
      res.send(types);
    }
  });
});

app.post('/user', (req, res) => {
  let user = req.body;
  db.createUser(user, (err, newUser) => {
    if (err) {
      console.error(err);
    } else {
      res.send(newUser.dataValues);
    }
  });
});

app.get('/users', (req, res) => {
  db.getUsers((err, users) => {
    if (err) {
      console.error(err);
    } else {
      res.send(users);
    }
  });
});

app.post('/schedule', (req, res) => {
  let schedule = req.body;
  db.createSchedule(schedule, (err, newSchedule) => {
    if (err) {
      console.error(err);
    } else {
      res.send(newSchedule.dataValues);
    }
  });
});

app.get('/user_likes', (req, res) => {
  db.getUserLikes((err, userLikes) => {
    if (err) {
      console.error(err);
    } else {
      res.send(userLikes);
    }
  });
});

// route for handling 404 requests(unavailable routes)
app.use(function (req, res) {
  res.status(404).send('Sorry can\'t find that!');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});