const express = require('express')
const dotenv = require('dotenv').config()
const path = require('path')
const cookieParser = require('cookie-parser') //enabling us to use cookies for jwt tokens
const PORT = process.env.PORT || 5000


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser(process.env.COOKIE_SECRET)) //setting up and giving our cookie parser a secret

app.use('/home', require('./routes/homeRoutes'))
app.use('/user', require('./routes/userRoutes'))

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})


