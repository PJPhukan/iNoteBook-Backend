const mongoose = require('mongoose')
const { Schema } = mongoose; 


const NotesSchema = new Schema({
    title: {
        type: string,
        required: true
    },
    description: {
        type: string,
        required: true
    },
    tag: {
        type: string,
        default:"general"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("notes", NotesSchema);