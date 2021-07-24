const express = require('express')
const router = express.Router();
const userModel = require('../models/UserModel')
const userControllers = require("../controllers/UserController");
const validate = require("../middleware/validate");
const validationResult = require("../middleware/validationResult");
const checkLogin = require("../middleware/checkAuth")

router.post("/register",
    validate.validateRegisterUser,
    validationResult,
    userControllers.register
)

router.post("/login",
    validate.validateLogin,
    validationResult,
    userControllers.login
)

router.put('/list',
    checkLogin,
    validate.validataUsername,
    validationResult,
    userControllers.editFrofile
)

router.get("/todo",(req,res)=>{
    userModel.findOne({_id : "60f85a3abe0392379429b796"}).then((data)=>{console.log(data)})
})


module.exports = router;