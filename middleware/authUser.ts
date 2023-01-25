const jwt = require('jsonwebtoken')

export const authUser = (req: any, res: any, next: any) => {
  try {
    let userId = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
    console.log(userId.data)
    next()
  } catch (err) {
    res.status(401).json({"message": "Unauthorized"})
  }
}