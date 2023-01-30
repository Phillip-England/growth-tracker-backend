import express from 'express'

import { authUser } from '../middleware/authUser'

import { createUser } from '../controllers/user/createUser'
import { getUser } from '../controllers/user/getUser'
import { loginUser } from '../controllers/user/loginUser'
import { logoutUser } from '../controllers/user/logoutUser'


const router = express.Router()

router.post('/create', createUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/get', authUser, getUser)

module.exports = router