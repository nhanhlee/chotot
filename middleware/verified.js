var jwt = require('jsonwebtoken');
require('dotenv').config()

function verified(req,res){
        let token = req.header('Authorization');
        if (token.startsWith('Bearer ')){
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token,process.env.Pass); 
        return res.json(verified.id);
}

module.exports= verified;