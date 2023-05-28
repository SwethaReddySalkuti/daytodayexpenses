const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = (req,res,next) => {
    try{
        const token = req.header('Authorization');
        const user = jwt.verify(token,'98rhhu28938');    //decryption
        User.findByPk(user.userId)
        .then(user => {
            
            req.user=user;  
            next();
        })
        .catch(err => {
            throw new Error(err)
        })
    }
    catch(err)
    {
        console.log(err);
        return res.status(401).json({success : false});
    }
}