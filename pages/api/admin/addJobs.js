import connectDB from "../../../utils/connection";
import Job from "../../../models/Job";

export default async function handler(req, res) {

  await connectDB();

  const { title, description, ctc, company, location, link } = req.body

  if (!title || !description || !ctc || !company || !location || !link) {
    return res.status(422).json({ error: "please add all the fields" })
  }

  const job = new Job({
    title,
    description,
    ctc,
    company,
    location,
    link
  })
  
  const newJob = await job.save()
    if(newJob){
      res.json({ message: "Job added successfully" })
    }else{
      return res.status(422).json({ error: "An unknown error occured" })
    }
}