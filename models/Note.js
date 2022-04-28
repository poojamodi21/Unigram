import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    classroom: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema);