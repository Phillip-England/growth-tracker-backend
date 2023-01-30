import express from 'express'
import path from 'path'
const dotenv: any = require('dotenv').config()
const cookieParser: any = require('cookie-parser')
const cors: any = require("cors")
const PORT = process.env.PORT || 5000


const app: any = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use('/user', require('./routes/userRoutes'))

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})


