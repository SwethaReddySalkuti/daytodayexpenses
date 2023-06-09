
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/User');
const Expense = require('./models/Expense');
const Order = require('./models/orders');
const Forgotpassword = require('./models/forgotpassword');

var cors = require('cors');
const dotenv = require('dotenv');   // to access environment variables

const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());

const sequelize = require('./util/database');

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium')
const resetPasswordRoutes = require('./routes/resetpassword')

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', userRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase',purchaseRoutes);
app.use('/premium', premiumRoutes)
app.use('/password', resetPasswordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

sequelize.sync(
  {force : true}
  )
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });