const { default: mongoose, model } = require("mongoose");


const userSchema = new mongoose.Schema({
    username:String,
    name:String,
    passwordHash:String,
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:Date,
    notes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
});

// create a user model from the schema
const User = mongoose.model('User',userSchema,'users');

// export the user model

module.exports = User;