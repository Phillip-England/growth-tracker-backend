
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

export const loginUser = async (req: any, res: any) => {
  try {
    const {username, password} = req.body
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
    let token = jwt.sign({
      "data": prismaUser.id,
      "exp": Math.floor(Date.now() / 1000) + (60 * 60)
    }, process.env.JWT_SECRET)
    res.cookie("token", token, {
      maxAge: 1000*60*30,
      httpOnly: true,
      signed: true,
    })
    res.status(200).json({"message": "success"})
  } catch (err) {
    let result = (err as Error).message
    res.status(400).json({"error": result})
  } finally {
    await prisma.$disconnect()
  }

}