import dbConnect from "../../../utils/connection"
import Note from "../../../models/Note"
import mongoose from "mongoose";

export default async function handler(req, res) {

    await dbConnect();

    const method = req.method

    switch (method) {
        case "POST":
            const { subject, classroom, name, url } = req.body
            const note = new Note({
                subject,
                classroom,
                name,
                url
            })

            const response = await note.save()
            if (response) {
                const send = await Note.find({classroom, subject})
                res.json(send)
            } else {
                res.json({ error: "Error" })
            }
            break;

        case "GET":
            const getClass = req.query.classroom
            const getSubject = req.query.subject
            const notes = await Note.find({ classroom: getClass, subject: getSubject })
            if (notes) {
                res.json(notes)
            } else {
                res.json({ error: "something went wrong" })
            }
            break;
    }

}