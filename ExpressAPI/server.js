const express = require('express')
const app = express()

const homeRouter = require('../ExpressAPI/routes/home')
const movieRouter = require('./routes/movie')
const genreRouter = require('./routes/genres')
const queryRouter = require('../ExpressAPI/routes/queried')

//FOR MOVIES
app.use(express.urlencoded({extended: true})) //USE THIS TO FETCH URL DATA
app.use('/api/genres', genreRouter)
app.use('/api/movies', movieRouter)
app.use('/api/queried', queryRouter)
app.use('/api', homeRouter)

//FOR GENRES


app.listen(5000, ()=>{
    console.log(`Application listening at Port 5000`)
})

//Express's connection to React
//1. Set up Proxy URL in package.json to let webpack proxy API requests to Express Backend Server

