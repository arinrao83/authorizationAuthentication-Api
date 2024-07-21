const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

module.exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).send('Your account already exists, please login');
        }
        let salt = await bcrypt.genSalt();
        let hash = await bcrypt.hash(password, salt);

        // Await the user creation
        user = await userModel.create({
            email,
            password: hash,
            name,
        });

        let token = generateToken({ email });
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        // Return the user details
        res.status(201).send(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
};



module.exports.loginUser = async(req,res)=>{
    const{email, password} = req.body
    try{
        let user = await userModel.findOne({email})
    if(!user){
       return res.status(500).send("email and password are incorrect")
    }
    let result = await bcrypt.compare(password, user.password)
    if(result){
        let token = generateToken({ email });
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        // Return the user details
        res.status(201).send("logged in successfully");
       
    }
    else{
        return res.status(500).send("email and password are incorrect")
    }
    }
    catch(err){
        res.status(500).send(err.message);
    }

}


module.exports.logoutUser = function(req,res){
   
        res.cookie('token', "", {
            httpOnly: true,
            secure: true,
            
        });

        
        res.status(201).send("logged out successfully");
}


module.exports.getUserProfile = function(req,res){
    res.send("You are logged in , welcome to your profile")
}