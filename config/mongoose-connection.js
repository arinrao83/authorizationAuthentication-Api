const mongoose = require('mongoose')

const connectDb = async()=>{
   try{
    await  mongoose.connect(process.env.MONGO_URL);
   console.log('connected to db')
   }
   catch(err){
    console.log('mongodb connection err: '+ err)
    process.exit(1)
   }

}

module.exports = connectDb

