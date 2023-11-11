const mongoose=require('mongoose')
const mongoURI ="mongodb://127.0.0.1:27017/iNotebook"


const MongoToConnect=()=>{
    mongoose.connect(mongoURI).then(() => {
        console.log("Connection successfull")
    }).catch((err) => {
        console.log("Connection failed")
    });
}

module.exports=MongoToConnect;

//mongoose.connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("Connection successfull")
// }).catch((err) => {
//     console.log("Connection failed")
// });