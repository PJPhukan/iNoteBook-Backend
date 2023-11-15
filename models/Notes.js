const mongoose = require('mongoose')
const { Schema } = mongoose; 


const NotesSchema = new Schema({
    user: {
        // Connect  with user schema and notes schema
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default:"general"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("notes", NotesSchema);