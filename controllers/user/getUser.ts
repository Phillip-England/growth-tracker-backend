

export const getUser = async (req: any, res: any) => {
  try {
    res.status(200).json({"message": `${JSON.stringify(req.user)}`})
  } catch {
    res.status(500).json({'message': "Internal server error"})
  }
}