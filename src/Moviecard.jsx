import { SyntheticEvent } from "react";
import err from './err.png'

const errorimage = (event) => {
    event.target.src = 'err.png';
     
}

function Moviecard({movie}){

    return (
        <>
            <div className='movie'> 
                <div>
                    <p> {movie.Year} </p>
                </div>

                <div>
                    <img src={movie.Poster !== '' || movie.Poster !== 'N/A' ? movie.Poster : err} alt={'err.png'}
                    //onError={errorimage}
                    //Had trouble setting the default pic to 400 error pic
                    />
                </div>

                <div>
                    <span>{movie.Type}</span>
                    <h3>{movie.Title}</h3>
                </div>
            </div>
        </>
    )
}

export default Moviecard;