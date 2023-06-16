import { Link, useLocation } from "react-router-dom";

function MovieInfo ({movie}){
    let data = useLocation()
    console.log(data.state)
    return(
        <>
            <h1> {data.state.name} </h1>
            <p> {data.state.year} </p>
            <p> {data.state.type}</p> <br/><br/><br/>
            <Link to='/'> Back to Home </Link>
        </>
    )

}

export default MovieInfo;