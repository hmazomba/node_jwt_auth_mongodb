const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next)=>{
    //Check if user exists using their username
    User.findOne({
        username: req.body.username
    }).exec((err, user)=> {
        if(err){
            res.status(500).send({message:err});
            return;
        }
        if(user){
            res.status(400).send({message: "Failed! Username is already in use!"})
            return;
        }

        User.findOne({
            email:req.body.email
        }).exec((err, user)=> {
            if(err){
                res.status(500).send({message:err});
                return;
            }
            if(user){
                res.status(400).send({message: "Failed! Email is already in use!"})
            }
            next();
        })
    })
}
//Checks if role exists in db
checkRolesExisted = (req, res, next)=>{
    if(req.body.roles){
        for(let i = 0; i< req.body.role.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist`
                })
                return
            }
        }
    }
    next()
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};

modules.exports = verifySignUp