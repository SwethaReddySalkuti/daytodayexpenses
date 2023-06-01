
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/User');
const Expense = require('./models/Expense');
const Order = require('./models/orders');
var cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

const sequelize = require('./util/database');

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user', userRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase',purchaseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync(
  //{force : true}
  )
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });