const User = require('../models/User');
const Expense = require('../models/Expense');
const sequelize = require('../util/database');

exports.getUserLeaderBoard = async (req, res) => {
    try
    {
        const leaderboardofusers = await User.findAll({
            attributes: ['id', 'name',[sequelize.fn('sum', sequelize.col('expenses.expenseamount')), 'total_cost'] ],
            include: [
                {
                    model: Expense,
                    attributes: []
                }
            ],
            group:['user.id'],
            order:[['total_cost', 'DESC']]

        })
       
        res.status(200).json(leaderboardofusers)
    } 
    catch (err)
    {
    res.status(500).json(err)
    }
}
