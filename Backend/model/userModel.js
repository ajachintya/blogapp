const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true}
)

//generating token for specific user using jwt 
userSchema.methods.generateAuthToken = async function(user){
    try{
        const token = jwt.sign({user},process.env.SECRET_KEY,{
            expiresIn:'7d'
        });
        // console.log(token)
        return token;
    }catch(e){
        console.log(e);
    }
}

// excryptinh password before saving it into database
userSchema.pre('save', async function(next){
    if(this.isModified("password")){
        // console.log(this.password);
    this.password = await bcrypt.hash(this.password,10);
    // console.log(this.password);
    }
    next();
})

module.exports = new mongoose.model("User",userSchema);