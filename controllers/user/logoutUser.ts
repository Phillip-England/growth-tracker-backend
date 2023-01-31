


export const logoutUser = (req: any, res: any) => {
  try {
    if (req.signedCookies['token']) {
      res.clearCookie('token')
    }
    if (req.signedCookies['refresh']) {
      res.clearCookie('refresh')
    }
    res.status(200).json({'message': 'Logged out'})
  } catch {
    res.status(500).json({'message': 'Internal server error'})
  }
}