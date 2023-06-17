const sqlite3 = require('sqlite3')

let db = new sqlite3.Database('./memory.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
    else {console.log(`Database opened!`)}
})

db.serialize(()=>{
    let query = `SELECT * FROM Movie`
    db.all(query, [], (err, rows) => {
        if (err) throw err;
        else {
            let arr = []
            rows.forEach((row) => {
                arr.push(row)
            })
            console.log(arr)
        }
    })
})

db.close()