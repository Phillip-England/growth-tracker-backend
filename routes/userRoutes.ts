import express from 'express'

import { authUser } from '../middleware/authUser'

import { createUser } from '../controllers/user/createUser'
import { getUser } from '../controllers/user/getUser'
import { loginUser } from '../controllers/user/loginUser'

const router = express.Router()

router.post('/', createUser)
router.post('/login', loginUser)

router.get('/:id', authUser, getUser)

module.exports = router