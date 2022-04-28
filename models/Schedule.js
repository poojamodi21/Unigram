import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.models.Schedule || mongoose.model('Schedule', ScheduleSchema);