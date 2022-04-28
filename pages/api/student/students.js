import dbConnect from "../../../utils/connection"
import Student from '../../../models/Student'
import mongoose from "mongoose";
import { checkAuth } from "../../../utils/middleware";

export default async function handler(req, res) {

    await dbConnect();
    const { authorization } = req.headers
    const user = await checkAuth(authorization)

    const method = req.method

    switch (method) {

        case "GET":
            const allStudents = await Student.find()
            if(allStudents){
                res.json(allStudents.filter(item=> item.userName != user.student.userName))
            }
            break;
    }

}