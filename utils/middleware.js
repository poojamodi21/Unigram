import * as jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User';
import Teacher from '../models/Teacher';
import Student from '../models/Student';

export async function checkAuth(authorization) {
    if(!authorization){
        return {error: 'You must be logged in'}
    }

    const token = authorization.replace("Bearer ","")
    const payload = jwt.verify(token, process.env.JWT_KEY)

    if(!payload){
        return {error: 'You must be logged in'}
    }

    const user = await User.findById(payload._id)
    const teacher = await Teacher.findById(payload._id)
    const student = await Student.findById(payload._id)

    if(!user && !teacher && !student){
        return {error: 'You must be logged in'}
    }else if(user){
        user.password = undefined
        return {type: 'USER', user}
    }else if(teacher){
        teacher.password = undefined
        return {type: 'TEACHER', teacher}
    }else if(student){
        student.password = undefined
        return {type: 'STUDENT', student}
    }
}