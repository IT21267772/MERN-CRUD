const express = require('express')
const productRoutes = require('./routes/productRoutes')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')

const port = process.env.PORT || 4005

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/products', productRoutes)


const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch(err){
        console.log(err)
    }
}

connectDB()

app.listen(port, () => console.log(`Server Started on port ${port}`))