const mongoose = require('mongoose')
const {Schema}=mongoose;

//Create user schema
const UserSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default:Date.now
    }
});
//create user model
const User = mongoose.model("user", UserSchema);
// User.createIndexes();
module.exports = User;