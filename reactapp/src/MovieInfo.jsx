import { Link, Navigate, useLocation, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


function MovieInfo (){
    let data = useLocation() //Gets Pathname of URL
    let pathname = data.pathname;
    const [movie, setMovie] = useState({}) 
    const [genre, setGenre] = useState({})

    const navigate = useNavigate()
    async function del(){
        fetch(`/api/movies/${pathname}`, {method: 'DELETE'}).then(()=>{
            navigate('/')
        })
    }

    useEffect(() => {
        fetch(`/api/movies/${pathname}`).then(
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
                <p> Year: {movie.year} </p> <br /><br/>
                <p style={{display: 'inline'}}> <Link to={'/'} className="link" style={{color: 'green', backgroundColor:'yellow', borderRadius: '9px', padding: '10px'}}> Back to Home </Link></p>
                <p style={{display: 'inline', marginLeft: '2vw'}}> <Link to={`${pathname}/edit`} className="link" style={{color: 'green', backgroundColor:'yellow', borderRadius: '9px', padding: '10px'}}> Edit </Link></p>
                <p style={{display: 'inline', marginLeft: '2vw'}}> <Link onClick={del} className="link" style={{color: 'green', backgroundColor:'yellow', borderRadius: '9px', padding: '10px'}}> Delete </Link></p>
                <br /> <br />
            </div>
        </>
    )

}

export default MovieInfo;