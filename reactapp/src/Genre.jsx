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
        fetch(`/api/genres/${e.genreID}`, {method: 'DELETE'})
        .then(
            navigate('/')
        )
    }

    function create(e){
        //method='POST' action='/api/genres'
        let genrename = e.genrename;
        fetch(`/api/genres`, {
            headers: {
                "Content-Type" : "application/json"
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({genrename: genrename})
        }).then(
            response => response.json()
        ).then(
            data => {navigate(data)}
        )
    }

    return (
        <>
            <h2 style={{margin: '20px'}}> <Link to={'/'} className='link'> Back to Home </Link> </h2>
            <form onSubmit={handleSubmit(create)}  style={{margin: 'auto', marginTop: '5vh', width: '25%'}}>
                <div className='inputgroup'>
                    <h2 style={{color: 'white'}}> Genre Name </h2><br/>
                    <input type='text' placeholder='Genre Name' {...register('genrename')}/><br/><br/><br/>
                    <button type='submit'> Create Genre </button>

                </div>

            </form>

            <form onSubmit={handleSubmit(del)} style={{margin: 'auto', marginTop: '5vh', width: '25%'}}>
                <div className='inputgroup'>
                    <h2 style={{color: 'white'}}> Genre ID to Delete </h2><br/>
                    <input {...register('genreID')} type='text' placeholder='Genre ID'/><br/><br/><br/>
                    <button type='submit'> Delete Genre </button>

                </div>

            </form> 
        </>
    )
}

export default Genre;