const sqlite3 = require('sqlite3')

let db = new sqlite3.Database('./memory.db', (err) => {
    if (err) return console.error(err);
    else {console.log(`Database created and opened!`)}
})


 
  

    db.exec(`
    CREATE TABLE Genre(
        genreID INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50) NOT NULL
        )
    `)

    db.exec(`
    CREATE TABLE Movie(
        movie_id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name VARCHAR(50) NOT NULL, 
        genre INTEGER,
        year INTEGER NOT NULL,
        FOREIGN KEY(genre) REFERENCES Genre(genreID)
        )
    `)

    db.run(`INSERT INTO Genre(name)
    VALUES
    ('Horror'),
    ('Fantasy'),
    ('Biographical Drama')`
    ).each(`SELECT * FROM Genre`, (err, row) => {console.log(row)})

    db.run(`INSERT INTO Movie (name, genre, year)
          VALUES
          ('The Intern', 2, 2015),
          ('Silicon Valley', 3, 2014),
          ('The Social Network', 3, 2010)
          `)
    .each(`SELECT * FROM Movie`, (err, row) => {
        console.log(row)
    }) 





db.close()