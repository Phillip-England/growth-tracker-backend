const jwt = require('jsonwebtoken')
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const authUser = async (req: any, res: any, next: any) => {
  try {

    if (req.signedCookies.token && !req.signedCookies.refresh) {
      const userId = jwt.verify(req.signedCookies.token, process.env.JWT_SECRET)
      res.cookie("refresh", req.signedCookies.token, {
        maxAge: 1000*60*45,
        httpOnly: true,
        signed: true,
      })
      const prismaUser = await prisma.user.findUnique({
        where: { 
          id: userId.data 
        },
        select: { 
          password: false,
          id: true,
          username: true,
          email: true 
        }
      })
      req.user = prismaUser
    }

    if (!req.signedCookies.token && req.signedCookies.refresh) {
      const userId = jwt.verify(req.signedCookies.refresh, process.env.JWT_SECRET)
      res.cookie("token", req.signedCookies.refresh, {
        maxAge: 1000*60*30,
        httpOnly: true,
        signed: true,
      })
      res.clearCookie("refresh")
      res.cookie("refresh", req.signedCookies.token, {
        maxAge: 1000*60*45,
        httpOnly: true,
        signed: true,
      })
      const prismaUser = await prisma.user.findUnique({
        where: { 
          id: userId.data 
        },
        select: { 
          password: false,
          id: true,
          username: true,
          email: true 
        }
      })
      req.user = prismaUser
    }

    if (!req.signedCookies.token && !req.signedCookies.refresh) {
      throw new Error("Unauthorized")
    }

    next()
  } catch (err) {
    let result = (err as Error).message
    res.status(401).json({"message": result})
  }
}