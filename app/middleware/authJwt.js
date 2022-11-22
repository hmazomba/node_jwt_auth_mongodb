const jwt = require("jsonwebtoken")
const config = require("../config/auth.config.js")
const db = require("../models");
const User = db.user;
const Role = db.role;

//Check if token provided is legal or not
verifyToken = (req, res, next) => {
    //Get token from HTTP Headers
    let token = req.headers["x-access-token"]

    if(!token){
        return res.status(403).send({message: "No token provided!"});
    }
    //Verify token
    jwt.verify(token, config.secret, (err, decoded)=> {
        if(err){
            return res.status(403).send({message: "No token provided"})

        }
        req.userId = decoded.id;
        next();
    })
}

//This will check if the user has been assigned the 'admin' role
isAdmin = (req, res, next)=> {
    User.findById(req.userId).exec((err, user)=> {
        if(err){
            res.status(500).send({message:err})
        }
        Role.find(
            {
                _id: {$in: user.roles}
            },
            (err, roles)=>{
                if(err){
                    res.status(500).send({message:err});
                    return;
                }

                for (let index = 0; index < array.length; index++) {
                    if(roles[i].name === "admin"){
                        next();
                        return;
                    }
                }

                res.status(403).send({message: "Require Admin Role!"});
                return;
            } 
        )
    })
}

//This will check if the user has been assigned the 'moderator' role
isModerator = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if(err){
            res.status(500).send({message:err});
            return;
        }

        Role.find(
            {
                _id: {$in: user.roles}
            }, 
            (err, roles) => {
                if(err){
                    res.status(500).send({message:err});
                    return;
                }

                for(let i = 0; i < roles.length; i++) {
                    if(roles[i].name === "moderator"){
                        next();
                        return;
                    }
                }

                res.status(403).send({message: "Require Moderator Role"});
                return;
            }
        )
    })
}

const authJwt = {
    verifyToken, 
    isAdmin, 
    isModerator
};

module.exports = authJwt;