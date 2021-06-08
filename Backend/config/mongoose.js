const mongoose = require('mongoose');

//setting up connection with mongodb using mongoose
mongoose.connect(process.env.DB_PATH,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})
.then(()=>{
    console.log("Connect to db");
})
.catch((err)=>{
    console.log(err);
})