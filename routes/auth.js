//Authontication Router section

const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router();
const User = require('../models/User')
const { checkSchema } = require('express-validator');
const { body, validationResult } = require('express-validator');

//Secret jwt string
// const JWD_SECREAT = process.env.JWD_SECREAT_KEY
const JWD_SECREAT ="pjphukan"

//Middleware import
const fetchuser = require('../Middleware/fetchuser') 


//EndPoints:::---->>>Create a user Using:-> POST '/api/auth/createuser' ,Doesn't require auth (no login required)
router.post('/createuser', checkSchema({

   //name schema check
   name: {
      isLength: {
         options: { min: 3 },
      },
      errorMessage: "Enter a valid name!"
   },

   //email schema check
   email: {
      isEmail: true,
      errorMessage: "Enter a valid email!"

   },
   //password schema check
   password: {
      isLength: {
         options: { min: 6 },
      },
      errorMessage: "Password should be at least 6 character!"
   },
}), async (req, res) => {


   //error handling
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      let user = await User.findOne({ email: req.body.email })

      //Check Email Already exist or not
      if (user) {
         return res.status(400).json({ error: "Email Already exist !" })
      }

      //password secure section
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //create a new user
      user = await User.create({
         name: req.body.name,
         password: secPass,
         email: req.body.email
      })


      //jsonwetoken section
      const data = {
         user: {
            id: user.id
         }
      }
      const authToken = jwt.sign(data, JWD_SECREAT)
      // console.log(jwtData)

      // res.json(user)
      res.json({ authToken })

   } catch (error) {
      //catch error
      console.error(error.massage);
      res.status(400).send("Internal Server Error");
   }


})





//EndPoints:::---->>>Authonticate a user Using:-> POST '/api/auth/login' ,no login required
router.post('/login', checkSchema({
   //email schema check
   email: { isEmail: true, errorMessage: "Enter a valid email!" },
   password: { errorMessage: "Password can't be blank" }
}), async (req, res) => {

   //if there are error,return an error with an bad request 400
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   //destructure email and password
   const { email, password } = req.body;

   try {
      //Check user email exists or not in the database
      const user = await User.findOne({ email })
      // console.log(user)
      //If user email does not exists in the database then it return an error with an bad request 400.
      if (!user) {
         return res.status(400).json({ error: "Please enter correct credentials" })
      }

      //compare user passoed with the database for login
      const passwordCompare = await bcrypt.compare(password, user.password);//It returns a boolean value 
      if (!passwordCompare) {
         //if user detail does not match with the user database information then return a bed requast and an error massage 
         return res.status(400).json({ error: "Please enter correct credentials" })
      }


      //If above all the details correct then return the user id 
      const data = {
         user: {
            id: user.id
         }
      }
      const authToken = jwt.sign(data, JWD_SECREAT)

      //Return the user authotication token
      res.json({ authToken })

   } catch (error) {
      //If error occured then handling the error in the catch block
      console.error(error.massage);
      // console.log(error)
      res.status(500).send("Internal Server Error");
   }

})




//EndPoints:::---->>>Get logged in user details:-> POST '/api/auth/getuser' , login required

//fetchuser is a middleware
router.post('/getuser',fetchuser, async (req, res) => {

   try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("--password")
      res.send(user);

   } catch (error) {

      //If error occured then handling the error in the catch block
      console.error(error.massage);

      // console.log(error)
      res.status(500).send("Internal Server Error");
   }
})



module.exports = router;