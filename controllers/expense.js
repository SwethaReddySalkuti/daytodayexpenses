const express = require('express');
const router = express.Router();

const Expense = require('../models/Expense');

const addExpense =  async(req, res, next) => {
    try{
         
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;
       
       const data = await Expense.create({
           amount:amount,
           description:description,
           category:category
       })
       res.status(201).json({newExpenseDetail : data});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: err})
    }
}

const getExpense = async(req, res, next) => {
    try
    {
       const expense = await Expense.findAll();
       res.status(200).json({allExpenses : expense});
    }catch(error){
        console.log('GET expense is failing', JSON.stringify(error));
        res.status(500).json({error: error});
    }
}

const deleteExpense = async(req, res) => {
    try{
       if(req.params.id == 'undefined'){
        console.log('ID missing');
        return res.status(400).json({err : 'ID MISSING'});
       }

       const uId = req.params.id;
       await Expense.destroy({where: {id : uId}});
       res.sendStatus(200);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {
    addExpense,
    getExpense,
    deleteExpense
}