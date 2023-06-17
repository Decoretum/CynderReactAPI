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
    let name = req.body.name
    let genre = req.body.genre
    let year = req.body.year
    if (isNaN(Number(year)) === true || Number(year) < 0 || name === '' || year === '' || genre === ''){
        console.log(`Cannot be less than 0 or not a year!`)
        res.redirect('/movie/new');
    } else {
        console.log(req.body)
        res.redirect('/')
    }
    next()
}

module.exports.functions = [moviedata, createmovie]