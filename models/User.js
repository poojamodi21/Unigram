import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
