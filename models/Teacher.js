import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please add a user name'],
        unique: [true, 'User already exists']
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    }
})

module.exports = mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);
