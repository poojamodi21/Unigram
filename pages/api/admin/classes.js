import connectDB from "../../../utils/connection";
import Classes from "../../../models/Classes";

export default async function handler(req, res) {

    await connectDB();

    const method = req.method

    switch (method) {
        case "POST":
            const { newClass } = req.body
            const nClass = new Classes({
                name: newClass
            })

            const saved = await nClass.save()
            if (saved) {
                const allClasses = await Classes.find()
                res.status(200).json( allClasses )
            } else {
                res.json({ error: "something went wrong" })
            }
            break;

        case "GET":
            const allClasses = await Classes.find()
            if(allClasses){
                res.status(200).json( allClasses )
            }else{
                res.json({error:"something went wrong"})
            }
            break;

        case "PUT":
            const {_id, subject, teacher} = req.body
            if(!_id || !subject || !teacher){
                return res.status(422).json({error:"Please enter all fields"})
            }
            const result = await Classes.findByIdAndUpdate({_id},{
                $push:{subjects:{subjectName:subject,teacherName:teacher}}
            },{
                new: true
            })

            if(result){
                res.json(result)
            } else {
                res.json({error:"Something went wrong"})
            }
            break;

    }
}