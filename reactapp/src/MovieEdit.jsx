import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


function MovieEdit (){
    let data = useLocation() //Gets Pathname of URL
    let pathname = data.pathname;
    const [movie, setMovie] = useState({}) 
    const [genres, setGenres] = useState([])

    const [genre, setGenre] = useState('')
    const [genrename, setGenreName] = useState('')
    const [genreID, setGenreID] = useState(0)
    const [year, setYear] = useState(0)
    const[movieName, setMovieName] = useState('')


    useEffect(() => {
        fetch(`/api/movies/${pathname.replace('/edit','')}/edit`).then(
            response => response.json()
        ).then(
            data => {
                console.log(data)

                //Setting states
                setMovie(data[0])
                setGenres(data[2])

                setMovieName(data[0].name)
                setYear(data[0].year)

                setGenre(data[1].genre)
                setGenreName(data[1].name)
                setGenreID(data[1].genreID)
            }
        )
    }, [])
    return(
        <>  
            <form method='POST' action={`/api/movies${pathname.replace('/edit','')}/edit`}>
                <div className="moviecontainer">
                    <div className="inputgroup" style={{backgroundColor: 'salmon', borderRadius: '9px', width: '50%'}}>
                    <h2> Edit the Movie </h2> <br/>
                    <p> Name: </p> <br />
                    <input className="" 
                    value={movieName} 
                    name="name" id="name" 
                    onChange={(e) => setMovieName(e.target.value)}     
                    style={{width: '40vw'}} /> <br/> <br/>
                    
                    <p> Year: </p> <br />
                    <input className="" 
                    value={year} 
                    name='year' id="year" 
                    onChange={(e) => setYear(e.target.value)} 
                    style={{width: '40vw'}} /> <br/><br/>

                    <p> Genre: </p> <br />
                    <select name='genre' id='genre' onChange={(e) => {setGenre(e.target.value)}} style={{padding: '5px', borderRadius: '9px'}}> 
                        <option selected value={genreID}> {genrename} </option>
                        {
                            genres.map((genre, key) => {
                                if (genre.name !== genrename){
                                    return <option type='text' value={genre.genreID}> {genre.name} </option>
                                }
                                
                            })
                        }
                    </select><br/> <br/><br/>
                    <input type="hidden" name='movie_id' value={movie.movie_id} />
                    <button type="submit" style={{backgroundColor: 'yellow', color: 'green', display: 'inline'}}> Edit Movie </button> 

                
                    <p style={{display: 'inline'}}> <Link to={`${pathname.replace('/edit','')}`} className="link" style={{color: 'green', backgroundColor:'yellow', borderRadius: '9px', padding: '10px', marginLeft: '3vw'}}> Back </Link></p>
                    <br/>
                    </div>
                </div>
            </form>

        </>
    )

}
export default MovieEdit;