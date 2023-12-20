//require section
const express = require('express');
const MongoToConnect=require('./db');
let cors = require('cors')

//Connect to mongoose
MongoToConnect();

const app = express();
const port = 8000;

//Middleware
app.use(express.json());
app.use(cors())


//Availble routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));





//listen port
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})