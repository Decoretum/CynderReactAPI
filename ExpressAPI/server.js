const express = require('express')
const app = express()

const homeRouter = require('../ExpressAPI/routes/home')
const movieRouter = require('../ExpressAPI/routes/moviedata')


app.use('/api', homeRouter)
app.use('/api/movie/:name', movieRouter)

app.listen(5000, ()=>{
    console.log(`Application listening at Port 5000`)
})

//Express's connection to React
//1. Set up Proxy URL in package.json to let webpack proxy API requests to Express Backend Server

