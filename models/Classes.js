import mongoose from "mongoose";

const ClassesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "Class already exists"]
    },
    subjects: [{
        subjectName: {
            type: String,
            required: true
        },
        teacherName: {
            type: String,
            required: true
        }
    }]
})

module.exports = mongoose.models.Classes || mongoose.model('Classes', ClassesSchema);