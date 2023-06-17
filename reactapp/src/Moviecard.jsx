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
                    <p> {movie.Year} </p>
                </div>

                <div>
                    <img src={movie.Poster !== '' || movie.Poster !== 'N/A' ? movie.Poster : 'err.png'} alt={'No Image Found'}
                    //onError={errorimage}
                    //Had trouble setting the default pic to 400 error pic
                    />
                </div>

                <div>
                    <span>{movie.Type}</span>
                            <h3>
                                <Link className="link" to={'/movie/' + movie.Title} state={{name: movie.Title, year: movie.Year, type: movie.Type}}> 
                                    {movie.Title} 
                                </Link>
                            </h3>

                </div>
            </div>
        </>


    )
}

export default Moviecard;