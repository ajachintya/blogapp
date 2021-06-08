const jwt = require('jsonwebtoken');
//middleware to check user is valid or not
module.exports = (req,res,next)=>{
    // accessing headers from client req
    const authHeaders = req.headers.authorization;
    const token = authHeaders.split('Bearer ')[1];
    try{
        //verifying user token with secret key
        jwt.verify(token,process.env.SECRET_KEY);
        next();
    }catch(err){
        console.log(err);
        return res.status(401).json({errors:[{msg:err.message}]});
    }
}