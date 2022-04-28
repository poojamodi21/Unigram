import bcrypt from "bcryptjs/dist/bcrypt";
import connectDB from "../../../utils/connection";
import Teacher from "../../../models/Teacher";

export default async function handler(req, res) {

  await connectDB();

  const method = req.method

  switch (method) {
    case "POST":
      const { userName, password } = req.body

      if (!userName || !password) {
        return res.status(422).json({ error: "please add all the fields" })
      }

      const savedUser = await Teacher.findOne({ userName: userName })
      if (savedUser) {
        return res.status(422).json({ error: "user already exists" })
      }

      const hashedpassword = await bcrypt.hash(password, 12)
      const user = new Teacher({
        userName,
        password: hashedpassword
      })

      const newUser = await user.save()
      if (newUser) {
        res.json({ message: "saved successfully" })
      } else {
        return res.status(422).json({ error: "An unknown error occured" })
      }
      break;

    case "GET":
      const response = await Teacher.find()
      if (response) {
        res.json(response)
      } else {
        res.json({ error: "something went wrong" })
      }
      break;
  }
}