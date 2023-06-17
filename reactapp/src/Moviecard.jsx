import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes
  } from "react-router-dom";


function Moviecard({movie}){

    return (
        <>
            <div className='movie'> 
                <div>
                    <p> {movie.year} </p>
                </div>

                <div>   
                    <img src={require('./cutie.png')} alt={'No Image Found'}
                    //onError={errorimage}
                    //Had trouble setting the default pic to 400 error pic
                    />
                </div>

                <div>
                    <span>{movie.genre}</span>
                            <h3>
                                <Link className="link" to={'/movies/' + movie.movie_id} state={{name: movie.name, year: movie.year, type: movie.genre, id:movie.movie_id}}> 
                                    {movie.name} 
                                </Link>
                            </h3>

                </div>
            </div>
        </>


    )
}

export default Moviecard;