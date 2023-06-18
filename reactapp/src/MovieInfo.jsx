import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


function MovieInfo (){
    let data = useLocation() //Gets Pathname of URL
    let pathname = data.pathname;
    const [movie, setMovie] = useState({}) 
    const [genre, setGenre] = useState({})

    useEffect(() => {
        fetch(`/api${pathname}`).then(
            response => response.json()
        ).then(
            data => {
                console.log(data)
                setMovie(data[0]);
                setGenre(data[1])
            }
        )
    }, [])
    return(
        <>  
            <div className="moviecontainer">
                <h2> Movie info! </h2>
                <p> Name: {movie.name} </p>
                <p> Genre: {genre.name} </p>
                <p> Year: {movie.year} </p>
                <p> <Link to={'/'} className="link" style={{color: 'green', backgroundColor:'yellow', borderRadius: '9px', padding: '10px'}}> Back to Home </Link></p>
                <br />
            </div>
        </>
    )

}

export default MovieInfo;