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

isAdmin = (req, res, next)=> {
    User.findById(req.userId).exec((err, user)=> {
        if(err){
            res.status(500).send({message:err})
        }
    })
}