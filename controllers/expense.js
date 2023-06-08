const express = require('express');
const router = express.Router();

const Expense = require('../models/Expense');
const User = require('../models/User');

const addExpense =  async(req, res, next) => {
    try{
         
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;
       
       const expense = await Expense.create({
            amount,
            description,
            category,
            userId: req.user.id
       })
       if(expense)
       {
            const totalExpense = Number(req.user.totalExpense) + Number(amount);
            const upuser = await User.update({
                totalExpenses : totalExpense
            },{
                where : {id:req.user.id}
            })
            if(upuser)
            {
                return res.status(201).json({newExpenseDetail : expense});
            }
             
    }
}
    catch(err){
        console.log(err);
        res.status(500).json({error: err})
    }
}

const getExpense = async(req, res, next) => {
    try
    {
       const expense = await Expense.findAll({where:{userId : req.user.id}});
       return res.status(200).json({allExpenses : expense});
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
       return res.status(200).json({success:true,message:"Deleted Successfully"});
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