const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

// createing a login router
const loginRouter = require('express').Router();

loginRouter.post('/',async (req,res)=>{
    //get the credentials from the request body
    const {username,password }= req.body;

    //Check if user exit in the database
    const user = await User.findOne({username});

    //if the user doesnot exist, return an error
    if(!user){
        return res.status(401).json({
            message:"User does not exist"
        });
    }

   //Check if the password is correct or not
   const isAuthenticated = await bcrypt.compare(password,user.passwordHash);

   // if password is in correct
   if(!isAuthenticated){
    return res.status(401).json({
        message:"Password is incorrect"
    })
   }

   // define the payload of the token
   const payload = { 
    username:user.username,
    id:user._id
   }
   // if the password is correct generate a token
   const token = jwt.sign(payload,config.JWT_SECRET,{expiresIn:'1hr'});

   // sent the token as response
    res.status(200).json({
        token,username:user.username,name:user.name
    })
})



// export the loginRouter
module.exports = loginRouter;