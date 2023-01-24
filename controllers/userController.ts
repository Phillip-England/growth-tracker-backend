
import { PrismaClient } from "@prisma/client"
import UserModel from "../models/userModel"
// const UserModel = require('../models/userModel')


export const createUser = async (req: any, res: any) => {
  try {
    const {username, password, email} = req.body
    const user = new UserModel(username, password, email)
    await user.validate()
    res.status(200).json({
      "username": user.username,
      "password": user.password,
      "email": user.email
    })
  } catch (err) {
    let result = (err as Error).message
    res.status(400).json({"message": result})
  }
}

module.exports = {
  createUser
}