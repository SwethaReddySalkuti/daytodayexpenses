const User = require('../models/User');
const Expense = require('../models/Expense');
const sequelize = require('../util/database');

exports.getUserLeaderBoard = async (req, res) => {
    try
    {
        const leaderboardofusers = await User.findAll({
            order:[['totalExpenses', 'DESC']]

        })
       
        res.status(200).json(leaderboardofusers)
    } 
    catch (err)
    {
    res.status(500).json(err)
    }
}

