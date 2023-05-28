const express = require('express');
const router = express.Router();
const userAuthentication = require('../middleware/auth');

const expenseController = require('../controllers/expense');

router.post('/add-expense',userAuthentication.authenticate,expenseController.addExpense);
router.get('/get-expenses',userAuthentication.authenticate,expenseController.getExpense);
router.delete('/delete-expense/:id', expenseController.deleteExpense);

module.exports = router;                   