import dbConnect from "../../../utils/connection"
import Job from '../../../models/Job'
import mongoose from "mongoose";

export default async function handler(req, res) {

    await dbConnect();

    const method = req.method

    switch (method) {

        case "GET":
            const allJobs = await Job.find()
            if(allJobs){
                res.json(allJobs.reverse())
            }
            break;
    }

}