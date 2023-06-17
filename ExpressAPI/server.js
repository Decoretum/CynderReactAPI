const express = require('express')
const app = express()

const homeRouter = require('../ExpressAPI/routes/home')
const movieRouter = require('./routes/movie')

app.use(express.urlencoded({extended: true}))
app.use('/api/movie', movieRouter)
app.use('/api', homeRouter)

app.listen(5000, ()=>{
    console.log(`Application listening at Port 5000`)
})

//Express's connection to React
//1. Set up Proxy URL in package.json to let webpack proxy API requests to Express Backend Server

