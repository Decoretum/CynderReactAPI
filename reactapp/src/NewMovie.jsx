import React  from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

import './App.css'


function NewMovie({props}){
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [genres, setGenres] = useState([]);

    const {register, handleSubmit} = useForm();
    const navigate = useNavigate()

    useEffect(() => {
       fetch(`/api/movies/new`).then(
        repsonse => repsonse.json()
       ).then(
        data => {setGenres(data)}
       )
    },[])

    function submit(e){
        //action = '/api/movies/new' method='POST'
        let name = e.name;
        let genre = e.genre;
        let year = e.year;


        fetch(`/api/movies/new`, {
            headers: {
                'Content-Type' : 'application/json',
                //'Accept' : 'application/json',
            },
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(e)
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            navigate(data)})

    }


    function getName(e){
        setName(e.target.value);
    }

    function getYear(e){
        setYear(e.target.value);
    }

    function getGenre(e){
        console.log(e.target.value)
        setGenre(e.target.value);
    }

    return(
            <>
            <h2 style={{margin: '20px'}}> <Link to={'/'} className='link'> Back to Home </Link> </h2>
            <form style={{margin: 'auto', marginTop: '5vh', width: '25%', }} onSubmit={handleSubmit(submit)}>
            <h2 className='header' style={{color: 'white'}}> Create a Movie! </h2>
                <div className='inputgroup'>
                    <span style={{color:'white'}}>Movie Name</span> <br/><br/>
                    <input {...register('name')} type='text' placeholder='Movie Name' onChange={getName}/><br/><br/><br/>

                    <span style={{color:'white'}}>Movie Genre</span> <br /><br />
                    <select {...register('genre')} onChange={getGenre} style={{padding: '5px', borderRadius: '9px'}}> 
                        <option value=""> Choose a Genre </option>
                        {
                            genres.map((genre, key) => {
                                return <option type='text' value={genre.genreID}> {genre.name} </option>
                            })
                        }
                    </select><br /> <br />

                    <span style={{color:'white'}}>Year</span> <br /><br />
                    <input {...register('year')} type='text' placeholder='Year' onChange={getYear} /><br/><br/><br/>    

                    <button type='submit'> Create Movie </button> 
                </div>
            </form>
            </>

    )
}

export default NewMovie;