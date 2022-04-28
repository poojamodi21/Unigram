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

        case "GET":
            const allPost = await Post.find({student: user.student.userName})
            if(allPost){
                res.json(allPost.reverse())
            }
            break;
    }

}