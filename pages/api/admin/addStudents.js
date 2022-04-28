import bcrypt from "bcryptjs/dist/bcrypt";
import connectDB from "../../../utils/connection";
import Student from "../../../models/Student";

export default async function handler(req, res) {

  await connectDB();

  const { array } = req.body

  array.map((item) => {

    bcrypt.hash((Object.values(item)[1]), 12)
    .then(hashedPassword => {
      const student = new Student({
        userName: (Object.values(item)[0]),
        password: hashedPassword,
        studentClass: (Object.values(item)[2]) 
      })

      student.save()
    })
  })

  res.json({message: "Students Added"})

}