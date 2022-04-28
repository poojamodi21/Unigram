import dbConnect from "../../../utils/connection"
import { checkAuth } from "../../../utils/middleware";
import Classes from "../../../models/Classes"
import mongoose from "mongoose";

export default async function handler(req, res){

    await dbConnect();
    const { authorization } = req.headers
    const user = await checkAuth(authorization)

    if(user.error){
        return res.json({error: user.error})
    }else if(!user.type === "TEACHER"){
        return res.json({error: "You are not authorized"})
    }

    const method = req.method

    switch(method){
        case "GET":
            const classes = await Classes.find({"subjects.teacherName":user.teacher.userName})
            const arr = []
            classes.map(classs => {
                classs.subjects.map(subject => {
                    if(subject.teacherName === user.teacher.userName){
                        arr.push({_id:subject._id, classroom: classs.name, subject: subject.subjectName})
                    }
                })
            })
            res.json(arr)
            break;
        
            
    }

}