const sqlite3 = require('sqlite3').verbose() //long stack traces
let db = new sqlite3.Database('./memory.db', (err) => {
    if (err){
        return console.error(err);
    } else {
        console.log(`Connected to SQLITE3 Database!`)
    }
})

db.exec(`DELETE FROM Movie`);