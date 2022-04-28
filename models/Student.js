import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please add a user name'],
        unique: [true, 'User already exists']
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    studentClass: {
        type: String,
        required: true
    }
})

module.exports = mongoose.models.Student || mongoose.model('Student', StudentSchema);
