

export const getUser = async (req: any, res: any) => {

  try {

    res.json({"message": req.params.id})
    
  } catch {

  }
}