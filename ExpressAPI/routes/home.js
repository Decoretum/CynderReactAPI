const home = (req, res, next) =>{
    
    res.json({"users": ['Gael','Iris','Jan','Sam']})
}

module.exports = home