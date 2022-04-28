import dbConnect from "../../../utils/connection"
import Note from '../../../models/Note'
import Student from '../../../models/Student'
import mongoose from "mongoose";
import { checkAuth } from "../../../utils/middleware";

export default async function handler(req, res) {

    await dbConnect();
    const { authorization } = req.headers
    const {subject} = req.query.subject
    const user = await checkAuth(authorization)

    const method = req.method

    switch (method) {
        case "GET":
            const student = await Student.findOne({userName: user.student.userName})
            console.log(subject)
            const getNote = await Note.find({ classroom: student.studentClass})
            console.log(getNote)
            if(getNote){
                res.json(getNote.reverse())
            }
            break;
    }

}