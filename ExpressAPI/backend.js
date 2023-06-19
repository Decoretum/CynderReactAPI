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
    const movies = []
    const genres = []
    db.serialize(()=>{
        let query = `SELECT movie_id, Movie.name AS MovieName, Movie.year, Genre.name AS GenreName FROM Movie LEFT JOIN Genre ON Movie.genre = Genre.genreID`
        let gquery = `SELECT * FROM Genre`
        db.all(query, [], (err, rows) => {
            if (err) throw err;
            else {
                rows.forEach((row) => {
                    movies.push(row)
                })
                
            }
        })
        .all(gquery, [],(err, rows) => {
            rows.forEach((row) => {
                genres.push(row)
            })
            res.json([movies, genres])
        })
        
    })
}

//query Movie and Genre
const queriedmovie = (req, res, next) => {
    let term = req.query.term;
    let genre = req.query.genre;
    console.log(term)
    console.log(genre)
    res.json({term, genre});
}


//movie data
const moviedata = (req, res, next) => {
    let number = req.params.id;
    console.log(number)
    let query = `SELECT * FROM Movie WHERE movie_id = ?`
    let value = number
    db.serialize(()=> {
        db.get(query, [value], (err, rows) => {
            if (err) return console.error(err)
            else{
                console.log(rows)
                let movie = rows
                let gquery = `SELECT * FROM Genre WHERE genreID = ?`
                let gvalue = Number(movie.genre)
                db.get(gquery, [gvalue], (err, rows) => {
                    if (err) return console.error(err)
                    else{
                        console.log(rows)
                        let genre = rows
                        res.json([movie, genre])
                    }
                })
            }
        })
    })
    
    
}

//Edit a Movie, GET Request
const editmoviedata = (req, res, next) => {
    let number = req.params.id;
    let query = `SELECT * FROM Movie WHERE movie_id = ${number}`
    db.all(query, [], (err, rows) => {
        if (err) return console.error(err)
        else{
            let movie = rows[0]
            let gquery = `SELECT * FROM Genre WHERE genreID = ${Number(movie.genre)}`
            db.all(gquery, [], (err, rows) => {
                if (err) return console.error(err)
                else{
                    let genre = rows[0]
                    let genrequery = `SELECT * FROM Genre`
                    db.all(genrequery, [],(err,rows)=>{
                        if(err) return console.error(err);
                        else{
                            res.json([movie, genre, rows])
                        }
                    })
                   
                }
            })
        }
    })
}

//Edits a movie object, POST request
const editmovieExecute = (req, res, next) => {
    console.log(req.body)

    let name = req.body.name;
    let year = req.body.year;
    let genre = Number(req.body.genre);
    let movie_id = Number(req.body.movie_id)

    if (req.body.genre === ''){
        return res.redirect(`/${movie_id}/edit`)
    }

    //Database Computation
    db.serialize(() => {
        let query = 
        `UPDATE Movie
        SET 
        name = ?,
        year = ?,
        genre = ?
        WHERE movie_id = ?
             `
        let values = [name, year, genre, movie_id]
        db.run(query, values, (err,rows)=>{
            if (err) return console.error(err);
            else{
                res.redirect(`/${movie_id}`)
            }
        })
    })
}

//deletes a movie, GET REQUEST
const deletemovie = (req, res, next) => {
    console.log('Deleting Movie with ID' + req.params.id)
    let query = `
    DELETE FROM 
    Movie
    WHERE movie_id = ?
    `
    let value = [Number(req.params.id)];
    db.run(query, value, (err, rows) => {
        if (err) return console.error(err)
        else{
            res.redirect(`/`)
        }
    })
}

//get all Genres for movie creation
const genres = (req, res, next) => {
    let query = `SELECT * FROM Genre`
    db.all(query, [], (err, rows) => {
        if (err) return console.error(err)
        else{
            res.json(rows)
        }
    })
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
        let value = [name, Number(genre), Number(year)];
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


module.exports.functions = [moviedata, createmovie, movies, genres, queriedmovie, editmoviedata, editmovieExecute, deletemovie]
module.exports.db = [db]