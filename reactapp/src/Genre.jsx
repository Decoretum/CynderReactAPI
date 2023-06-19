import React  from 'react';
import { useState, useEffect } from 'react';
import './App.css'
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form'


import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes
  } from "react-router-dom";

function Genre(){
    useEffect(() => {

    })

    const [genre, setGenre] = useState('')
    const [genredel, setGenreDel] = useState('')

    const {register, handleSubmit} = useForm();
    const navigate = useNavigate()

    function del(e){
        fetch(`/api/genres/${genredel}`, {method: 'DELETE'})
        .then(
            navigate('/')
        )
        
    }

    return (
        <>
            <h2 style={{margin: '20px'}}> <Link to={'/'} className='link'> Back to Home </Link> </h2>
            <form method='POST' action='/api/genres' style={{margin: 'auto', marginTop: '5vh', width: '25%'}}>
                <div className='inputgroup'>
                    <h2 style={{color: 'white'}}> Genre Name </h2><br/>
                    <input name='name' id='name' type='text' placeholder='Genre Name' onChange={(e) => setGenre(e.target.value)}/><br/><br/><br/>
                    <button type='submit'> Create Genre </button>

                </div>

            </form>

            <form method='DELETE' onSubmit={handleSubmit(del)} style={{margin: 'auto', marginTop: '5vh', width: '25%'}}>
                <div className='inputgroup'>
                    <h2 style={{color: 'white'}}> Genre ID to Delete </h2><br/>
                    <input {...register('genreID')} name='genreID' id='genreID' type='text' placeholder='Genre ID' onChange={(e) => setGenreDel(e.target.value)}/><br/><br/><br/>
                    <button type='submit'> Delete Genre </button>

                </div>

            </form> 
        </>
    )
}

export default Genre;