


export const logoutUser = (req: any, res: any) => {
  try {
    if (req.signedCookies['token']) {
      console.log('hit')
    }
  } catch {

  }
}