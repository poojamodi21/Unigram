import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    userOne: {
        type: String,
        required: true,
    },
    userTwo:{
        type: String,
        required:true,
    },
    messages: [{
        user: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    }]
})

module.exports = mongoose.models.Chat || mongoose.model('Chat', ChatSchema);