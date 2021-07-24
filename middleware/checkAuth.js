var jwt = require('jsonwebtoken');
require('dotenv').config()

function checkLogin (req,res,next){
    let token = req.header('Authorization');
    if (!token) return res.status(401).send("Access Denied");
    try{
        if (token.startsWith('Bearer ')){
            token = token.slice(7, token.length).trimLeft();
        }
        //let pass = process.env.Pass;
        const verified = jwt.verify(token,process.env.Pass); 
        req.user = verified;
       // res.json(verified)
        next();
    }
    catch (err) {
        res.status(400).send("Invalid Token");
    }
}

module.exports = checkLogin;