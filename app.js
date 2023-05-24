
const express = require('express');
const bodyParser = require('body-parser');

var cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

const sequelize = require('./util/database');
const userRoutes = require('./routes/user');

const expenseRoutes = require('./routes/expense');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user', userRoutes);
app.use('/expense',expenseRoutes);
sequelize.sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });