
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
const bcryptjs = require('bcryptjs')
import { setUserJwt } from '../../lib/cookies'

export const loginUser = async (req: any, res: any) => {
  try {
    const {email, password} = req.body
    const prismaUser = await prisma.user.findFirst({
      where: {
        email: email
      }
    })
    if (!prismaUser) {
      throw new Error("Invalid credentials")
    }
    const validPassword = await bcryptjs.compare(password, prismaUser.password)
    if (!validPassword) {
      throw new Error("Invalid credentials")
    }
    setUserJwt(res, prismaUser.id)
    res.status(200).json({"message": `Logged in`})
  } catch (err) {
    let result = (err as Error).message
    res.status(400).json({"error": result})
  } finally {
    await prisma.$disconnect()
  }

}