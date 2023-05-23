const express = require('express');
const router = express.Router();

//const User = require('../models/User')
const User = require('../models/User');

exports.addUser =  async(req, res, next) => {
    try{
        if(!req.body.email){
            throw new Error('Email is mandatory');
        }
        
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
       
       const data = await User.create({
           name : name,
           email : email,
           password : password

       })
       //console.log(data);
       res.status(201).json({newUserDetail : data});
    }catch(err){
        console.log(err);
        res.status(500).json({error: err})
    }
}
exports.getUsers = async(req,res,next) => 
{
    try
    {
       const user = await User.findAll();
       res.status(200).json({allUsers : user});
    }catch(error){
        console.log('GET user is failing', JSON.stringify(error));
        res.status(500).json({error: error});
    }
}



