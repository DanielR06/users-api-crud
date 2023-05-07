const catchError = require('../utils/catchError');
const User = require('../models/User');
const { where } = require('sequelize');

const getAll = catchError(async(_req, res) => {
    const users = await User.findAll();
    return res.json(users)
});

const create = catchError(async(req, res) =>{
    const {first_name, last_name, email, password, birthday} = req.body
    const user = await User.create({ 
        first_name,
        last_name,
        email,
        password,
        birthday
    });
    return res.status(201).json(user)
});

const getOne = catchError(async(req, res) =>{
    const {id}  = req.params;
    const user = await User.findByPk(id);
    return res.json(user);
});

const remove = catchError(async(req, res)=>{
    const {id}  = req.params;
    await User.destroy({where:{id}});
    return res.sendStatus(204);
});

const update = catchError(async(req, res)=>{
    const {id}  = req.params;
    const {first_name, last_name, email, password, birthday} = req.body 
    const user = await User.update(
        {first_name, last_name, email, password, birthday},
        { where: {id}, returning: true }
    );
    return res.json(user[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}
