const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
require('colors')
const route = require('./Routes/routes')
const cors = require('cors')
// const bodyParser = require('body-parser');

app.use(cors())
app.use(express.json())
// app.use(bodyParser.json())
app.use('/api', route)

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to DB".cyan.bold)
    app.listen(process.env.PORT || 3000, () => { console.log("Server Runnning on 5000".yellow.bold) })
}).catch((err) => {
    console.log("Error connecting to DB : ".red.bold, err.message)
})
