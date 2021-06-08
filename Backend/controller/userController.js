const {body,validationResult} = require('express-validator');
const userModel = require('../model/userModel');
const bcrypt = require('bcryptjs')


// checking errors for register 
module.exports.registerValidations = [
    body('name').not().isEmpty().trim().withMessage("Correct email required"),
    body('email').not().isEmpty().trim().withMessage("Email is required"),
    body('password').isLength({min:6}).withMessage("Password must be 6 char long")
];
module.exports.register =async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()});
    }
    try{
      
        //check if user is present or not
        const checkUser = await userModel.findOne({email:req.body.email});
        if(checkUser){
            return res.status(400).json({errors:[{msg:"Email has already taken"}]})
        } 
        const user = new userModel(req.body);

        //generating token which contains all user details
        const token = await user.generateAuthToken(user);
        await user.save();
        return res.status(200).json({msg:"Your account has been created successfully",token})
    }catch(err){
        console.log(err);
        return res.status(400).json({errors:err});
    }
}


module.exports.loginValidations = [
    body('email').not().isEmpty().trim().withMessage("Correct email required"),
    body('password').not().isEmpty().withMessage("Password is required")
];
module.exports.login = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()});
    }

    try{
        const email = req.body.email;
        const password = req.body.password;

        const userPresent = await userModel.findOne({email});
        // console.log(userData);

        if(userPresent){
            //checking encrypted password using bcrypt
            const isMatched = await bcrypt.compare(password,userPresent.password);
            if(isMatched){
                const token = await userPresent.generateAuthToken(userPresent);
                return res.status(201).json({msg:"You have logged in successfully",token})
            }else{
                return res.status(401).json({errors:[{msg:"Email or password not correct"}]})
            }
        }
        else{
            return res.status(404).json({errors:[{msg:"user not found"}]})
        }

    }catch(err){
        console.log(err);
        return res.status(400).json({errors:err})
    }

}