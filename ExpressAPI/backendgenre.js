const sqlite3 = require('sqlite3').verbose() //long stack traces
let {db} = require('./backend')

db = db[0]

//Get All Genres
const getAll = (req, res, next) => {
    let query = `SELECT * FROM Genre`
    db.all(query, (err, rows) => {
        if (err) return console.error(err);
        else{
            console.log(rows)
            res.json(rows)
            
    
        }
    })
}

//Get Specific Genre
const getGenre = (req, res, next) => {
    let id = Number(req.params.id);
    let query = `SELECT * FROM Genre WHERE genreID = ?`
    db.get(query, [id], (err, rows)=>{
        if (err) console.error(err);
        else{
            res.json(rows)
            next()
        }
    })
}

//make Genre
const makeGenre = (req, res, next) => {
    //from parameters
    let name = req.body.genrename

    if (name === ''){
        return res.redirect('/NewGenre')
    }

    let query = `INSERT INTO Genre (name)
    VALUES
    (?)
    `
    db.run(query, [name], (err, rows) => {
        if (err) return console.error(err);
        else{
            res.json(`/`)
        }
    })
}

//edit Genre
const editGenre = (req, res, next) => {
    let name = req.body.name;
    let id = req.body.genreID;
    let query = `
    UPDATE Genre 
    SET name = ?
    WHERE genreID = ?
    `
    db.run(query, [name, id], (err, rows) => {
        if (err) return console.error(err);
        else{
            res.json('/');
        }
    })
}

const deleteGenre = (req, res, next) => {
    let id = Number(req.params.id);
    console.log(id)
    let query = `
    DELETE FROM Genre
    WHERE 
    genreID = ?
    `
    db.run(query, [id], (err, rows) => {
        if (err) return console.error(err);
        else{
            res.json('/')
        }
    })
}

module.exports.functions = [getAll, getGenre, makeGenre, editGenre, deleteGenre]