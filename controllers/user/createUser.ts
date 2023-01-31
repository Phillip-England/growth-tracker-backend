
import { PrismaClient } from "@prisma/client"
import UserModel from "../../models/userModel"
const prisma = new PrismaClient()
import { setUserJwt } from "../../lib/cookies"


export const createUser = async (req: any, res: any) => {
  try {
    const {username, password, email} = req.body
    const user = new UserModel(username, password, email)
    await user.validate()
    const usernameExists = await prisma.user.findMany({
      where: {
        username: user.username
      }
    })
    if (usernameExists.length !== 0) {
      throw new Error("Username already taken")
    }
    const emailExists = await prisma.user.findMany({
      where: {
        email: user.email
      }
    })
    if (emailExists.length !== 0) {
      throw new Error("Email already taken")
    }
    const prismaUser = await prisma.user.create({ 
      data: {
          username: user.username,
          password: user.password,
          email: user.email
      }})
    setUserJwt(res, prismaUser.id)
    res.status(201).json({"message": `User created`})
  } catch (err) {
    let result = (err as Error).message
    res.status(400).json({"error": result})
  } finally {
    await prisma.$disconnect()
  }
}

