const jwt = require('jsonwebtoken')
const userModel = require('../models/user-model')

module.exports.protect =async (req,res,next)=>{
    
        if(req.cookies.token){
            try{
                const data= await jwt.verify(req.cookies.token,process.env.JWT_SECRET)
                req.user = userModel.findOne({email:data.email}).select('-password')
         
                next();

            }
            catch(err){
                res.status(401).send("Not Authorized")
           
         }
    }
    if(!req.cookies.token){
        res.status(401).send("Not Authorized, You don't have permission to access.")
    }

}