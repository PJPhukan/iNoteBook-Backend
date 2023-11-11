//require section
const express = require('express');
const MongoToConnect=require('./db');

//Connect to mongoose
MongoToConnect();

const app = express();
const port = 8000;

//Middleware
app.use(express.json());


//Availble routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));





//listen port
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})