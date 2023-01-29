
import { PrismaClient } from "@prisma/client"
import { setUserCookies } from "../../lib/cookies"
const prisma = new PrismaClient()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

export const loginUser = async (req: any, res: any) => {
  try {
    const {username, password} = req.body
    console.log(username, password)
    const prismaUser = await prisma.user.findFirst({
      where: {
        username: username
      }
    })
    if (!prismaUser) {
      throw new Error("Invalid credentials")
    }
    const validPassword = await bcryptjs.compare(password, prismaUser.password)
    if (!validPassword) {
      throw new Error("Invalid credentials")
    }
    setUserCookies(res, prismaUser.id)
    res.status(200).json({"message": "success"})
  } catch (err) {
    let result = (err as Error).message
    res.status(400).json({"error": result})
  } finally {
    await prisma.$disconnect()
  }

}