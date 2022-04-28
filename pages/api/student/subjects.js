import dbConnect from "../../../utils/connection"
import Classes from '../../../models/Classes'
import mongoose from "mongoose";
import { checkAuth } from "../../../utils/middleware";

export default async function handler(req, res) {

    await dbConnect();
    const { authorization } = req.headers
    const user = await checkAuth(authorization)

    const method = req.method

    switch (method) {
        case "GET":
            const classroom = await Classes.findOne({name: user.student.studentClass})
            if(classroom){
                res.json(classroom)
            }
            break;
    }

}