const moviedata = (req, res, next) => {
    const key = 'ace5116';
    const API_URL = 'http://www.omdbapi.com?apikey=' + key;
    const search = req.params.name.replace(':',"");

    try{
        //asynchronous
        fetch(`${API_URL}&s=${search}`).then(
            response => response.json()
        ).then(
            data => {
                res.json({url:API_URL+'&s='+search, params:req.params, data:data})
            }
        )          
    } catch {
        res.json({error: 'Something is wrong'})
    }
    
}

const createmovie = (req, res, next) => {
    console.log(req.params)
    res.redirect('/')
    next()
}

module.exports.functions = [moviedata, createmovie]