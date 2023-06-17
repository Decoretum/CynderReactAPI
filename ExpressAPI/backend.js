const sqlite3 = require('sqlite3').verbose() //long stack traces
let db = new sqlite3.Database('./memory.db', (err) => {
    if (err){
        return console.error(err);
    } else {
        console.log(`Connected to SQLITE3 Database!`)
    }
})

//db.close() //when ur done with this

//Fetch all movie Data
const movies = (req, res, next) => {
    db.serialize(()=>{
        let query = `SELECT * FROM Movie`
        db.all(query, [], (err, rows) => {
            if (err) throw err;
            else {
                let arr = []
                rows.forEach((row) => {
                    arr.push(row)
                })
                res.json(arr)
            }
        })
    })
}




//movie data
const moviedata = (req, res, next) => {
    console.log(req.params)
    
}

//create a movie
const createmovie = (req, res, next) => {
    let name = req.body.name
    let genre = req.body.genre
    let year = req.body.year
    if (isNaN(Number(year)) === true || Number(year) < 0 || name === '' || year === '' || genre === ''){
        console.log(`Cannot be less than 0 or not a year!`)
        res.redirect('/movie/new');
    } else {
        console.log(req.body)
        let value = [name, genre, Number(year)];
        let query = `INSERT INTO Movie(name, genre, year) VALUES(?, ?, ?)`
    
        db.run(query, value, (err)=>{
            if (err){
                return console.log(err);
            } else {
                console.log(`Movie added into database!`)
                res.redirect('/')
                next()
            }
        })
      
        
    }
    
}

module.exports.functions = [moviedata, createmovie, movies]