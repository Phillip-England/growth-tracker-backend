import express from "express"

import { authUser } from "../middleware/authUser"
import { createLocation } from "../controllers/location/createLocation"

const router = express.Router()

router.post("/create", createLocation)

module.exports = router
