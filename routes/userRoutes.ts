import express from 'express'

import { authUser } from '../middleware/authUser'

import { createUser } from '../controllers/user/createUser'
import { getUser } from '../controllers/user/getUser'
import { loginUser } from '../controllers/user/loginUser'

const router = express.Router()

router.post('/create', createUser)
router.post('/login', loginUser)

router.get('/get', authUser, getUser)

module.exports = router