
const UserModel = require('../models/userModel')


const createUser = async (req, res) => {
  try {
    const {username, password, email} = req.body
    const user = new UserModel(username, password, email)
    await user.validate()
    res.status(200).json({
      "username": user.username,
      "password": user.password,
      "email": user.email
    })
  } catch (err) {
    res.status(400).json({"message": err.message})
  }
}

module.exports = {
  createUser
}