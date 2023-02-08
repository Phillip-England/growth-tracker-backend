export const createLocation = (req: any, res: any) => {
  const { name, number, email } = req.body
  console.log(name, number, email)
  res.send("")
}
