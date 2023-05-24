const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
//const User = require('../models/User')
const User = require('../models/User');

exports.addUser =  async(req, res, next) => {
    try
    {
        const { name, email, password } = req.body;
        console.log('email', email)
        const saltrounds = 10;
        bcrypt.hash(password,saltrounds,async (err,hash) => {
            if(err)
            {
                console.log(err);
            }
            await User.create({ name, email, password:hash})
            res.status(201).json({message: 'Successfuly create new user'})
        })
        
    }
    catch(err) 
    {
        res.status(500).json(err);
    }  
}
exports.getUsers = async(req,res,next) => 
{
    try
    {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findAll({where : {email}});
        console.log(user);
        if(user.length > 0)
        {
            bcrypt.compare(password,user[0].password,(err,response) => 
            {
                if(err)
                {
                    res.status(500).json({success: false,message:"Something Went wrong"});
                }
                if(response === true)
                {
                    console.log("Passssssss");
                    res.status(200).json({success: true,message: "User logged in Successfully"});
                }
                else
                {
                    res.status(400).json({success: false,message: "Password Incorrect"});
                }
            })
                  
        }
        else
        {
            res.status(404).json({success: false,message: "User Doesn't Exist"});
        }
    }
    catch(error)
    {
        console.log('GET user is failing', JSON.stringify(error));
        res.status(500).json({error: error});
    }
}



