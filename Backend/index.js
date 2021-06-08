require('dotenv').config();
const express = require('express')
const app = express();
const port = process.env.PORT;
const postRoute = require('./routes/postRoutes');
require('./config/mongoose');

// it parses incoming requests with urlencoded payloads
app.use(express.urlencoded({extended:false}));
//to parse incomming json request
app.use(express.json());
app.use('/',require('./routes'))
app.use('/',postRoute);


app.listen(port, () => console.log(`Server running on port ${port} 🔥`));