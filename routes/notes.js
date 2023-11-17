//Notes Router section

const express = require('express')
const router = express.Router();
//Express validator
const { checkSchema, validationResult } = require('express-validator');

//Import Notes module
const Notes = require('../models/Notes')

//Middleware import
const fetchuser = require('../Middleware/fetchuser')


//EndPoints:::---->>>Fetch user all notes using:-> GET '/api/notes/fetchallnotes' , login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        //get user details
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {

        //If error occured then handling the error in the catch block
        console.error(error.massage);

        // console.log(error)
        res.status(500).send("Internal Server Error");
    }
})




//EndPoints:::---->>>Add a new notes using:-> POST '/api/notes/addnote' , login required

router.post('/addnote', fetchuser, checkSchema({

    //title schema check
    title: {
        isLength: {
            options: { min: 3 },
        },
        errorMessage: "Enter a valid Title!"
    },

    //description schema check
    description: {
        errorMessage: "Please enter valid description"

    }
}), async (req, res) => {

    try {



        //if there are error,return an error with an bad request 400
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //destructure
        const { title, description, tag } = req.body

        //create a schcema for user notes
        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save();

        res.json(savedNote)

    } catch (error) {

        //If error occured then handling the error in the catch block
        console.error(error.massage);

        // console.log(error)
        res.status(500).send("Internal Server Error");
    }

})



//EndPoints:::---->>>Update Existing notes using:-> PUT '/api/notes/updatenotes' , login required

router.put('/updatenotes/:id', fetchuser, async (req, res) => {


    try {
        //destructure
        const { title, description, tag } = req.body;

        //Create newNote object
        const NewNote = {};

        //If Title comes from the user side
        if (title) { NewNote.title = title };

        //If Description comes from the user side
        if (description) { NewNote.description = description };

        //If Tag comes from the user side
        if (tag) { NewNote.tag = tag };

        //Find the note to be updated and update it
        let note =await Notes.findById(req.params.id);

        //Check request note id available or not
        if (!note) {
            return res.status(404).send("Not Found!");
        }

        //Check login user and note user id same or not
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!")
        }

        //Update note
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: NewNote }, { new: true })

        //Send Note to User
        res.send({ note })

    } catch (error) {

        //If error occured then handling the error in the catch block
        console.error(error.massage);

        // console.log(error)
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router;