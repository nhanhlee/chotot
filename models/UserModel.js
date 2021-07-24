const mongoose = require('mongoose');

const userSchema =mongoose.Schema({
    username: String,
    password : String,
    email: String,
    avata: String
},{connection: "user"})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;