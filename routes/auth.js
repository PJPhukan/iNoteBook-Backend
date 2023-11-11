//Authontication Router section

const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { checkSchema } = require('express-validator');
const { body, validationResult } = require('express-validator');

//Create a user Using:-> POST '/api/auth/' ,Doesn't require auth 


router.post('/', checkSchema({
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
}), (req, res) => {


   //error handling
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   //send data to database
   User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
   }).then(user => res.json(user)).catch(err => {
      console.log(err);
      res.json({ error: "Email Already exist !" });
   });


})


module.exports = router;