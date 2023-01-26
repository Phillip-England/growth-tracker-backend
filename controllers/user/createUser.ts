
import { PrismaClient } from "@prisma/client"
import UserModel from "../../models/userModel"
const prisma = new PrismaClient()

export const createUser = async (req: any, res: any) => {
  try {
    const {username, password, email} = req.body
    const user = new UserModel(username, password, email)
    await user.validate()
    const userExists = await prisma.user.findMany({
      where: {
        username: user.username
      }
    })
    if (userExists.length !== 0) {
      throw new Error("Username already taken")
    }
    const prismaUser = await prisma.user.create({ 
      data: {
          username: user.username,
          password: user.password,
          email: user.email
      }})
    res.status(201).json({"message": "User created"})
  } catch (err) {
    let result = (err as Error).message
    res.status(400).json({"error": result})
  } finally {
    await prisma.$disconnect()
  }
}

