//FIRST MIDDLEWARE 

const jwt = require('jsonwebtoken')

//Secret jwt string
// const JWD_SECREAT = process.env.JWD_SECREAT_KEY;
const JWD_SECREAT = "pjphukan";


const fetchuser = (req, res, next) => {
    //Get the user from jwt token and add id to req object
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ error: "Please authonticate using a valid token" });
    }
    try {
        //verify token
        const data = jwt.verify(token, JWD_SECREAT)

        req.user = data.user;

        //next function call
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authonticate using a valid token" });
    }


}

module.exports = fetchuser;