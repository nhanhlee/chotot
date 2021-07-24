const { body } = require('express-validator');
const userModel = require("../models/UserModel")

let validateRegisterUser =[
    body("email")
        
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("The email is invalid format")
        .custom(value =>{
            return userModel.findOne({email: value}).then(user =>{
                if(user) {
                    throw new Error('E-mail already in use');
                }
            })
        }),
    body("password")
        .not().isEmpty()
        .withMessage("Password does not Empty")
        .exists()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password more than 6 degits")
        .matches(/\d/)
        .withMessage('must contain a number'),
    body("username")
        .not().isEmpty()
        .withMessage("Username does not Empty")
        .exists()
        .withMessage("Username is required")
        .isLength({ min: 6 })
        .withMessage("Username more than 6 degits")   
]


let validateLogin = [
    body("email")
        
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("The email is invalid format"),
    body("password")
        .not().isEmpty()
        .withMessage("Password does not Empty")
        .exists()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password more than 6 degits")
        .matches(/\d/)
        .withMessage('must contain a number')
]

let validataUsername = [
    body("username")
        .not().isEmpty()
        .withMessage("Username does not Empty")
        .exists()
        .withMessage("Username is required")
        .isLength({ min: 6 })
        .withMessage("Username more than 6 degits")   
]

module.exports = {validateRegisterUser, validateLogin, validataUsername}