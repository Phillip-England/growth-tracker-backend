const jwt = require('jsonwebtoken')

export const setUserJwt = (res: any, userId: number) => {
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

export const setUserRefresh = (res: any, userId: number) => {
  let token = jwt.sign({
    "data": userId,
    "exp": Math.floor(Date.now() / 1000) + (60 * 60)
  }, process.env.REFRESH_SECRET)
  res.cookie("refresh", token, {
    maxAge: 1000*60*45,
    httpOnly: true,
    signed: true,
  })
}

