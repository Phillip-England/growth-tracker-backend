const jwt = require('jsonwebtoken')

export const setUserCookies = (res: any, userId: number) => {
  let token = jwt.sign({
    "data": userId,
    "exp": Math.floor(Date.now() / 1000) + (60 * 60)
  }, process.env.JWT_SECRET)
  res.cookie("token", token, {
    maxAge: 1000*60*30,
    httpOnly: true,
    signed: true,
  })
}