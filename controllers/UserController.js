const express = require('express')
const userModel = require('../models/UserModel')
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config()
const test = require("../middleware/verified")

let register = async function(req,res){
    try{
        let password = await bcrypt.hash(req.body.password, 10);
        let data = await userModel.create({
            username: req.body.username,
            password: password,
            email: req.body.email
        })
        res.json('dang ky thanh cong')
    }
    catch(err){
        res.status(500).send(err);
    }
   
}

let login = async function(req,res){
    try {
        let user = await userModel.findOne({email : req.body.email})
        if(!user){
            return res.status(401).send(`Email is wrong`);
        }
        else {
            let validPass = await bcrypt.compare(req.body.password, user.password)
            if(!validPass)
            return res.status(400).send("Password is wrong");
            var token = await jwt.sign({id:user._id },process.env.Pass);
            res.send({"token": token});
        }
    }
    catch(err){
        res.status(401).send(`Email or Password is wrong`);
    }
    
}

let editFrofile = async function(req,res){
    try{
        let token = req.header('Authorization');
        if (token.startsWith('Bearer ')){
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token,process.env.Pass); 
        let id = verified.id;
        let data = await userModel.updateOne({_id:id},{username : req.body.username})
        if(data.nModified>0){
            res.json("update thanh cong") 
        }else{
            res.json("username da ton tai")
        }
    }
    catch(err){
        console.log("loi")
    }
}

module.exports = {register, login, editFrofile}
