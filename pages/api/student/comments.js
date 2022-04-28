import dbConnect from "../../../utils/connection"
import Post from '../../../models/Post'
import mongoose from "mongoose";
import { checkAuth } from "../../../utils/middleware";

export default async function handler(req, res) {

    await dbConnect();
    const { authorization } = req.headers
    const user = await checkAuth(authorization)

    const method = req.method

    switch (method) {
        case "PUT":
            const { comment } = req.body
            const _id = req.body.postId
            if(!comment || !_id){
                return res.status(422).json({error:"Please enter all fields"})
            }
            const result = await Post.findByIdAndUpdate({_id},{
                $push:{comments:{comment,student: user.student.userName}}
            },{
                new: true
            })

            if(result){
                const allPost = await Post.find()
                res.json(allPost.reverse())
            } else {
                res.json({error:"Something went wrong"})
            }
            break;
    }

}