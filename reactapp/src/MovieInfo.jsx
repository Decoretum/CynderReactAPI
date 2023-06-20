import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";


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

    useEffect(() => {}, [])

    const movieQuery = useQuery({
        queryKey: ['moviedata'],
        queryFn: async () => {
            return fetch(`/api/movies/${pathname}`).then(
            response => response.json()
        ).then(
            data => {
                console.log(data)   
                setMovie(data[0]);
                setGenre(data[1])
                return data[0]
            }
        )
        }
    })

    let moviedata = movieQuery.data;

    if (movieQuery.isLoading){
        return <h1> Loading Movie Data! </h1>
    }

    if (movieQuery.isError){
        return (
            <>
                <h1> Cannot load Movie data! </h1>
                <p style={{display: 'inline'}}> <Link to={'/'} className="link" style={{color: 'green', backgroundColor:'yellow', borderRadius: '9px', padding: '10px'}}> Back to Home </Link></p>
            </>
            )
    }

    return(
        <>  
            <div className="moviecontainer">
                <h2> Movie info! </h2>
                <p> Name: {moviedata.name} </p>
                <p> Genre: {genre.name} </p>
                <p> Year: {moviedata.year} </p> <br /><br/>
                <p style={{display: 'inline'}}> <Link to={'/'} className="link" style={{color: 'green', backgroundColor:'yellow', borderRadius: '9px', padding: '10px'}}> Back to Home </Link></p>
                <p style={{display: 'inline', marginLeft: '2vw'}}> <Link to={`${pathname}/edit`} className="link" style={{color: 'green', backgroundColor:'yellow', borderRadius: '9px', padding: '10px'}}> Edit </Link></p>
                <p style={{display: 'inline', marginLeft: '2vw'}}> <Link onClick={del} className="link" style={{color: 'green', backgroundColor:'yellow', borderRadius: '9px', padding: '10px'}}> Delete </Link></p>
                <br /> <br />
            </div>
        </>
    )

}

export default MovieInfo;