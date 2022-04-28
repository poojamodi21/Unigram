import dbConnect from "../../../utils/connection"
import Chat from '../../../models/Chat'
import mongoose from "mongoose";
import { checkAuth } from "../../../utils/middleware";

export default async function handler(req, res) {

    await dbConnect();
    const { authorization } = req.headers
    const user = await checkAuth(authorization)

    const method = req.method

    switch (method) {
        case "GET":
            const { selectedUser } = req.query
            const chatresult = await Chat.findOne({userOne: user.student.userName, userTwo: selectedUser})
            const chatresult2 = await Chat.findOne({userOne: selectedUser, userTwo: user.student.userName})
            if(chatresult){
                res.json(chatresult)
            }else if(chatresult2){
                res.json(chatresult2)
            }else{
                res.json({error:"Start a new chat"})
            }

            break;
        case "PUT":
            const { selected, message } = req.body
            const result = await Chat.findOne({userOne: user.student.userName, userTwo: selected})
            const result2 = await Chat.findOne({userOne: selected, userTwo: user.student.userName})
            let _id
            if(result){
                _id = result._id
                const response = await Chat.findByIdAndUpdate({_id},{
                    $push:{messages:{message, user: user.student.userName}}
                },{
                    new: true
                })
                if(response){
                    res.json(result)
                }
            }else if(result2){
                _id = result2._id
                const response2 = await Chat.findByIdAndUpdate({_id},{
                    $push:{messages:{message, user: user.student.userName}}
                },{
                    new: true
                })
                if(response2){
                    res.json(result2)
                }
            }else{
                const chat = new Chat({
                    userOne: user.student.userName,
                    userTwo: selected,
                    messages: [{
                        user: user.student.userName,
                        message
                    }]
                })
                const response3 = await chat.save()
                if(response3){
                    res.json(response3)
                }
            }
            break;
    }

}