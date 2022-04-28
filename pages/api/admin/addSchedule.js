import dbConnect from "../../../utils/connection"
import Schedule from "../../../models/Schedule"
import mongoose from "mongoose";

export default async function handler(req, res) {

    await dbConnect();

    const method = req.method

    switch (method) {
        case "POST":
            const { name, url } = req.body
            const schedule = new Schedule({
                name,
                url
            })

            const response = await schedule.save()
            if (response) {
                res.json({message: "Schedule added"})
            } else {
                res.json({ error: "Error" })
            }
            break;

        case "GET":
            const allSchedule = await Schedule.find()
            if (allSchedule) {
                res.json(allSchedule)
            } else {
                res.json({ error: "something went wrong" })
            }
            break;
    }

}