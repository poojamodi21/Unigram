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
        case "POST":
            const { caption, url } = req.body
            const student = user.student.userName
            if(!student){
                return res.status(401).json({
                    message: "You are not authorized to post"
                })
            }

            const post = new Post({
                caption,
                url,
                student
            })
            const newPost = await post.save()
            if(newPost){
                const allPost = await Post.find()
                if(allPost){
                    res.json(allPost.reverse())
                }
            }

            break;

        case "GET":
            const allPost = await Post.find()
            if(allPost){
                res.json(allPost.reverse())
            }
            break;
    }

}