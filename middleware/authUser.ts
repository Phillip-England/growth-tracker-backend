const jwt = require('jsonwebtoken')
import { PrismaClient } from "@prisma/client"
import { setUserJwt, setUserRefresh } from "../lib/cookies"
const prisma = new PrismaClient()

export const authUser = async (req: any, res: any, next: any) => {
  try {

    if (req.signedCookies.token && !req.signedCookies.refresh) {
      const userId = jwt.verify(req.signedCookies.token, process.env.JWT_SECRET)
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
      if (prismaUser) {
        setUserRefresh(res, prismaUser.id)
        req.user = prismaUser
      } else {
        res.status(500).json({'message': 'Db access failed'})
      }
    }

    if (!req.signedCookies.token && req.signedCookies.refresh) {
      const userId = jwt.verify(req.signedCookies.refresh, process.env.REFRESH_SECRET)
      res.clearCookie("refresh")
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
      if (prismaUser) {
        setUserJwt(res, prismaUser.id)
        setUserRefresh(res, prismaUser.id)
        req.user = prismaUser
      } else {
        res.status(500).json({'message': 'Db access failed'})
      }
    }

    if (req.signedCookies.token && req.signedCookies.refresh) {
      const userId = jwt.verify(req.signedCookies.token, process.env.JWT_SECRET)
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
      if (prismaUser) {
        req.user = prismaUser
      }
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