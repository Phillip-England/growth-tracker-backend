
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
const bcryptjs = require('bcryptjs')


export const loginUser = async (req: any, res: any) => {
  try {
  
    const {username, password} = req.body

    const userExists = await prisma.user.findFirst({
      where: {
        username: username
      }
    })
    if (!userExists) {
      throw new Error("Invalid credentials")
    }

    console.log(userExists)

    res.json({"message": "hit"})

  } catch (err) {

    let result = (err as Error).message
    res.status(400).json({"error": result})

  } finally {

    await prisma.$disconnect()

  }

}