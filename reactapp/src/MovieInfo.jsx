import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


function MovieInfo ({movie}){
    let data = useLocation()
    const [url, setUrl] = useState('')  
    const [cond, setCond] = useState('')  
    console.log(data)

    useEffect(() => {
        fetch(`/api/movies/:${data.state.name}`).then(response => response.json()
        ).then(data => {setUrl(data.url)
            console.log(data)})
    }, [])
    return(
        <>  
            <div className="moviecontainer">
                <h2> Title: {data.state.name} </h2>
                <p> React API URL: /api/movie/{`${data.state.id}`}</p>
                <p> Year: {data.state.year} </p>
                <p> Genre: {data.state.type}</p> <br/><br/><br/>
                <Link className='link' style={{color: 'green'}} to='/'> Back to Home </Link>
            </div>
        </>
    )

}

export default MovieInfo;