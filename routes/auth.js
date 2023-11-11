//Authontication Router section

const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { checkSchema } = require('express-validator');
const { body, validationResult } = require('express-validator');



//Create a user Using:-> POST '/api/auth/createuser' ,Doesn't require auth (no login required)
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

      //create a new user
      user = await User.create({
         name: req.body.name,
         password: req.body.password,
         email: req.body.email
      })
      res.json(user)
   } catch (error) {
      //catch error
      console.error(error.massage);
      sres.status(500).json("Some error occured!");
   }


})


module.exports = router;