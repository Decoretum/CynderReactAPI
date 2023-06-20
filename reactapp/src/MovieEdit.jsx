import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {useForm} from 'react-hook-form';
import {useQuery, useMutation} from '@tanstack/react-query'

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

    const {register, handleSubmit, reset} = useForm();
    const navigate = useNavigate()

    const movieQuery = useQuery({
        queryKey: ['moveidata'],
        queryFn: async () => {
            return fetch(`/api/movies/${pathname.replace('/edit','')}/edit`).then(
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
    
                    let defaultValues = {}
                    defaultValues.name = data[0].name
                    defaultValues.year = data[0].year
                    defaultValues.genre = data[1].genreID
                    reset({...defaultValues})

                    return data
        }
            )}
    } )

    if (movieQuery.isLoading){
        return <h1> Movie Data is Loading </h1>
    } if (movieQuery.isError){
        return (
        <>
            <h1> Error in loading movie data. </h1>
            <p style={{display: 'inline'}}> <Link to={`${pathname.replace('/edit','')}`} className="link" style={{color: 'green', backgroundColor:'yellow', borderRadius: '9px', padding: '10px', marginLeft: '3vw'}}> Back </Link></p>

        </>
        )
    }


    function submit(e){
        fetch(`/api/movies${pathname.replace('/edit','')}/edit`, {
            headers: {
                "Content-Type" : "application/json"
            },
            mode: "cors",
            method: 'PUT',
            body: JSON.stringify(e)
        }).then(
            response => response.json()
        ).then(
            data => {navigate(data)}
        )
    }

    return(
        <>  
            <form onSubmit={handleSubmit(submit)} >
                <div className="moviecontainer">
                    <div className="inputgroup" style={{backgroundColor: 'salmon', borderRadius: '9px', width: '50%'}}>
                    <h2> Edit the Movie </h2> <br/>
                    <p> Name: </p> <br />
                    <input className="" 
                    {...register('name')}
                    defaultValue={movieName}
                    style={{width: '40vw'}} /> <br/> <br/>
                    
                    <p> Year: </p> <br />
                    <input className=""  
                    {...register('year')}
                    defaultValue={year}
                    style={{width: '40vw'}} /> <br/><br/>

                    <p> Genre: </p> <br />
                    <select {...register('genre')} style={{padding: '5px', borderRadius: '9px'}}> 
                        <option selected value={genreID}> {genrename} </option>
                        {
                            genres.map((genre, key) => {
                                if (genre.name !== genrename){
                                    return <option type='text' value={genre.genreID}> {genre.name} </option>
                                }
                                
                            })
                        }
                    </select><br/> <br/><br/>
                    <input type="hidden" value={movie.movie_id} {...register('movie_id')} />
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