const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

//Middleware
app.use(cors())
app.use(express.json())
require('dotenv').config()

//Port assign
app.listen(process.env.PORT, () => {
    console.log("Server started")
})

//MongoDB connection string
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('DB connected!')
    })
    .catch((err) => {
        console.log('DB not connected ', err)
    })

app.use("/", (req,res) => {
    if (mongoose.connection.readyState === 1) {
        res.send(`<h1>Server is Running</h1> <h1 style="color:green">Database connnected successfully!!</h1>`)
    } else {
        res.send(`<h1>Server is Running</h1> <h1 style="color:red;">Database not connnected! Check connection string</h1>`)
    }
})

const registerRoute = require('./router/registerRouter')
app.use('/', registerRoute)

const loginRoute = require('./router/loginRouter')
app.use('/',loginRoute)