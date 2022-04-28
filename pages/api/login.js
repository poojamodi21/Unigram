import bcrypt from "bcryptjs/dist/bcrypt";
import connectDB from "../../utils/connection";
import User from "../../models/User";
import Student from "../../models/Student";
import Teacher from "../../models/Teacher";
import * as jwt from 'jsonwebtoken';

export default async function handler(req, res) {

  await connectDB();

  const { userName, password } = req.body
  if (!userName || !password) {
    return res.status(422).json({ error: "Please enter User Name and Password" })
  }
  const savedUser = await User.findOne({ userName: userName })
  const savedTeacher = await Teacher.findOne({ userName: userName })
  const savedStudent = await Student.findOne({ userName: userName })

  if (savedStudent) {
    const Matched = await bcrypt.compare(password, savedStudent.password)

    if (Matched) {
      const token = jwt.sign({ _id: savedStudent._id }, process.env.JWT_KEY)
      res.json({ token, type: 'STUDENT', userName: savedStudent.userName })
    }
    else {
      return res.status(422).json({ error: "Invalid User Name or Password" })
    }
  } else if (savedTeacher) {
    const Matched = await bcrypt.compare(password, savedTeacher.password)

    if (Matched) {
      const token = jwt.sign({ _id: savedTeacher._id }, process.env.JWT_KEY)
      res.json({ token, type: 'TEACHER', userName: savedTeacher.userName })
    }
    else {
      return res.status(422).json({ error: "Invalid User Name or Password" })
    }
  } else if (savedUser) {
    const Matched = await bcrypt.compare(password, savedUser.password)

    if (Matched) {
      const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_KEY)
      res.json({ token, type: 'ADMIN', userName: savedUser.userName })
    }
    else {
      return res.status(422).json({ error: "Invalid User Name or Password" })
    }
  }else{
    return res.status(422).json({ error: "Invalid User Name or Password" })
  }

}
